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
    namePh: 'اكتب اسمك الكامل',
    contactPh: 'رقم موبايلك أو إيميلك',
    services: ['بتفكر في إيه؟','برمجة وتصميم موقع','تجميع تطبيق موبايل','بوت تيليجرام','إدارة قناة تيليجرام','استشارة رقمية','أخرى']
  },
  en: {
    namePh: 'Enter your full name',
    contactPh: 'Phone or email',
    services: ['What do you need?','Web Development','UI/UX Design','Telegram Bots & Automation','Telegram Channel Management','Digital Consultation','Other']
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
    alert(document.getElementById('html-root').lang === 'ar' ? 'يا ريت تملى بياناتك كلها الأول' : 'Please fill all fields before sending.');
    return;
  }
  var msg = encodeURIComponent('أهلاً يا أحمد!\nالاسم: ' + name.value + '\nالتواصل: ' + contact.value + '\nالخدمة المطلوبة: ' + (service ? service.value : ''));
  window.open('https://wa.me/201152628515?text=' + msg, '_blank');
}

// ===== THREE.JS BACKGROUND =====
function init3DBackground() {
  var container = document.getElementById('canvas-container');
  if (!container || typeof THREE === 'undefined') return;

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
  
  var renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);

  var geometry = new THREE.IcosahedronGeometry(2, 1);
  var material = new THREE.MeshBasicMaterial({ 
    color: 0x7c3aed, 
    wireframe: true, 
    transparent: true, 
    opacity: 0.3 
  });
  
  var mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  camera.position.z = 5;
  mesh.position.x = 2; // slight offset defaults

  var clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    var t = clock.getElapsedTime();
    mesh.rotation.x = t * 0.1;
    mesh.rotation.y = t * 0.15;
    mesh.position.y = Math.sin(t * 0.5) * 0.2;
    renderer.render(scene, camera);
  }
  
  animate();

  window.addEventListener('resize', function() {
    if (!container) return;
    var width = container.clientWidth;
    var height = container.clientHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    if (window.innerWidth < 768) {
      mesh.position.x = 0;
      mesh.position.y = 1; 
    } else {
      mesh.position.x = 2;
    }
  });

  window.dispatchEvent(new Event('resize'));
}

// Init after DOM ready
document.addEventListener('DOMContentLoaded', function() {
  setLang('en');
  init3DBackground();
});
