// ============================================
// GALERI.JS - FIXED & ENHANCED VERSION
// ============================================

// FITUR ES6 #1: CONST - untuk variabel yang tidak berubah
const galleryCards = document.querySelectorAll('.gallery-card');

// FITUR ES6 #2: LET - untuk variabel yang bisa berubah
let totalKlik = 0;

// ============================================
// FUNGSI UTAMA
// ============================================

// FITUR ES6 #3: ARROW FUNCTION (=>) - cara baru menulis fungsi
const tampilkanDeskripsi = (card) => {
  const description = card.querySelector('.product-description');
  
  if (description.classList.contains('show')) {
    description.classList.remove('show');
    console.log('Deskripsi disembunyikan');
  } else {
    description.classList.add('show');
    totalKlik++;
    console.log('Deskripsi ditampilkan');
  }
};

const tambahEfekHover = (card) => {
  card.style.transform = 'translateY(-10px) scale(1.02)';
  card.style.boxShadow = '0 12px 40px rgba(212, 105, 26, 0.3)';
};

const hapusEfekHover = (card) => {
  card.style.transform = 'translateY(0) scale(1)';
  card.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
};

const resetCard = (card) => {
  const description = card.querySelector('.product-description');
  description.classList.remove('show');
  card.style.transform = '';
  card.style.boxShadow = '';
};

// ============================================
// PASANG EVENT KE SEMUA CARD
// ============================================

// FITUR ES6 #4: FOR...OF LOOP - cara mudah looping array
for (const card of galleryCards) {
  
  // Sembunyikan deskripsi dulu
  const description = card.querySelector('.product-description');
  description.classList.remove('show');
  
  // Event: Klik untuk tampilkan/sembunyikan
  card.addEventListener('click', (e) => {
    // Jangan toggle jika klik badge
    if (!e.target.classList.contains('product-badge')) {
      tampilkanDeskripsi(card);
    }
  });
  
  // Event: Hover - tambah efek
  card.addEventListener('mouseenter', () => {
    tambahEfekHover(card);
  });
  
  // Event: Mouse keluar - hapus efek
  card.addEventListener('mouseleave', () => {
    hapusEfekHover(card);
  });
  
  // Event: Double klik untuk reset
  card.addEventListener('dblclick', () => {
    resetCard(card);
  });
}

// ============================================
// FUNGSI UNTUK TOMBOL
// ============================================

// Tampilkan semua deskripsi
function tampilkanSemua() {
  for (const card of galleryCards) {
    const description = card.querySelector('.product-description');
    description.classList.add('show');
  }
  console.log('Semua deskripsi ditampilkan!');
}

// Sembunyikan semua deskripsi
function sembunyikanSemua() {
  for (const card of galleryCards) {
    resetCard(card);
  }
  console.log('Semua deskripsi disembunyikan!');
}

// Lihat produk yang sedang ditampilkan
function lihatProdukAktif() {
  // FITUR ES6 #5: TEMPLATE LITERAL (`${}`) - string dengan variabel
  console.log(`=== PRODUK YANG DITAMPILKAN ===`);
  
  let ada = false;
  let nomor = 1;
  
  for (const card of galleryCards) {
    const description = card.querySelector('.product-description');
    const namaProduk = card.querySelector('h5');
    
    if (description.classList.contains('show')) {
      console.log(`${nomor}. ${namaProduk.textContent}`);
      nomor++;
      ada = true;
    }
  }
  
  if (!ada) {
    console.log('Tidak ada produk yang ditampilkan');
  }
  
  console.log(`Total klik: ${totalKlik}`);
}

// Lihat statistik
function lihatStatistik() {
  console.log(`=== STATISTIK GALERI ===`);
  console.log(`Total Card: ${galleryCards.length}`);
  console.log(`Total Klik: ${totalKlik}`);
  
  let jumlahTampil = 0;
  for (const card of galleryCards) {
    const description = card.querySelector('.product-description');
    if (description.classList.contains('show')) {
      jumlahTampil++;
    }
  }
  console.log(`Card Tampil: ${jumlahTampil}`);
  console.log(`Card Tersembunyi: ${galleryCards.length - jumlahTampil}`);
}

// ============================================
// EVENT LISTENERS UNTUK TOMBOL
// ============================================

document.getElementById('showAllBtn').addEventListener('click', tampilkanSemua);
document.getElementById('hideAllBtn').addEventListener('click', sembunyikanSemua);

// ============================================
// EXPORT FUNGSI (biar bisa dipanggil dari console)
// ============================================

window.galleryModule = {
  reset: sembunyikanSemua,
  logVisibleProducts: lihatProdukAktif,
  showAll: tampilkanSemua
};

window.galleryDebug = {
  showStats: lihatStatistik
};

// ============================================
// ANIMASI MASUK SAAT HALAMAN DIMUAT
// ============================================

window.addEventListener('DOMContentLoaded', () => {
  // Animate cards on load
  galleryCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
      card.style.transition = 'all 0.5s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 100);
  });
});

// PESAN SELAMAT DATANG
console.log('=== GALERI KERIPIK SINGKONG CANDRA ===');
console.log('Modul galeri sudah siap!');
console.log('Klik card untuk lihat deskripsi produk');
console.log('');
console.log('Perintah Console:');
console.log('- window.galleryModule.reset()');
console.log('- window.galleryModule.logVisibleProducts()');
console.log('- window.galleryModule.showAll()');
console.log('- window.galleryDebug.showStats()');