
// KERIPIK SINGKONG CANDRA - MAIN SCRIPT

$(document).ready(function() {
    console.log('🍠 Keripik Singkong Candra - Website Ready!');
    initApp();
});

// Inisalisasi
function initApp() {
    initTooltips();
    initSmoothScroll();
    initNavbarScroll();
    initCardHover();
    initPageSpecific();
    showWelcome();
}

// Initialisasi Bootstrap
function initTooltips() {
    $('[data-bs-toggle="tooltip"]').each(function() {
        new bootstrap.Tooltip(this);
    });
}

// Smooth scroll
function initSmoothScroll() {
    $('a[href^="#"]').on('click', function(e) {
        const href = $(this).attr('href');
        if (href !== '#' && $(href).length) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: $(href).offset().top - 70
            }, 600);
        }
    });
}

// Navbar scroll effect
function initNavbarScroll() {
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('.navbar-custom').addClass('shadow-lg');
        } else {
            $('.navbar-custom').removeClass('shadow-lg');
        }
    });
}

// Card hover effects
function initCardHover() {
    $('.card, .feature-card, .contact-card-modern').hover(
        function() { $(this).addClass('shadow-lg'); },
        function() { $(this).removeClass('shadow-lg'); }
    );
}

// Pesan Selamat datang
function showWelcome() {
    if (!sessionStorage.getItem('welcomed')) {
        setTimeout(() => {
            console.log('Selamat datang di Keripik Singkong Candra!');
            sessionStorage.setItem('welcomed', 'true');
        }, 500);
    }
}

// ============================================
// PAGE-SPECIFIC INITIALIZATION
// ============================================
function initPageSpecific() {
    const page = getCurrentPage();
    
    if (page === 'index.html' || page === '') {
        initHomePage();
    } else if (page === 'kontak.html') {
        initContactPage();
    }
}

function getCurrentPage() {
    const path = window.location.pathname;
    return path.substring(path.lastIndexOf('/') + 1);
}

// ============================================
// HOME PAGE
// ============================================
function initHomePage() {
    console.log('Home page loaded');
    
    // Animate hero on load
    setTimeout(() => {
        $('.hero-content').css('opacity', '1');
    }, 100);
}

// ============================================
// CONTACT PAGE
// ============================================
function initContactPage() {
    console.log('Contact page loaded');
    
    const form = $('#contactForm');
    
    // Validasi real-time
    $('input, select, textarea').on('blur', function() {
        validateField($(this));
    });
    
    // Nomor HP - numbers only
    $('#nomorhp').on('input', function() {
        this.value = this.value.replace(/[^0-9]/g, '');
    });
    
    // Form submit
    form.on('submit', function(e) {
        e.preventDefault();
        handleFormSubmit(form);
    });
    
    // Tombol clear
    $('#clearBtn').on('click', function() {
        if (confirm('Hapus semua data?')) {
            form[0].reset();
            form.removeClass('was-validated');
            $('.is-valid, .is-invalid').removeClass('is-valid is-invalid');
            showFeedback('info', 'ℹ️ Data telah dihapus!');
        }
    });
    
    // Newsletter checkbox
    $('#langganan').on('change', function() {
        if ($(this).is(':checked')) {
            showFeedback('success', '✅ Terima kasih telah berlangganan!');
        }
    });
}

function handleFormSubmit(form) {
    if (!form[0].checkValidity()) {
        form.addClass('was-validated');
        showFeedback('danger', '⚠️ Mohon lengkapi semua field!');
        return;
    }
    
    const nama = $('#nama').val();
    const nomorHP = $('#nomorhp').val();
    const tanggal = $('#tanggal').val();
    
    // Validasi nomor HP
    if (nomorHP.length < 10 || nomorHP.length > 13) {
        showFeedback('danger', '⚠️ Nomor HP harus 10-13 digit!');
        $('#nomorhp').addClass('is-invalid');
        return;
    }
    
    if (nomorHP.charAt(0) !== '0') {
        showFeedback('danger', '⚠️ Nomor HP harus dimulai dengan 0!');
        $('#nomorhp').addClass('is-invalid');
        return;
    }
    
    // Validasi tanggal
    const selectedDate = new Date(tanggal);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
        showFeedback('danger', '⚠️ Tanggal tidak boleh di masa lalu!');
        $('#tanggal').addClass('is-invalid');
        return;
    }
    
    // Success
    if ($('#successModal').length) {
        $('#modalNama').text(nama);
        new bootstrap.Modal('#successModal').show();
    } else {
        alert(`✅ Terima kasih ${nama}! Pesan berhasil dikirim.`);
    }
    
    showFeedback('success', `✅ Terima kasih ${nama}! Pesan berhasil dikirim.`);
    
    // Reset form
    setTimeout(() => {
        form[0].reset();
        form.removeClass('was-validated');
        $('.is-valid, .is-invalid').removeClass('is-valid is-invalid');
    }, 1000);
}

function validateField(field) {
    if (field[0].checkValidity()) {
        field.removeClass('is-invalid').addClass('is-valid');
        return true;
    } else {
        field.removeClass('is-valid').addClass('is-invalid');
        return false;
    }
}

function showFeedback(type, message) {
    const alert = $('#feedbackAlert');
    if (!alert.length) return;
    
    const alertClass = {
        'success': 'alert-success',
        'danger': 'alert-danger',
        'warning': 'alert-warning',
        'info': 'alert-info'
    }[type];
    
    alert.removeClass('alert-success alert-danger alert-warning alert-info')
         .addClass(alertClass + ' show')
         .fadeIn();
    
    $('#feedbackMessage').html(message);
    
    alert[0]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    if (type === 'success' || type === 'info') {
        setTimeout(() => alert.fadeOut(), 5000);
    }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Share location
window.shareLokasi = function() {
    const text = `📍 Keripik Singkong Candra\nJl. Raya Bulakpelem No. 3, Sragi, Pekalongan\n\nhttps://www.google.com/maps/dir/?api=1&destination=-6.953044,109.551689`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Lokasi Keripik Singkong Candra',
            text: text
        }).catch(() => copyToClipboard(text));
    } else {
        copyToClipboard(text);
    }
};

function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
        document.execCommand('copy');
        alert('✅ Lokasi berhasil disalin ke clipboard!');
    } catch {
        alert('❌ Gagal menyalin. Silakan copy manual:\n\n' + text);
    }
    
    document.body.removeChild(textarea);
}

// Format currency
window.formatRupiah = function(angka) {
    return 'Rp ' + parseInt(angka).toLocaleString('id-ID');
};

// ============================================
// ANIMATIONS
// ============================================

// Fade in on scroll
$(window).on('scroll', function() {
    $('.card, .feature-card').each(function() {
        const cardTop = $(this).offset().top;
        const scrollTop = $(window).scrollTop() + $(window).height();
        
        if (scrollTop > cardTop + 100) {
            $(this).css({
                'opacity': '1',
                'transform': 'translateY(0)'
            });
        }
    });
});

// Initial setup for cards
$('.card, .feature-card').css({
    'opacity': '0',
    'transform': 'translateY(20px)',
    'transition': 'all 0.6s ease'
});

// Animate on load
setTimeout(() => {
    $('.card, .feature-card').each(function(index) {
        setTimeout(() => {
            $(this).css({
                'opacity': '1',
                'transform': 'translateY(0)'
            });
        }, index * 100);
    });
}, 200);

console.log('✅ All functions initialized successfully!');