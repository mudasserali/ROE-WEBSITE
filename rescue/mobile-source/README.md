# Mobile layout source

These UTF-8 files are inputs to the verified recovery manifest. `build_site.py`
copies each `local` payload, verifies its SHA-256, and reconstructs the final
production files. Update both payload and output sizes/hashes when editing.

- `assets/js/roe-social-links.js`: deterministic top-center social strip below
  761px, reserved space above the shared page frame, and no duplicate bar inside
  Booking. The desktop placement logic is retained.
- `assets/roe-mobile-polish.css`: centered, stable Home room framing and full-width
  ROE World layout measured against the actual frame width.
- `assets/js/roe-radio-33-3.js`: full wrapped mobile track titles and safe panel height.
- `home-stylesheet-link.html`: small insertion linking Home to the shared mobile
  stylesheet; the original embedded images remain in the pinned recovery sources.

The preview-only three-phone harness is not part of the deployment manifest.
