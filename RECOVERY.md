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

Deployment status: published November 10, 2026 at 7:21 AM America/Toronto. Netlify is connected to mudasserali/ROE-WEBSITE, production branch rescue/2026-11-09. The first successful Git-backed deploy is `6af30c4fe259643110e37e3d` from commit `f368540ff2b140ecdf851e31dd297680b5684a79`: https://6af30c4fe259643110e37e3d--genuine-gelato-cadd02.netlify.app . Netlify reported 168 files, a 22-second successful build, and publication to https://roseofengland.art . The October 17 deployment remains the rollback point.

Live production checks on November 10 passed: MUSIC loads the complete press dossier with territory-specific Apple Music links; Press assets navigation scrolls from 0 to 7920 pixels; both top Media trailers are playing muted with readyState 4 and no media errors; the Team Zissou radio opener plays from the production-domain MP3 (readyState 4, playback advanced past 29 seconds); social links are visible on MUSIC and Media. Mobile layout was not rechecked.

Use this recovery branch in the existing Netlify project. Its netlify.toml sets base directory `rescue`, build command `python3 build_site.py`, and publish directory `site`. Python 3.11 or newer is required; no third-party packages are used.

The builder retrieves the pinned original deployment and existing public PRESS ROE assets, reconstructs changed bytes from the saved update, and verifies every source and all 168 final files by size and SHA-256. A failed transfer or changed asset stops the build. The preview's redirects back to roseofengland.art are excluded; all production media is local in the finished output.

To run locally: `python3 rescue/build_site.py`. The verified output is `rescue/site`.

## Recovery limits and next maintenance step

This is a rescue snapshot, not a redesign. It depends on the pinned original Netlify deployment and current public press asset URLs during build. Netlify's automatic deletion setting is 90 days for eligible old deployments. Preserve these sources until the recovered media has a permanent Git/artifact mirror; a future missing/changed source will stop the build safely. The generated production site itself is self-contained.

GitHub → Netlify deployment is now configured: commits to rescue/2026-11-09 trigger production builds. Keep the original deployment available for rollback. Future updates should begin from the verified production output and include matching file hashes in the build manifest. Use a separate branch for changes that need a preview before publishing, and update this log with each approved release.


## Mobile verification — November 10, 2026

Tested the live production site in Chrome at responsive viewport sizes 375 × 667, 390 × 844, and 430 × 932. This is responsive-layout testing, not physical iPhone/Safari or Android-device certification.

- MUSIC fits the phone widths without horizontal document overflow. Manual wheel scrolling and press-menu anchor navigation work. The Russia filter shows two matching placements, and the playlist table fits its container.
- At 375 × 667, both featured Media trailers play muted with readyState 4 and no media errors. Bottom navigation opens Media and Booking.
- ROE Radio plays the Team Zissou opener (31-track rotation); play/pause/minimize work. At the narrowest size, the long track title is visually truncated but playback controls remain accessible.
- Booking at 375 × 667 fits its frame, shows OUT NOW / RELEASED OCTOBER 23, 2026, and has form fields within the page width. Its close control works. No enquiry was submitted.
- Contact at 430px fits without horizontal overflow. Home loads and displays its mobile entrance artwork and bottom navigation.

Mobile layout findings from the initial verification (resolved in the fix below):
1. The floating social-links bar overlaps playlist positions on MUSIC at 390px and Booking description text at 375px. Its open-area placement does not consistently avoid text inside nested frames.
2. ROE World at a 430px outer viewport has 430px inner document width against a 415px frame client width, producing a small horizontal scrollbar in the Chrome test. Recheck after correcting the frame-width/scrollbar interaction.

No website source or design changes were made during this verification. Restore the browser's normal viewport after testing. Physical iPhone/Safari autoplay, touch gestures, and browser chrome/safe-area behavior remain untested.

## Mobile fixes — November 10, 2026

Resolved the mobile findings and the user's additional Home alignment request:

- A dedicated black strip reserves 64px plus the top safe-area inset above the page frame. The social links remain centered there through navigation and scrolling. Mobile Booking uses that same shell-owned bar without a duplicate in its nested frame.
- Home uses the actual available frame height, a centered room image, and a stable mobile transform. Space for the bottom navigation keeps the full girl visible. The desktop room animation is retained.
- ROE World uses its frame's available width instead of 100vw, removing the horizontal scrollbar.
- The radio's current track title wraps fully on phones instead of clipping after two lines.

Local browser QA passed at 375 × 667, 390 × 844, and 430 × 932. The Home image center measured exactly half the viewport width at each size; each social bar stayed at top 6px with its horizontal center at half the viewport width. MUSIC remained scrollable; Booking's local social bar was hidden; ROE World measured 415px scroll width against a 415px client width in the 430px frame. Both top Media trailers played with readyState 4. The full Team Zissou title's content height matched its rendered height. A 1363px desktop check retained the original room animation and frame top of 0.

The revised snapshot verifies 211 source inputs and 168 output files, totalling 407,753,100 bytes. Four production files changed; all other production output hashes are unchanged. Syntax checks passed for both edited JavaScript files. Physical iPhone/Safari testing remains unperformed.

Production deployment: published November 10, 2026, deploy `6af316190c37b7fe6b65ffa1` from mobile-fix commit `3462acefcdc46ff66eaa145ad0fbc51fb062ef82`. All four changed production files match the verified local SHA-256 values. The live 390px check measured the Home image center at 195px, social center at 195px, and the content frame starting below the 64px social strip.


## Desktop layout update — November 10, 2026

Desktop-only rules apply at 761px and above. Mobile composition and content are retained.

- Home social links are fixed 24px from the left and centered vertically with the bottom main menu.
- MUSIC's main menu is 24px from the left; social links remain top-right. The existing 205px radio launcher sits between them on the same horizontal row.
- Media's green Listen Now button is hidden on desktop, its menu is far left, its social links far right, and its ROE MEDIA split-flap sign sits between them. The inherited collapsing tile widths were corrected.
- ROE World's social links are far right, its desktop Listen Now button is hidden, and the ROE WORLD split-flap is immediately beside the top-left logo.
- Contact has a flat black desktop background, its 231px radio launcher immediately to the right of the logo, and a prominent official cover beside the existing enquiry form. The Music page's 11 Apple Music playlist placements (10 table rows, including the combined Canada/Russia row) are repeated with their exact country links and historical-position date note.

Browser QA passed at 1363px and 1024px: the MUSIC menu/radio/social groups do not overlap; Home social/menu center lines match; Media and World buttons are hidden; the flip signs are readable and in the requested positions; Contact loads the cover, all editorial rows, and a flat black background without horizontal overflow. At 390px, Contact retains its original background and has no injected editorial section; the social bar remains centered in its black top strip; Media's original mobile Listen Now button remains visible.

Production deployment: published November 10, 2026, deploy `6af33fd4bbe6211a0f3c9def` from commit `f8ed26b90766e524af73e9e45fda3e85d9fa8480`. Netlify reported a 23-second successful deploy. All four changed production files match their verified local SHA-256 values. The live Contact page shows the flat black background, loaded official cover, and all ten table rows (11 placements). The production snapshot contains 169 files and 407,770,950 verified bytes.
