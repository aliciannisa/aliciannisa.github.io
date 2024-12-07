// Toggle class active untuk hamburger menu
const navbarNav = document.querySelector('.navbar-nav');
// ketika hamburger menu di klik
document.querySelector('#hamburger-menu').onclick = () => {
  navbarNav.classList.toggle('active');
};

// Toggle class active untuk search form
const searchForm = document.querySelector('.search-form');
const searchBox = document.querySelector('#search-box');
const searchResults = document.querySelector('#searchResults');

document.querySelector('#search-button').onclick = (e) => {
  searchForm.classList.toggle('active');
  searchBox.focus();
  e.preventDefault();
};

// Fungsi untuk mencari elemen di dalam halaman berdasarkan ID atau teks
const searchElements = () => {
  const query = searchBox.value.toLowerCase(); // Ambil input dari user
  let found = false; // Untuk memeriksa apakah elemen ditemukan

  // Dapatkan semua elemen produk (nama produk dalam h2)
  const elements = document.querySelectorAll('.product-card h2');

  elements.forEach((element) => {
    // Hapus sorotan sebelumnya dengan menghapus elemen <mark> jika ada
    const originalText = element.textContent;
    element.innerHTML = originalText; // Mengembalikan teks asli tanpa sorotan

    // Jika elemen mengandung teks yang dicari
    if (originalText.toLowerCase().startsWith(query)) {
      found = true;

      // Membungkus teks yang cocok dengan <mark>
      const highlightedText = originalText.replace(new RegExp(query, "gi"), (match) => {
        return `<mark>${match}</mark>`; // Bungkus kata yang ditemukan dengan <mark>
      });

      element.innerHTML = highlightedText; // Masukkan teks yang sudah di-highlight

      // Scroll ke elemen yang ditemukan dengan offset tambahan
      const elementPosition = element.getBoundingClientRect().top + window.scrollY; // Posisi elemen
      const offset = 450; // Offset yang diinginkan, misalnya 100px
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      })
    }
  });

  // Jika tidak ada elemen yang cocok, tampilkan pesan "data tidak ditemukan"
  if (searchResults) {
    if (!found) {
      searchResults.textContent = "Data tidak ditemukan";
      searchResults.style.color = "red"; // Warna merah untuk pesan
    } else {
      searchResults.textContent = ""; // Kosongkan pesan jika elemen ditemukan
    }
  }
};

// Jalankan pencarian ketika tombol Enter ditekan di dalam search box
searchBox.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    searchElements();
    e.preventDefault(); // Hindari reload halaman
  }
});

// Toggle class active untuk shopping cart
const shoppingCart = document.querySelector('.shopping-cart');
document.querySelector('#shopping-cart-button').onclick = (e) => {
  shoppingCart.classList.toggle('active');
  e.preventDefault();
};

// Klik di luar elemen
const hm = document.querySelector('#hamburger-menu');
const sb = document.querySelector('#search-button');
const sc = document.querySelector('#shopping-cart-button');

document.addEventListener('click', function (e) {
  if (!hm.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove('active');
  }

  if (!sb.contains(e.target) && !searchForm.contains(e.target)) {
    searchForm.classList.remove('active');
  }

  if (!sc.contains(e.target) && !shoppingCart.contains(e.target)) {
    shoppingCart.classList.remove('active');
  }
});

// Modal Box
const itemDetailModal = document.querySelector('#item-detail-modal');
const itemDetailButtons = document.querySelectorAll('.item-detail-button');

itemDetailButtons.forEach((btn) => {
  btn.onclick = (e) => {
    itemDetailModal.style.display = 'flex';
    e.preventDefault();
  };
});

// klik tombol close modal
document.querySelector('.modal .close-icon').onclick = (e) => {
  itemDetailModal.style.display = 'none';
  e.preventDefault();
};

// klik di luar modal
window.onclick = (e) => {
  if (e.target === itemDetailModal) {
    itemDetailModal.style.display = 'none';
  }
};

// Fungsi untuk melakukan pencarian
/* document.getElementById('search-box').addEventListener('input', function() {
  let filter = this.value.toLowerCase();
  let menuItems = document.querySelectorAll('.menu-item');

  menuItems.forEach(function(item) {
    // Memeriksa apakah item cocok dengan pencarian
    if (item.textContent.toLowerCase().includes(filter)) {
      item.classList.remove('hidden');
    } else {
      item.classList.add('hidden');
    }
  });
}); */
