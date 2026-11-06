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
