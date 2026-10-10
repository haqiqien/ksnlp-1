const root = document.documentElement;
const themeButton = document.getElementById('theme-toggle');

try {
  const savedTheme = localStorage.getItem('llm-learning-theme');
  if (savedTheme === 'dark' || savedTheme === 'light') root.dataset.theme = savedTheme;
} catch (_) {}

function updateThemeButton() {
  const dark = root.dataset.theme === 'dark';
  themeButton.setAttribute('aria-label', dark ? 'Aktifkan mode terang' : 'Aktifkan mode gelap');
  themeButton.title = dark ? 'Mode terang' : 'Mode gelap';
}

themeButton.addEventListener('click', () => {
  root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  try { localStorage.setItem('llm-learning-theme', root.dataset.theme); } catch (_) {}
  updateThemeButton();
});

updateThemeButton();
