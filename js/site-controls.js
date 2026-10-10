const siteRoot = document.documentElement;
const themeStorageKey = 'llm-learning-theme';
const darkPreference = window.matchMedia('(prefers-color-scheme: dark)');

let savedTheme = null;
try { savedTheme = localStorage.getItem(themeStorageKey); } catch (_) {}
siteRoot.dataset.theme = savedTheme === 'dark' || savedTheme === 'light'
  ? savedTheme
  : (darkPreference.matches ? 'dark' : 'light');

function addThemeButton(nav) {
  let button = nav.querySelector('#theme, #th, #theme-toggle');
  if (!button) {
    button = document.createElement('button');
    button.type = 'button';
    nav.append(button);
  }
  button.id = 'theme-toggle';
  button.classList.add('theme-toggle');
  button.type = 'button';
  button.addEventListener('click', () => {
    siteRoot.dataset.theme = siteRoot.dataset.theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem(themeStorageKey, siteRoot.dataset.theme); } catch (_) {}
    renderThemeButton(button);
  });
  renderThemeButton(button);
}

function renderThemeButton(button) {
  const dark = siteRoot.dataset.theme === 'dark';
  const action = dark ? 'terang' : 'gelap';
  button.setAttribute('aria-label', `Aktifkan mode ${action}`);
  button.title = `Aktifkan mode ${action}`;
  button.innerHTML = `<span class="theme-icon" aria-hidden="true">${dark ? '☀' : '☾'}</span><span class="theme-label">Mode ${action}</span>`;
}

const homeThemeButton = document.querySelector('.topbar #theme-toggle');
if (homeThemeButton) {
  homeThemeButton.addEventListener('click', () => {
    siteRoot.dataset.theme = siteRoot.dataset.theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem(themeStorageKey, siteRoot.dataset.theme); } catch (_) {}
    renderThemeButton(homeThemeButton);
  });
  renderThemeButton(homeThemeButton);
}

const lessonNav = document.querySelector('body > nav');
if (lessonNav) {
  if (!lessonNav.id) lessonNav.id = 'lesson-navigation';
  addThemeButton(lessonNav);

  let navLinks = lessonNav.querySelector('#toc');
  if (!navLinks) {
    navLinks = document.createElement('div');
    navLinks.className = 'nav-links';
    lessonNav.querySelectorAll(':scope > a[href^="#"]').forEach((link) => navLinks.append(link));
    lessonNav.append(navLinks);
  } else {
    navLinks.classList.add('nav-links');
  }
  const completion = lessonNav.querySelector('#pct');
  const completionBar = lessonNav.querySelector('.bar');
  if (completion && completionBar) {
    lessonNav.classList.add('has-progress');
    navLinks.prepend(completionBar, completion);
  }

  const navToggle = document.createElement('button');
  navToggle.className = 'nav-toggle';
  navToggle.type = 'button';
  navToggle.setAttribute('aria-controls', lessonNav.id);
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.innerHTML = '<span class="nav-toggle-icon" aria-hidden="true"><i></i><i></i><i></i></span><span class="nav-toggle-label">Menu</span>';
  lessonNav.append(navToggle);

  const mobileNav = window.matchMedia('(max-width: 900px)');
  const setMenuOpen = (open) => {
    lessonNav.classList.toggle('is-open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.querySelector('.nav-toggle-label').textContent = open ? 'Tutup' : 'Menu';
  };
  navToggle.addEventListener('click', () => setMenuOpen(!lessonNav.classList.contains('is-open')));
  lessonNav.addEventListener('click', (event) => {
    if (mobileNav.matches && event.target.closest('a[href^="#"]')) setMenuOpen(false);
  });
  window.addEventListener('resize', () => { if (!mobileNav.matches) setMenuOpen(false); });

  if (navLinks.id === 'toc') {
    new MutationObserver(() => {
      navLinks.querySelectorAll(':scope > a').forEach((link) => {
        link.classList.add('nav-item');
      });
    }).observe(navLinks, { childList: true });
  }

  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      const current = entries.find((entry) => entry.isIntersecting);
      if (!current) return;
      lessonNav.querySelectorAll('.nav-links a[href^="#"]').forEach((link) => {
        link.classList.toggle('on', link.getAttribute('href') === `#${current.target.id}`);
      });
    }, { rootMargin: '-18% 0px -72% 0px' });
    document.querySelectorAll('main section[id]').forEach((section) => sectionObserver.observe(section));
  }
}

const toTop = document.createElement('button');
toTop.className = 'to-top';
toTop.type = 'button';
toTop.setAttribute('aria-label', 'Kembali ke atas');
toTop.title = 'Kembali ke atas';
toTop.innerHTML = '<span aria-hidden="true">↑</span>';
document.body.append(toTop);

const updateToTop = () => toTop.classList.toggle('is-visible', window.scrollY > 320);
window.addEventListener('scroll', updateToTop, { passive: true });
updateToTop();
toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
