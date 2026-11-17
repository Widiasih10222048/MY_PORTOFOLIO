/* ===== 1. Menu hamburger di HP ===== */
const tombolMenu = document.querySelector('.menu-tombol');
const menu = document.getElementById('menu');

if (tombolMenu && menu) {
  tombolMenu.addEventListener('click', () => {
    const buka = menu.classList.toggle('terbuka');
    tombolMenu.setAttribute('aria-expanded', buka);
    tombolMenu.setAttribute('aria-label', buka ? 'Tutup menu' : 'Buka menu');
  });
}

/* ===== 2. Bayangan di menu saat halaman di-scroll ===== */
const header = document.querySelector('.header');
function cekScroll() {
  if (header) header.classList.toggle('bergeser', window.scrollY > 10);
}
window.addEventListener('scroll', cekScroll, { passive: true });
cekScroll();

/* ===== 3. Elemen muncul saat masuk layar ===== */
const target = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const pengamat = new IntersectionObserver((daftar) => {
    daftar.forEach((item) => {
      if (item.isIntersecting) {
        item.target.classList.add('terlihat');
        pengamat.unobserve(item.target);
      }
    });
  }, { threshold: 0.15 });

  target.forEach((el) => pengamat.observe(el));
} else {
  target.forEach((el) => el.classList.add('terlihat'));
}

/* ===== 4. Tahun otomatis di footer ===== */
document.querySelectorAll('[data-tahun]').forEach((el) => {
  el.textContent = new Date().getFullYear();
});

/* ===== 5. Dropdown Proyek ===== */
const subTombol = document.querySelector('.sub-tombol');
const punyaSub = document.querySelector('.punya-sub');

if (subTombol && punyaSub) {
  function tutupSub() {
    punyaSub.classList.remove('terbuka');
    subTombol.setAttribute('aria-expanded', 'false');
  }
  subTombol.addEventListener('click', () => {
    const buka = punyaSub.classList.toggle('terbuka');
    subTombol.setAttribute('aria-expanded', buka);
  });
  document.addEventListener('click', (e) => {
    if (!punyaSub.contains(e.target)) tutupSub();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') tutupSub();
  });
}

/* ===== 6. Filter proyek (halaman proyek.html) ===== */
const tombolFilter = document.querySelectorAll('.filter button');
const kartuProyek = document.querySelectorAll('[data-kategori]');

if (tombolFilter.length) {
  const jumlah = document.querySelector('.jumlah');
  const valid = ['semua', 'uiux', 'sistem', 'data'];

  function terapkan(kategori) {
    if (!valid.includes(kategori)) kategori = 'semua';
    let n = 0;
    kartuProyek.forEach((kartu) => {
      const cocok = kategori === 'semua' || kartu.dataset.kategori === kategori;
      kartu.hidden = !cocok;
      if (cocok) n++;
    });
    tombolFilter.forEach((t) => {
      t.setAttribute('aria-pressed', t.dataset.filter === kategori);
    });
    if (jumlah) jumlah.textContent = 'Menampilkan ' + n + ' proyek';
  }

  tombolFilter.forEach((t) => {
    t.addEventListener('click', () => {
      const k = t.dataset.filter;
      history.replaceState(null, '', k === 'semua' ? location.pathname : '#' + k);
      terapkan(k);
    });
  });

  /* link dropdown (proyek.html#uiux dst) ikut menyaring */
  window.addEventListener('hashchange', () => terapkan(location.hash.slice(1)));
  terapkan(location.hash.slice(1));
}

/* ===== 7. Tutup menu setelah link dropdown diklik ===== */
document.querySelectorAll('.submenu a').forEach((a) => {
  a.addEventListener('click', () => {
    if (punyaSub) punyaSub.classList.remove('terbuka');
    if (subTombol) subTombol.setAttribute('aria-expanded', 'false');
    if (menu) menu.classList.remove('terbuka');
    if (tombolMenu) tombolMenu.setAttribute('aria-expanded', 'false');
  });
});
