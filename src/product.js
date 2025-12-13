// ============================================
// FUNGSI PESAN WHATSAPP
// ============================================

function pesanWhatsApp(namaProduk, harga) {
  const nomorWA = '6289644869711'; // Nomor WhatsApp Keripik Singkong Candra
  const hargaFormat = 'Rp ' + harga.toLocaleString('id-ID');
  
  const pesan = `Halo Keripik Singkong Candra!

Saya tertarik untuk memesan:
📦 Produk: ${namaProduk}
💰 Harga: ${hargaFormat}

Mohon informasi lebih lanjut mengenai pemesanan dan pengiriman.

Terima kasih!`;

  const pesanEncoded = encodeURIComponent(pesan);
  const urlWA = `https://wa.me/${nomorWA}?text=${pesanEncoded}`;
  
  window.open(urlWA, '_blank');
}

// ============================================
// LOAD TESTIMONIALS
// ============================================

function loadTestimonials() {
  const testimonials = [
    { nama: 'Muhammad Sandi Ramadhan', bintang: 5, produk: 'Original', komentar: 'Keripik terenak! Renyah dan tidak berminyak.' },
    { nama: 'Siti Nurhaliza', bintang: 5, produk: 'Balado', komentar: 'Pedasnya pas! Jadi favorit keluarga.' },
    { nama: 'Ahmad Putra Nur', bintang: 5, produk: 'Keju', komentar: 'Rasa kejunya mantap! Anak-anak suka.' },
    { nama: 'Indra Pratama', bintang: 5, produk: 'Balado', komentar: 'Baladonya sangat melekat di lidah dan rasa pedas campur kerenyahan keripiknya sangat lezat.' }
  ];

  const container = document.getElementById('testimonialContainer');
  
  testimonials.forEach((testi, index) => {
    const stars = '⭐'.repeat(testi.bintang);
    const initial = testi.nama.charAt(0);
    
    const html = `
      <div class="col-md-6 col-lg-3">
        <div class="card testimonial-card shadow-sm h-100" style="animation: fadeInUp 0.6s ease ${index * 0.1}s both;">
          <div class="card-body">
            <div class="d-flex align-items-center mb-3">
              <div class="testimonial-avatar me-3">${initial}</div>
              <div>
                <h6 class="mb-0 fw-bold">${testi.nama}</h6>
                <small class="text-muted">${testi.produk}</small>
              </div>
            </div>
            <div class="mb-2">${stars}</div>
            <p class="card-text text-muted">${testi.komentar}</p>
          </div>
        </div>
      </div>
    `;
    
    container.innerHTML += html;
  });
}

// ============================================
// AGE CHECKER
// ============================================

function checkAge() {
  const age = parseInt(document.getElementById('ageInput').value);
  const resultDiv = document.getElementById('ageResult');
  
  if (!age || age < 1) {
    resultDiv.className = 'age-result alert alert-danger mt-3';
    resultDiv.innerHTML = '⚠️ Mohon masukkan usia yang valid!';
    resultDiv.style.display = 'block';
    return;
  }
  
  let category, emoji, alertClass;
  
  if (age < 13) {
    category = 'Anak-anak'; 
    emoji = '👶'; 
    alertClass = 'alert-warning';
  } else if (age <= 17) {
    category = 'Remaja'; 
    emoji = '🧑'; 
    alertClass = 'alert-info';
  } else if (age <= 60) {
    category = 'Dewasa'; 
    emoji = '👨'; 
    alertClass = 'alert-success';
  } else {
    category = 'Lansia'; 
    emoji = '👴'; 
    alertClass = 'alert-primary';
  }
  
  resultDiv.className = `age-result alert ${alertClass} mt-3`;
  resultDiv.innerHTML = `${emoji} <strong>Kategori:</strong> ${category} (${age} tahun)`;
  resultDiv.style.display = 'block';
  
  // Animate result
  resultDiv.style.animation = 'slideDown 0.5s ease';
}

// ============================================
// CALCULATOR
// ============================================

function calculatePrice() {
  const price = document.getElementById('productSelect').value;
  const qty = document.getElementById('quantityInput').value;
  
  if (!price) {
    alert('Mohon pilih produk terlebih dahulu!');
    return;
  }
  
  if (qty <= 0) {
    alert('Jumlah harus lebih dari 0!');
    return;
  }
  
  const total = parseInt(price) * parseInt(qty);
  const productName = document.getElementById('productSelect').options[document.getElementById('productSelect').selectedIndex].text.split(' - ')[0];
  const priceFormatted = 'Rp ' + parseInt(price).toLocaleString('id-ID');
  const totalFormatted = 'Rp ' + total.toLocaleString('id-ID');
  
  const resultDiv = document.getElementById('priceResult');
  resultDiv.innerHTML = `
    <div class="price-total mt-4">${totalFormatted}</div>
    <button class="btn btn-whatsapp w-100 mt-3" onclick="pesanWhatsAppCalculator('${productName}', ${price}, ${qty}, ${total})">
      <i class="fab fa-whatsapp me-2"></i>Pesan via WhatsApp
    </button>
  `;
  
  resultDiv.style.display = 'block';
  resultDiv.style.animation = 'fadeIn 0.5s ease';
}

// WA Message
function pesanWhatsAppCalculator(namaProduk, harga, qty, total) {
  const nomorWA = '6289644869711';
  const hargaFormat = 'Rp ' + harga.toLocaleString('id-ID');
  const totalFormat = 'Rp ' + total.toLocaleString('id-ID');
  
  const pesan = `Halo Keripik Singkong Candra!

Saya ingin memesan:
📦 Produk: ${namaProduk}
💰 Harga: ${hargaFormat}
📊 Jumlah: ${qty} bungkus
💵 Total: ${totalFormat}

Mohon proses pesanan saya. Terima kasih!`;

  const pesanEncoded = encodeURIComponent(pesan);
  const urlWA = `https://wa.me/${nomorWA}?text=${pesanEncoded}`;
  
  window.open(urlWA, '_blank');
}

// ============================================
// EVENT LISTENERS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  console.log('=== PRODUK - KERIPIK SINGKONG CANDRA ===');
  console.log('Halaman produk siap!');
  
  // Load testimonials
  loadTestimonials();
  
  // Age checker
  const checkAgeBtn = document.getElementById('checkAgeBtn');
  const ageInput = document.getElementById('ageInput');
  
  if (checkAgeBtn) {
    checkAgeBtn.addEventListener('click', checkAge);
  }
  
  if (ageInput) {
    ageInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        checkAge();
      }
    });
  }
  
  // Calculator
  const productSelect = document.getElementById('productSelect');
  const quantityInput = document.getElementById('quantityInput');
  
  if (productSelect) {
    productSelect.addEventListener('change', calculatePrice);
  }
  
  if (quantityInput) {
    quantityInput.addEventListener('input', calculatePrice);
  }
  
  // Table hover effect
  const tableRows = document.querySelectorAll('.table-custom tbody tr');
  tableRows.forEach(row => {
    row.addEventListener('mouseenter', function() {
      this.style.backgroundColor = 'rgba(212, 105, 26, 0.05)';
      this.style.transform = 'scale(1.01)';
      this.style.transition = 'all 0.3s ease';
    });
    
    row.addEventListener('mouseleave', function() {
      this.style.backgroundColor = '';
      this.style.transform = 'scale(1)';
    });
  });
  
  
  // Animate cards on scroll
  const observeCards = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.product-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observeCards.observe(card);
  });
});