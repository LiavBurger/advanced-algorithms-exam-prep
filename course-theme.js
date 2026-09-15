/* Apply the saved theme before rendering; keep theme separate from study progress. */
(() => {
  const key = 'aa_exam_c_theme_v1';
  let theme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  try {
    const saved = localStorage.getItem(key);
    if (saved === 'dark' || saved === 'light') theme = saved;
  } catch { /* Theme switching still works when storage is unavailable. */ }
  const apply = () => {
    document.documentElement.dataset.theme = theme;
    const button = document.getElementById('theme-toggle');
    if (button) {
      button.textContent = theme === 'dark' ? 'Light mode' : 'Dark mode';
      button.setAttribute('aria-pressed', String(theme === 'dark'));
    }
  };
  apply();
  document.addEventListener('DOMContentLoaded', () => {
    apply();
    document.getElementById('theme-toggle').addEventListener('click', () => {
      theme = theme === 'dark' ? 'light' : 'dark';
      apply();
      try { localStorage.setItem(key, theme); } catch { /* Keep the session preference. */ }
    });
  });
})();
