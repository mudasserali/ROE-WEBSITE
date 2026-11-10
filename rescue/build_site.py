#!/usr/bin/env python3
"""Reconstruct the approved ROE update and verify every byte before deployment."""
import base64
import concurrent.futures
import hashlib
import gzip
import json
import os
from pathlib import Path
import shutil
import time
import urllib.request

ROOT = Path(__file__).resolve().parent
MANIFEST = json.loads(gzip.decompress(base64.b64decode((ROOT / 'build-manifest.json.gz.b64').read_text())))
CACHE = ROOT / '.cache'
OUTPUT = ROOT / 'site'

def safe_path(root, name):
    path = (root / name).resolve()
    if not path.is_relative_to(root.resolve()) or path == root.resolve():
        raise ValueError('Unsafe file path: ' + name)
    return path

def valid(path, item):
    if not path.is_file() or path.stat().st_size != item['bytes']:
        return False
    with path.open('rb') as f:
        digest = hashlib.file_digest(f, 'sha256').hexdigest()
    return digest == item['sha256']

def collect(kind, item):
    target = safe_path(CACHE / kind, item['path'])
    target.parent.mkdir(parents=True, exist_ok=True)
    if valid(target, item):
        return target
    partial = target.with_name(target.name + '.partial')
    if 'local' in item:
        shutil.copyfile(safe_path(ROOT, item['local']), partial)
    elif 'chunks' in item:
        with partial.open('wb') as f:
            for chunk in item['chunks']:
                f.write(base64.b64decode(safe_path(ROOT, chunk).read_text().strip(), validate=True))
    else:
        url = item['url']
        if not url.startswith('https://'):
            raise ValueError('HTTPS required')
        for attempt in range(3):
            try:
                request = urllib.request.Request(url, headers={'User-Agent': 'ROE-Site-Recovery/1.0'})
                with urllib.request.urlopen(request, timeout=90) as response, partial.open('wb') as f:
                    shutil.copyfileobj(response, f, 1024 * 1024)
                if not valid(partial, item):
                    raise ValueError('Downloaded bytes did not match the saved snapshot: ' + item['path'])
                break
            except Exception:
                if attempt == 2:
                    raise
                time.sleep(2 * (attempt + 1))
    if not valid(partial, item):
        raise ValueError('Payload verification failed: ' + item['path'])
    os.replace(partial, target)
    return target

def build():
    jobs = [('original', item) for item in MANIFEST['originals']]
    jobs += [('payload', item) for item in MANIFEST['payloads']]
    print(f'Recovering {len(jobs)} verified source files', flush=True)
    with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:
        futures = [pool.submit(collect, kind, item) for kind, item in jobs]
        for count, future in enumerate(concurrent.futures.as_completed(futures), 1):
            future.result()
            if count % 20 == 0 or count == len(jobs):
                print(f'Source files verified: {count}/{len(jobs)}', flush=True)
    staging = ROOT / '.site-building'
    if staging.exists():
        shutil.rmtree(staging)
    staging.mkdir()
    for item in MANIFEST['files']:
        destination = safe_path(staging, item['path'])
        destination.parent.mkdir(parents=True, exist_ok=True)
        with destination.open('wb') as output:
            for operation in item['operations']:
                if operation['source'] not in ('original', 'payload'):
                    raise ValueError('Unknown source type')
                source = safe_path(CACHE / operation['source'], operation['path'])
                remaining = operation['length']
                if operation['offset'] < 0 or remaining < 0:
                    raise ValueError('Invalid source range')
                with source.open('rb') as f:
                    f.seek(operation['offset'])
                    while remaining:
                        data = f.read(min(1024 * 1024, remaining))
                        if not data:
                            raise ValueError('Unexpected end of source: ' + source.name)
                        output.write(data)
                        remaining -= len(data)
        if not valid(destination, item):
            raise ValueError('Final file verification failed: ' + item['path'])
    final_files = [p for p in staging.rglob('*') if p.is_file()]
    if len(final_files) != len(MANIFEST['files']):
        raise ValueError('Final file count mismatch')
    if (staging / '_redirects').exists():
        raise ValueError('Preview redirects must not be published to production')
    if any('admin' in p.name.lower() for p in final_files):
        raise ValueError('Retired admin file in production output')
    if OUTPUT.exists():
        shutil.rmtree(OUTPUT)
    os.replace(staging, OUTPUT)
    print(f'READY: {len(final_files)} files; {sum(p["bytes"] for p in MANIFEST["files"]):,} bytes; every SHA-256 matches.', flush=True)

if __name__ == '__main__':
    build()
