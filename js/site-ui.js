(function () {
  const root = document.documentElement.dataset.root || '.';

  function withRoot(path) {
    return `${root}/${path}`.replace(/\/{2,}/g, '/').replace(/^\.\//, './');
  }

  function initTheme() {
    const saved = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', saved);
    const themeBtn = document.getElementById('themeBtn');
    if (themeBtn) themeBtn.textContent = saved === 'dark' ? '☀️' : '🌙';

    themeBtn?.addEventListener('click', () => {
      const curr = document.documentElement.getAttribute('data-theme');
      const next = curr === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      themeBtn.textContent = next === 'dark' ? '☀️' : '🌙';
    });
  }

  function initHeader() {
    const header = document.getElementById('header');
    if (!header) return;
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 10);
    }, { passive: true });
  }

  function initSearch() {
    const searchLinks = [
      { text: 'المصحف الإلكتروني', url: withRoot('المصحف/quran.html'), icon: '📖' },
      { text: 'أذكار الصباح', url: withRoot('zekr/اذكار_الصباح/azkar-1.html'), icon: '🌅' },
      { text: 'أذكار المساء', url: withRoot('zekr/اذكار_المساء/azkar-2.html'), icon: '🌆' },
      { text: 'أذكار النوم', url: withRoot('zekr/اذكار_النوم/azkar-3.html'), icon: '🌙' },
      { text: 'مواقيت الصلاة', url: withRoot('prayer-times.html'), icon: '🕐' },
      { text: 'رمضان', url: withRoot('ramadan.html'), icon: '🌙' },
      { text: 'العيد', url: withRoot('eid.html'), icon: '🎊' },
    ];

    const searchBtn = document.getElementById('searchBtn');
    const searchOverlay = document.getElementById('searchOverlay');
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    if (!searchBtn || !searchOverlay || !searchInput || !searchResults) return;

    function render(items) {
      searchResults.innerHTML = items.map(item =>
        `<a href="${item.url}" class="search-result-item">${item.icon} ${item.text}</a>`
      ).join('');
    }

    searchBtn.addEventListener('click', () => {
      searchOverlay.classList.add('open');
      searchInput.focus();
      render(searchLinks);
    });

    searchOverlay.addEventListener('click', event => {
      if (event.target === searchOverlay) searchOverlay.classList.remove('open');
    });

    searchInput.addEventListener('input', event => {
      const query = event.target.value.trim().toLowerCase();
      render(query ? searchLinks.filter(item => item.text.toLowerCase().includes(query)) : searchLinks);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initHeader();
    initSearch();
  });
})();
