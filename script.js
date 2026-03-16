// ===== SIDEBAR =====
function openSidebar() {
  var sb = document.getElementById('sidebar');
  var ov = document.getElementById('overlay');
  if (sb) sb.classList.add('open');
  if (ov) ov.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeSidebar() {
  var sb = document.getElementById('sidebar');
  var ov = document.getElementById('overlay');
  if (sb) sb.classList.remove('open');
  if (ov) ov.classList.remove('open');
  document.body.style.overflow = '';
}

// ===== LANGUAGE =====
var langData = {
  ar: {
    namePh: 'أدخل اسمك الكامل',
    contactPh: 'أدخل رقمك أو بريدك الإلكتروني',
    services: ['اختر نوع الخدمة','تصميم وتطوير موقع ويب','تصميم تطبيق موبايل','بوت تيليجرام','قناة تيليجرام احترافية','تصميم UI/UX','مشروع مخصص']
  },
  en: {
    namePh: 'Enter your full name',
    contactPh: 'Enter your phone or email',
    services: ['Choose service type','Web Design & Development','Mobile App Design','Telegram Bot','Professional Telegram Channel','UI/UX Design','Custom Project']
  }
};

function setLang(lang) {
  var root = document.getElementById('html-root');
  if (!root) return;
  root.setAttribute('lang', lang);
  root.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

  var btnAr = document.getElementById('btn-ar');
  var btnEn = document.getElementById('btn-en');
  if (btnAr) btnAr.classList.toggle('active', lang === 'ar');
  if (btnEn) btnEn.classList.toggle('active', lang === 'en');

  var nameEl = document.getElementById('name-input');
  var contactEl = document.getElementById('contact-input');
  var selEl = document.getElementById('service-select');

  if (nameEl) nameEl.placeholder = langData[lang].namePh;
  if (contactEl) contactEl.placeholder = langData[lang].contactPh;

  if (selEl) {
    selEl.innerHTML = '';
    langData[lang].services.forEach(function(s) {
      var opt = document.createElement('option');
      opt.textContent = s;
      selEl.appendChild(opt);
    });
  }
}

// ===== SEND =====
function sendInquiry() {
  var name = document.getElementById('name-input');
  var contact = document.getElementById('contact-input');
  var service = document.getElementById('service-select');
  if (!name || !contact) return;
  if (!name.value || !contact.value) {
    alert(document.getElementById('html-root').lang === 'ar' ? 'برجاء ملء جميع الحقول' : 'Please fill all fields');
    return;
  }
  var msg = encodeURIComponent('مرحباً أحمد!\nالاسم: ' + name.value + '\nالتواصل: ' + contact.value + '\nالخدمة: ' + (service ? service.value : ''));
  window.open('https://wa.me/201152628515?text=' + msg, '_blank');
}

// Init after DOM ready
document.addEventListener('DOMContentLoaded', function() {
  setLang('ar');
});
