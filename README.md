## Meet the Team display fix (November 7, 2026)
The team page content now renders immediately without scroll-triggered hiding; the two portraits are embedded inside `team.html` as reliable fallback images, while the original assets remain in `assets/`. Upload the *entire* extracted ZIP to your GitHub Pages root, preserving `team.html`, `index.html`, and `style.css`.

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

## Mobile portfolio navigation update
- Hides both rows' left/right portfolio arrow buttons at viewport widths 760px and under.
- Retains separate native horizontal swipe scrolling for both rows.
- Trims the arrow-reserved side gutters; retains the staggered bottom row.
- Desktop arrows and hover-to-scroll behavior are unchanged.
- CSS cache version increased in index.html.

## Services and contact update (November 5, 2026)
- Replaced numbered expertise entries with five updated service categories.
- Added two accessible, mobile-responsive email and phone contact links with inline SVG icons.
- Email: info@amiralce.com (publicly listed at https://amiralce.com/contact/). This is the international office contact address; confirm it should receive inquiries from the San Diego page.
- Phone: 858.610.4469 (San Diego).
- Desktop: two-column service descriptions; mobile: stacked services and contact methods.
- Other features, project assets, independent carousel rows, and mobile swipe controls are unchanged.

## Portfolio update — November 7, 2026
The portfolio now displays as **one horizontal row** of larger, equal-size cards. Images remain uncropped (`object-fit: contain`). Desktop arrows respond to hover and click; on phones, arrow controls are hidden and users swipe the row horizontally. Filters, project count, and the single progress indicator remain functional.


## November 7, 2026: Contact & Team menu update
- New contact.html dedicated inquiry/feedback form; company phone and email are not shown visually.
- Contact form uses mailto to open the visitor email app; it does not submit in the background.
- Fixed Meet the Team navigation JavaScript syntax error by replacing broken inline script with subpages.js.
- Team page photos remain embedded as fallback and in assets.
- Home and team page contact buttons link to contact.html.
- On GitHub Pages, upload entire directory including contact.html, team.html, subpages.js, CSS, images.
