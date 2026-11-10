# Rose of England website recovery — November 9, 2026

This branch restores the complete approved post-release update without a large browser upload. The older Next.js prototype is preserved in the repository's main branch and history.

## Verified starting points

- Live website: https://roseofengland.art
- Netlify project: https://app.netlify.com/projects/genuine-gelato-cadd02/deploys
- Original live deploy: `6ad3885d8e3576fb3e2f2429` (October 17, 2026).
- Original live snapshot: https://6ad3885d8e3576fb3e2f2429--genuine-gelato-cadd02.netlify.app
- Saved review: https://roe-empire-release-review.mudasser773452.chatgpt.site/music.html
- Recovered source: Sites project `appgprj_6aed0f0b98948191b1c553ed38e1ad59`, commit `20c385ce09312a2e12fc7060113aa26800605b16`.
- Prepared production snapshot: 168 files, 407,750,053 bytes. Original artwork/audio/video quality is retained.

## Included changes

- Complete press site embedded into MUSIC, including regional playlist links.
- Public Media admin controls and retired admin files removed.
- Countdown removal and post-release booking copy.
- Landscape and portrait trailers at the top of Media.
- Contact-page social links shared across site pages.
- Radio begins with OMF REMIX INTRO (UNRELEASED TEAM ZISSOU) +.

## Build and deploy

Recovery verification completed November 9, 2026: all 207 source objects and all 168 output files passed size and SHA-256 checks. A fresh clone of this GitHub branch rebuilt the same verified output. All 14 JavaScript files passed Node syntax checks. All 31 radio tracks and both featured trailer files are present; no retired admin files are in the output.

Desktop browser checks passed on the recovered output: MUSIC loads the full press package; its press-assets navigation scrolls from the top to the correct section; both top Media trailers play muted without media errors; the radio plays the Team Zissou intro first at the saved 70% volume; social links remain visible while navigating. Mobile layout was not rechecked in this recovery pass.

Deployment status: not yet published. Netlify is waiting at its GitHub authorization step before the repository can be linked. The October 17 live deployment remains the rollback point.

Use this recovery branch in the existing Netlify project. Its netlify.toml sets base directory `rescue`, build command `python3 build_site.py`, and publish directory `site`. Python 3.11 or newer is required; no third-party packages are used.

The builder retrieves the pinned original deployment and existing public PRESS ROE assets, reconstructs changed bytes from the saved update, and verifies every source and all 168 final files by size and SHA-256. A failed transfer or changed asset stops the build. The preview's redirects back to roseofengland.art are excluded; all production media is local in the finished output.

To run locally: `python3 rescue/build_site.py`. The verified output is `rescue/site`.

## Recovery limits and next maintenance step

This is a rescue snapshot, not a redesign. It depends on the pinned original Netlify deployment and current public press asset URLs during build. Netlify's automatic deletion setting is 90 days for eligible old deployments. Preserve these sources until the recovered media has a permanent Git/artifact mirror; a future missing/changed source will stop the build safely. The generated production site itself is self-contained.

After deployment, record the new deploy ID and verification results here. Keep the original deployment available for rollback. Further page updates should begin from the verified output and be committed with their matching file hashes.
