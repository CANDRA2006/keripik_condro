// ============================================
// TENTANG.JS - COMPLETE & FIXED VERSION
// ============================================

// Ambil elemen form dan input
const form = document.getElementById('webinarForm');
const namaLengkap = document.getElementById('namaLengkap');
const email = document.getElementById('email');
const noHp = document.getElementById('noHp');
const topikWebinar = document.getElementById('topikWebinar');
const persetujuan = document.getElementById('persetujuan');
const successMessage = document.getElementById('successMessage');

// Fungsi untuk menampilkan error
function showError(inputElement, errorElement, message) {
  inputElement.classList.add('error');
  inputElement.classList.remove('success');
  errorElement.textContent = message;
  errorElement.classList.add('show');
}

// Fungsi untuk menampilkan success
function showSuccess(inputElement, errorElement) {
  inputElement.classList.remove('error');
  inputElement.classList.add('success');
  errorElement.classList.remove('show');
}

// Validasi Nama Lengkap
function validateNama() {
  const errorNama = document.getElementById('errorNama');
  const value = namaLengkap.value.trim();

  if (value === '') {
    showError(namaLengkap, errorNama, 'Nama lengkap wajib diisi');
    return false;
  } else if (value.length < 3) {
    showError(namaLengkap, errorNama, 'Nama lengkap minimal 3 karakter');
    return false;
  } else {
    showSuccess(namaLengkap, errorNama);
    return true;
  }
}

// Validasi Email
function validateEmail() {
  const errorEmail = document.getElementById('errorEmail');
  const value = email.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (value === '') {
    showError(email, errorEmail, 'Email wajib diisi');
    return false;
  } else if (!emailRegex.test(value)) {
    showError(email, errorEmail, 'Format email tidak valid');
    return false;
  } else if (value.toLowerCase().includes('@yahoo.com')) {
    showError(email, errorEmail, 'Email dengan domain yahoo.com tidak diperbolehkan');
    return false;
  } else {
    showSuccess(email, errorEmail);
    return true;
  }
}

// Validasi No HP
function validateNoHp() {
  const errorHp = document.getElementById('errorHp');
  const value = noHp.value.trim();
  const numberRegex = /^[0-9]+$/;

  if (value === '') {
    showError(noHp, errorHp, 'No HP wajib diisi');
    return false;
  } else if (!numberRegex.test(value)) {
    showError(noHp, errorHp, 'No HP harus berupa angka');
    return false;
  } else if (value.length < 10 || value.length > 13) {
    showError(noHp, errorHp, 'No HP harus antara 10-13 digit');
    return false;
  } else {
    showSuccess(noHp, errorHp);
    return true;
  }
}

// Validasi Topik Webinar
function validateTopik() {
  const errorTopik = document.getElementById('errorTopik');
  const value = topikWebinar.value;

  if (value === '') {
    showError(topikWebinar, errorTopik, 'Pilihan topik webinar wajib dipilih');
    return false;
  } else {
    showSuccess(topikWebinar, errorTopik);
    return true;
  }
}

// Validasi Persetujuan
function validatePersetujuan() {
  const errorPersetujuan = document.getElementById('errorPersetujuan');

  if (!persetujuan.checked) {
    showError(persetujuan, errorPersetujuan, 'Anda harus menyetujui syarat dan ketentuan');
    return false;
  } else {
    showSuccess(persetujuan, errorPersetujuan);
    return true;
  }
}

// Fungsi untuk menampilkan popup sukses
function showSuccessPopup(nama) {
  // Create modal HTML
  const modalHTML = `
    <div class="modal fade" id="successModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content" style="border-radius: 20px; border: none; overflow: hidden;">
          <div class="modal-header text-white" style="background: linear-gradient(135deg, #d4691a 0%, #ff8c42 50%, #ffa726 100%); border: none;">
            <h5 class="modal-title fw-bold">
              <i class="fas fa-check-circle me-2"></i> Pendaftaran Berhasil!
            </h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body text-center py-5">
            <div class="success-icon mb-4">
              <i class="fas fa-check-circle" style="font-size: 5rem; color: #4caf50;"></i>
            </div>
            <h4 class="mb-3">Terima Kasih <strong>${nama}</strong>!</h4>
            <p class="text-muted mb-0">Pendaftaran Anda telah berhasil dikirim. Kami akan segera menghubungi Anda melalui email atau WhatsApp dengan detail webinar.</p>
          </div>
          <div class="modal-footer justify-content-center border-0">
            <button type="button" class="btn btn-success btn-lg px-5" data-bs-dismiss="modal" style="border-radius: 50px;">
              <i class="fas fa-times-circle me-2"></i> Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Remove existing modal if any
  const existingModal = document.getElementById('successModal');
  if (existingModal) {
    existingModal.remove();
  }

  // Add modal to body
  document.body.insertAdjacentHTML('beforeend', modalHTML);

  // Show modal
  const modal = new bootstrap.Modal(document.getElementById('successModal'));
  modal.show();

  // Remove modal from DOM after it's hidden
  document.getElementById('successModal').addEventListener('hidden.bs.modal', function () {
    this.remove();
  });
}

// Event listener untuk validasi real-time
namaLengkap.addEventListener('blur', validateNama);
namaLengkap.addEventListener('input', validateNama);

email.addEventListener('blur', validateEmail);
email.addEventListener('input', validateEmail);

noHp.addEventListener('blur', validateNoHp);
noHp.addEventListener('input', validateNoHp);

topikWebinar.addEventListener('change', validateTopik);
topikWebinar.addEventListener('blur', validateTopik);

persetujuan.addEventListener('change', validatePersetujuan);

// Event listener untuk submit form
form.addEventListener('submit', function(e) {
  e.preventDefault();

  // Validasi semua field
  const isNamaValid = validateNama();
  const isEmailValid = validateEmail();
  const isNoHpValid = validateNoHp();
  const isTopikValid = validateTopik();
  const isPersetujuanValid = validatePersetujuan();

  // Jika semua valid, tampilkan popup sukses dan reset form
  if (isNamaValid && isEmailValid && isNoHpValid && isTopikValid && isPersetujuanValid) {
    // Dapatkan nama untuk popup
    const nama = namaLengkap.value.trim();
    
    // Tampilkan popup
    showSuccessPopup(nama);
    
    // Reset form dan status validasi
    form.reset();
    
    // Hapus class success/error dari semua input
    [namaLengkap, email, noHp, topikWebinar, persetujuan].forEach(input => {
      input.classList.remove('success', 'error');
    });

    // Sembunyikan semua error message
    document.querySelectorAll('.error-message').forEach(error => {
      error.classList.remove('show');
    });
  } else {
    // Scroll ke error pertama
    const firstError = document.querySelector('.error');
    if (firstError) {
      firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
});

// ============================================
// ANIMASI SAAT HALAMAN DIMUAT
// ============================================

window.addEventListener('DOMContentLoaded', () => {
  console.log('=== TENTANG KAMI - KERIPIK SINGKONG CANDRA ===');
  console.log('Form webinar siap digunakan!');
  
  // Animate cards on scroll
  const observeCards = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.about-card, .value-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    observeCards.observe(card);
  });
});