# Desktop layout source

`assets/js/roe-desktop-layout.js` owns the requested per-page desktop placements
and the Contact release/editorial block. Its CSS uses a 761px minimum width;
runtime layout and content injection are guarded by the same media query.
The existing mobile strip and radio code run first on phones.

The shell loads this coordinator before the shared social script. The social
script delegates desktop placement; the radio script delegates only desktop
MUSIC and Contact launcher positioning. Audio ownership, controls and artwork
are unchanged.

All files here are local inputs to the SHA-256 recovery manifest. When editing,
update the matching payload and production-output hashes and byte counts.
The Contact table copies the existing press dossier's dated editorial highlights
and storefront-specific links; it does not claim current chart positions.
