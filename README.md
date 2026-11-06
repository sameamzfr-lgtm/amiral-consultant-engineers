# Amiral Consultant Engineers — Hero Entry Fix

**Issue:** On some mobile Safari, desktop browsers, or reopened tabs, the page reopens at the Services (“Engineering that moves projects forward”) section rather than the hero.

**Changes:** Scroll restoration is disabled before rendering, old section hashes are cleared on new page entry, and a short startup correction runs on DOM ready, load, pageshow/BFCache and immediate render frames. It stops as soon as the visitor deliberately scrolls. The mosaic, portfolio hover arrows, and navigation are preserved.

**Deploy:** Extract the ZIP. Upload all files and the `assets/` directory together to the root of the GitHub Pages repository. Ensure `index.html`, `script.js`, and `style.css` have all been replaced, not just `index.html`. Refresh a new Safari tab after deployment. The CSS and JS query-string versions have changed to bypass stale caches.

**Limitation:** The fix is code-verified, not tested on a physical iPhone; the deployed Pages site may also be serving older files until the deployment finishes.


## New legal pages (November 2026)
- Privacy Policy, Terms of Use, Engineering & Project Disclaimer, Accessibility Statement.
- Footer includes direct links to every page.
- Legal pages are drafts: please review LEGAL_REVIEW_CHECKLIST.md before publication.
- Upload ALL files to the same GitHub Pages root alongside index.html; do not upload only the index page.

## Contact and footer cleanup
- Contact block displays only the public phone number (+1 858 610 4469); its CTA opens the telephone dialer.
- The International Website · UAE link is present once in the bottom contact/footer area, in the footer (it remains in desktop/mobile menus for navigation).
- Privacy Policy, Terms of Use, Disclaimer, and Accessibility links share one row on the main footer, including mobile.
- All four legal policy pages use the public phone number instead of a personal email address.


## Independent project rows — November 2026

The portfolio now has **two independent horizontal scrolling rows**. Each has its own transparent left and right arrows, with continuous hover-to-scroll on mouse devices, click navigation, keyboard arrow support, and independent touch swiping on mobile. Filters retain the brick-staggered project distribution. The header, hero, legal pages, international link and phone-only contact remain unchanged.
