// ROKI — Main JS

document.addEventListener('DOMContentLoaded', () => {

  // ===== NAVBAR SCROLL =====
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // ===== HAMBURGER MENU =====
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
      });
    });
  }

  // ===== SCROLL REVEAL =====
  const revealEls = document.querySelectorAll('.col-item, .about-inner, .feature-item, .order-info-card, .form-card');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealEls.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // ===== THEME TOGGLE =====
  const themeToggle = document.getElementById('themeToggle');
  const sunIcon = document.querySelector('.icon-sun');
  const moonIcon = document.querySelector('.icon-moon');

  const currentTheme = localStorage.getItem('roki_theme') || 'dark';
  if (currentTheme === 'light') {
    document.body.classList.add('light-theme');
    sunIcon.classList.add('hidden');
    moonIcon.classList.remove('hidden');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('light-theme');
      const isLight = document.body.classList.contains('light-theme');
      localStorage.setItem('roki_theme', isLight ? 'light' : 'dark');

      sunIcon.classList.toggle('hidden', isLight);
      moonIcon.classList.toggle('hidden', !isLight);
    });
  }

  // ===== HIDDEN ADMIN ACCESS =====
  let keyBuffer = "";
  document.addEventListener('keydown', (e) => {
    keyBuffer += e.key.toLowerCase();
    if (keyBuffer.endsWith('aaa')) {
      window.location.href = 'admin.html';
    }
    if (keyBuffer.length > 10) keyBuffer = keyBuffer.substring(1);
  });

  // ===== DYNAMIC PRODUCTS =====
  const productGrid = document.getElementById('dynamicCollectionGrid');
  if (productGrid) {
    const products = typeof getProducts === 'function' ? getProducts() : [];
    productGrid.innerHTML = '';

    products.forEach(p => {
      const colItem = document.createElement('div');
      colItem.className = 'col-item';
      colItem.innerHTML = `
        <div class="col-img-wrap">
          <img src="${p.image}" alt="${p.name}" class="col-img">
          <div class="col-overlay">
            <span class="col-name">${p.name}</span>
            <span class="col-price">${p.price}</span>
            <a href="order.html?product=${encodeURIComponent(p.name)}" class="col-btn" data-i18n="order_btn">Order</a>
          </div>
        </div>
      `;
      productGrid.appendChild(colItem);
    });
  }

});
