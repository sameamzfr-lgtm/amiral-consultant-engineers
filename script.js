// Amiral Consultant Engineers — shared site behavior (mobile menu, hero slider, contact form)
(function () {
  // Always open at the top of the page. Browsers (iOS Safari especially) sometimes restore a
  // previous scroll offset on load/reload, which makes the site appear to open mid-page or at
  // the bottom. Force it back to the top unless the URL explicitly points at a section.
  if ('scrollRestoration' in history) { history.scrollRestoration = 'manual'; }
  if (!location.hash) { window.scrollTo(0, 0); }

  // Header: transparent over the hero, solid once scrolled (or always solid on pages with no hero).
  var header = document.querySelector('.site-header');
  if (header) {
    if (document.querySelector('.hero')) {
      var setHeaderState = function () {
        header.classList.toggle('is-solid', window.scrollY > 40);
      };
      setHeaderState();
      window.addEventListener('scroll', setHeaderState, { passive: true });
    } else {
      header.classList.add('is-solid');
    }
  }

  var menu = document.querySelector('.mobile-menu');
  var backdrop = document.querySelector('.menu-backdrop');
  function toggleMenu(open) {
    menu && menu.classList.toggle('is-open', open);
    backdrop && backdrop.classList.toggle('is-open', open);
    menu && menu.setAttribute('aria-hidden', String(!open));
    var btn = document.querySelector('.menu-toggle');
    btn && btn.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  }
  var toggleBtn = document.querySelector('.menu-toggle');
  toggleBtn && toggleBtn.addEventListener('click', function () { toggleMenu(true); });
  var closeBtn = document.querySelector('.mobile-menu-top button');
  closeBtn && closeBtn.addEventListener('click', function () { toggleMenu(false); });
  backdrop && backdrop.addEventListener('click', function () { toggleMenu(false); });
  document.querySelectorAll('.mobile-menu nav a').forEach(function (a) {
    a.addEventListener('click', function () { toggleMenu(false); });
  });

  // Hero slider — cycles through a small set of curated, non-duplicate photos
  var slides = ['assets/hero-coordination.jpg', 'assets/hero-rebar.jpg', 'assets/hero-skyline.jpg'];
  var index = 0;
  function showSlide(step) {
    index = (index + step + slides.length) % slides.length;
    var h = document.querySelector('.hero-image');
    if (!h) return;
    h.style.backgroundImage = 'url(' + slides[index] + ')';
    h.classList.remove('slide-left', 'slide-right');
    void h.offsetWidth;
    h.classList.add(step < 0 ? 'slide-left' : 'slide-right');
  }
  var leftArrow = document.querySelector('.hero-arrow-left');
  var rightArrow = document.querySelector('.hero-arrow-right');
  leftArrow && leftArrow.addEventListener('click', function () { showSlide(-1); });
  rightArrow && rightArrow.addEventListener('click', function () { showSlide(1); });

  // Contact form — opens a pre-filled email to the firm's intake address
  var form = document.querySelector('.contact form');
  form && form.addEventListener('submit', function (e) {
    e.preventDefault();
    var f = new FormData(form);
    var subject = encodeURIComponent('Project inquiry — ' + (f.get('name') || ''));
    var body = encodeURIComponent(
      'Name: ' + (f.get('name') || '') + '\n' +
      'Email: ' + (f.get('email') || '') + '\n\n' +
      'Project details:\n' + (f.get('message') || '')
    );
    window.location.href = 'mailto:ben.sadawi@amiralce.com?subject=' + subject + '&body=' + body;
  });
})();
