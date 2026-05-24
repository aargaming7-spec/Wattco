/* ===================================================
   WattCo — Power Wear | script.js
   Vanilla JavaScript — No Frameworks
   =================================================== */

// =====================================================
// DATA — Products Array
// =====================================================
const products = [
  {
    id: 1,
    name: "Kemeja PDH",
    category: "pakaian",
    categoryLabel: "Kemeja",
    desc: "Pakaian Dinas Harian custom untuk himpunan. Material drill premium, sablon/bordir nama & logo.",
    price: 185000,
    priceLabel: "Rp185.000",
    sizes: ["S","M","L","XL"],
    badge: "popular",
    badgeLabel: "Populer",
    img: "images/pdh.PNG",
    inStock: true
  },
  {
    id: 2,
    name: "Kaos Event",
    category: "pakaian",
    categoryLabel: "Kaos",
    desc: "Kaos cotton combed 30s, cocok untuk event, ospek, atau gathering komunitas.",
    price: 85000,
    priceLabel: "Rp85.000",
    sizes: ["S","M","L","XL","XXL"],
    badge: "new",
    badgeLabel: "Baru",
    img: "images/kaos.PNG",
    inStock: true
  },
  {
    id: 3,
    name: "Jaket Himpunan",
    category: "pakaian",
    categoryLabel: "Jaket",
    desc: "Jaket varsity atau bomber custom dengan bordir logo himpunan, premium & berkelas.",
    price: 200000,
    priceLabel: "Rp200.000",
    sizes: ["S","M","L","XL"],
    badge: "custom",
    badgeLabel: "Custom",
    img: "images/jahim.PNG",
    inStock: true
  },
  {
    id: 4,
    name: "Pin Enamel",
    category: "aksesoris",
    categoryLabel: "Aksesoris",
    desc: "Pin enamel hard/soft dengan desain custom, cocok untuk identitas himpunan atau suvenir.",
    price: 35000,
    priceLabel: "Rp35.000",
    sizes: [],
    badge: "new",
    badgeLabel: "Baru",
    img: "images/pin enamel.jfif",
    inStock: true
  },
  {
    id: 5,
    name: "Wearpack",
    category: "pakaian",
    categoryLabel: "Wearpack",
    desc: "Wearpack custom dengan sablon teks/logo. Cocok untuk kegiatan lapangan.",
    price: 250000,
    priceLabel: "Rp250.000",
    sizes: [],
    badge: "custom",
    badgeLabel: "Custom",
    img: "images/wearpack.PNG",
    inStock: true
  },
  {
    id: 6,
    name: "Tote Bag",
    category: "merchandise",
    categoryLabel: "Merchandise",
    desc: "Tote bag canvas premium dengan sablon custom. Fungsional sekaligus media branding yang stylish.",
    price: 55000,
    priceLabel: "Rp55.000",
    sizes: [],
    badge: "popular",
    badgeLabel: "Populer",
    img: "images/totebag.PNG",
    inStock: true
  },

 {
    id: 7,
    name: "Lanyard",
    category: "merchandise",
    categoryLabel: "Merchandise",
    desc: "Lanyard premium dengan desain custom. Fungsional sekaligus media branding yang stylish.",
    price: 15000,
    priceLabel: "Rp15.000",
    sizes: [],
    badge: "popular",
    badgeLabel: "Populer",
    img: "images/lanyard.PNG",
    inStock: true
  },
];

// =====================================================
// DATA — Portfolio Array
// =====================================================
const portfolioItems = [
  {
    id: 1,
    title: "PDH HMTE Unpad 2023",
    desc: "Kemeja PDH Tahun 2023",
    tag: "PDH Custom",
    img: "images/pdh porto.png",
    featured: true
  },
  {
    id: 2,
    title: "Jaket Himpunan Elektro",
    desc: "Batch 50 pcs, bordir premium",
    tag: "Jaket",
    img: "images/jahim porto.png",
    featured: false
  },
  {
    id: 3,
    title: "Wearpack Praktikum 2023",
    desc: "200 pcs untuk praktikum",
    tag: "Wearpack",
    img: "images/wearpack porto.png",
    featured: false
  },
];

// =====================================================
// DATA — FAQ Array
// =====================================================
const faqs = [
  {
    q: "Berapa minimum order (MOQ) di WattCo?",
    a: "Minimum order untuk produk pakaian adalah 12 pcs. Untuk aksesoris seperti pin enamel dan gelang, minimum order adalah 50 pcs. Kami juga menerima order satuan untuk produk tertentu dengan harga yang berbeda."
  },
  {
    q: "Apakah bisa custom desain sepenuhnya?",
    a: "Ya, semua produk WattCo bisa dikustom 100% sesuai kebutuhanmu — mulai dari warna, logo, teks nama, nomor anggota, hingga layout keseluruhan. Tim desain kami akan membantu mewujudkan ide kamu."
  },
  {
    q: "Berapa lama proses produksi?",
    a: "Estimasi waktu produksi: Kemeja PDH 7–14 hari kerja, Kaos 5–10 hari, Jaket 10–21 hari, Pin Enamel 14–21 hari, Gelang 5–10 hari. Waktu dihitung setelah desain final disetujui dan DP dibayarkan."
  },
  {
    q: "Bagaimana sistem pembayaran?",
    a: "Sistem pembayaran kami adalah Down Payment (DP) 50% di awal untuk memulai produksi, dan pelunasan 50% saat produk siap dikirim/diambil. Transfer via BCA, BNI, atau QRIS."
  },
  {
    q: "Apakah WattCo melayani pengiriman ke luar Bandung?",
    a: "Ya, kami melayani pengiriman ke seluruh Indonesia melalui JNE, J&T, atau Sicepat. Biaya pengiriman ditanggung oleh pemesan. Untuk area Bandung Raya, bisa COD atau diambil langsung."
  },
  {
    q: "Apakah tersedia revisi desain?",
    a: "Kami memberikan 2x revisi desain secara gratis. Revisi lebih dari itu dikenakan biaya tambahan Rp25.000/revisi. Proses revisi maksimal 2 hari kerja."
  },
  {
    q: "Bagaimana cara menghubungi WattCo?",
    a: "Kamu bisa langsung chat WhatsApp di +62 815-7047-507, DM Instagram @vvatt.co, atau isi form Custom Order di halaman ini. Tim kami akan merespons dalam 1x24 jam."
  }
];

// =====================================================
// CART STATE
// =====================================================
let cart = [];

// =====================================================
// DOM Ready
// =====================================================
document.addEventListener("DOMContentLoaded", () => {
  initLoader();
  initLucideIcons();
  initCursor();
  initNavbar();
  initTheme();
  renderProducts();
  renderPortfolio();
  renderFAQ();
  initCart();
  initOrderForm();
  initScrollAnimations();
  initBackToTop();
  initFilterTabs();
});

// =====================================================
// 1. LOADER
// =====================================================
function initLoader() {
  const loader = document.getElementById("loader");
  const bar = document.getElementById("loaderBar");
  const sub = document.getElementById("loaderSub");

  const steps = [
    { pct: 20, msg: "Loading assets..." },
    { pct: 45, msg: "Preparing catalog..." },
    { pct: 70, msg: "Calibrating power..." },
    { pct: 90, msg: "Almost ready..." },
    { pct: 100, msg: "Power Wear Ready ⚡" }
  ];

  let i = 0;
  const interval = setInterval(() => {
    if (i >= steps.length) {
      clearInterval(interval);
      setTimeout(() => {
        loader.classList.add("hidden");
        document.body.style.overflow = "";
      }, 400);
      return;
    }
    bar.style.width = steps[i].pct + "%";
    sub.textContent = steps[i].msg;
    i++;
  }, 300);

  document.body.style.overflow = "hidden";
}

// =====================================================
// 2. LUCIDE ICONS
// =====================================================
function initLucideIcons() {
  if (window.lucide) lucide.createIcons();
  // Re-call after dynamic content
  setTimeout(() => { if (window.lucide) lucide.createIcons(); }, 500);
  setTimeout(() => { if (window.lucide) lucide.createIcons(); }, 1500);
}

// =====================================================
// 3. CUSTOM CURSOR
// =====================================================
function initCursor() {
  const cursor = document.getElementById("cursor");
  const follower = document.getElementById("cursorFollower");
  if (!cursor || !follower) return;

  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + "px";
    cursor.style.top = mouseY + "px";
  });

  // Smooth follower
  function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    follower.style.left = followerX + "px";
    follower.style.top = followerY + "px";
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  // Scale on clickable elements
  document.querySelectorAll("a, button, [data-lucide]").forEach(el => {
    el.addEventListener("mouseenter", () => {
      cursor.style.width = "14px";
      cursor.style.height = "14px";
      follower.style.width = "44px";
      follower.style.height = "44px";
    });
    el.addEventListener("mouseleave", () => {
      cursor.style.width = "8px";
      cursor.style.height = "8px";
      follower.style.width = "28px";
      follower.style.height = "28px";
    });
  });
}

// =====================================================
// 4. NAVBAR
// =====================================================
function initNavbar() {
  const navbar = document.getElementById("navbar");
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");

  // Scroll effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
    updateActiveNav();
  });

  // Hamburger
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    navLinks.classList.toggle("mobile-open");
    document.body.classList.toggle("menu-open");
  });

  // Close on nav link click
  navLinks.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      hamburger.classList.remove("open");
      navLinks.classList.remove("mobile-open");
      document.body.classList.remove("menu-open");
    });
  });
}

// Active nav link on scroll
function updateActiveNav() {
  const sections = ["home","products","portfolio","order","about","faq","contact"];
  const scrollY = window.scrollY + 100;

  for (let i = sections.length - 1; i >= 0; i--) {
    const section = document.getElementById(sections[i]);
    if (!section) continue;
    if (scrollY >= section.offsetTop) {
      document.querySelectorAll(".nav-links a").forEach(a => a.classList.remove("active"));
      const activeLink = document.querySelector(`.nav-links a[href="#${sections[i]}"]`);
      if (activeLink) activeLink.classList.add("active");
      break;
    }
  }
}

// Scroll helper
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--nav-h")) || 72;
    window.scrollTo({ top: el.offsetTop - navH + 1, behavior: "smooth" });
  }
}
window.scrollToSection = scrollToSection;

// =====================================================
// 5. THEME TOGGLE
// =====================================================
function initTheme() {
  const toggle = document.getElementById("themeToggle");
  const icon = document.getElementById("themeIcon");
  const html = document.documentElement;

  // Load saved
  const saved = localStorage.getItem("wattco-theme") || "dark";
  html.setAttribute("data-theme", saved);
  updateThemeIcon(saved, icon);

  toggle.addEventListener("click", () => {
    const current = html.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", next);
    localStorage.setItem("wattco-theme", next);
    updateThemeIcon(next, icon);
    if (window.lucide) lucide.createIcons();
  });
}

function updateThemeIcon(theme, iconEl) {
  if (!iconEl) return;
  iconEl.setAttribute("data-lucide", theme === "dark" ? "sun" : "moon");
  if (window.lucide) lucide.createIcons();
}

// =====================================================
// 6. RENDER PRODUCTS
// =====================================================
function renderProducts(filter = "all") {
  const grid = document.getElementById("productsGrid");
  if (!grid) return;

  const filtered = filter === "all" ? products : products.filter(p => p.category === filter);

  grid.innerHTML = filtered.map((p, idx) => `
    <div class="product-card fade-in fade-in-delay-${(idx % 4) + 1}" data-category="${p.category}" data-id="${p.id}">
      <div class="product-img">
        <img src="${p.img}" alt="${p.name}" loading="lazy" />
        ${p.badge ? `<span class="product-badge badge-${p.badge}">${p.badgeLabel}</span>` : ""}
        <div class="product-overlay">
          <button class="overlay-btn overlay-btn-order" onclick="orderNow('${p.name}')">
            <i data-lucide="zap"></i> Order
          </button>
          <button class="overlay-btn overlay-btn-cart" onclick="addToCart(${p.id})">
            <i data-lucide="shopping-bag"></i>
          </button>
        </div>
      </div>
      <div class="product-info">
        <div class="product-category">${p.categoryLabel}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-desc">${p.desc}</div>
        <div class="product-footer">
          <div class="product-price">
            ${p.priceLabel}
            <small>/ pcs (min. order)</small>
          </div>
          ${p.sizes.length > 0
            ? `<div class="product-sizes">${p.sizes.map(s => `<span class="size-tag">${s}</span>`).join("")}</div>`
            : ""}
        </div>
      </div>
    </div>
  `).join("");

  // Refresh icons & scroll animations
  setTimeout(() => {
    if (window.lucide) lucide.createIcons();
    initScrollAnimations();
  }, 100);
}

window.orderNow = function(productName) {
  const msg = encodeURIComponent(`Halo WattCo! Saya ingin order ${productName}. Mohon info lebih lanjut ya.`);
  window.open(`https://wa.me/628157047507?text=${msg}`, "_blank");
};

window.addToCart = function(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += 1;
    showToast(`Qty ${product.name} diupdate`, "success");
  } else {
    cart.push({ ...product, qty: 1 });
    showToast(`${product.name} ditambahkan ke keranjang!`, "success");
  }
  updateCartUI();
};

// =====================================================
// 7. FILTER TABS
// =====================================================
function initFilterTabs() {
  const tabs = document.querySelectorAll(".filter-tab");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      renderProducts(tab.dataset.filter);
    });
  });
}

// =====================================================
// 8. RENDER PORTFOLIO
// =====================================================
function renderPortfolio() {
  const grid = document.getElementById("portfolioGrid");
  if (!grid) return;

  grid.innerHTML = portfolioItems.map((item, idx) => `
    <div class="portfolio-item ${item.featured ? "featured" : ""} fade-in fade-in-delay-${(idx % 4) + 1}">
      <img src="${item.img}" alt="${item.title}" loading="lazy" />
      <div class="portfolio-overlay">
        <span class="portfolio-tag">${item.tag}</span>
        <h4>${item.title}</h4>
        <p>${item.desc}</p>
      </div>
    </div>
  `).join("");

  setTimeout(() => initScrollAnimations(), 100);
}

// =====================================================
// 9. RENDER FAQ
// =====================================================
function renderFAQ() {
  const list = document.getElementById("faqList");
  if (!list) return;

  list.innerHTML = faqs.map((faq, idx) => `
    <div class="faq-item fade-in" data-index="${idx}">
      <button class="faq-question" onclick="toggleFAQ(${idx})">
        <span>${faq.q}</span>
        <i data-lucide="chevron-down" class="faq-icon"></i>
      </button>
      <div class="faq-answer">
        <div class="faq-answer-inner">${faq.a}</div>
      </div>
    </div>
  `).join("");

  setTimeout(() => {
    if (window.lucide) lucide.createIcons();
    initScrollAnimations();
  }, 100);
}

window.toggleFAQ = function(idx) {
  const items = document.querySelectorAll(".faq-item");
  items.forEach((item, i) => {
    if (i === idx) {
      item.classList.toggle("open");
    } else {
      item.classList.remove("open");
    }
  });
};

// =====================================================
// 10. CART
// =====================================================
function initCart() {
  const cartBtn = document.getElementById("cartBtn");
  const closeCart = document.getElementById("closeCart");
  const overlay = document.getElementById("cartOverlay");
  const checkoutBtn = document.getElementById("checkoutBtn");

  cartBtn.addEventListener("click", openCart);
  closeCart.addEventListener("click", closeCartPanel);
  overlay.addEventListener("click", closeCartPanel);

  checkoutBtn.addEventListener("click", () => {
    if (cart.length === 0) return;

    let msg = "Halo WattCo! Saya ingin order:\n\n";
    cart.forEach(item => {
      msg += `• ${item.name} x${item.qty} = ${formatPrice(item.price * item.qty)}\n`;
    });
    msg += `\nTotal: ${formatPrice(cart.reduce((sum, item) => sum + item.price * item.qty, 0))}`;
    msg += "\n\nMohon konfirmasi pesanan saya ya!";

    window.open(`https://wa.me/628157047507?text=${encodeURIComponent(msg)}`, "_blank");
  });
}

function openCart() {
  document.getElementById("cartSidebar").classList.add("open");
  document.getElementById("cartOverlay").classList.add("active");
  document.body.classList.add("menu-open");
}

function closeCartPanel() {
  document.getElementById("cartSidebar").classList.remove("open");
  document.getElementById("cartOverlay").classList.remove("active");
  document.body.classList.remove("menu-open");
}

function updateCartUI() {
  const count = document.getElementById("cartCount");
  const itemsContainer = document.getElementById("cartItems");
  const empty = document.getElementById("cartEmpty");
  const footer = document.getElementById("cartFooter");
  const totalPrice = document.getElementById("cartTotalPrice");

  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  count.textContent = totalQty;
  count.style.display = totalQty > 0 ? "flex" : "none";

  if (cart.length === 0) {
    empty.style.display = "flex";
    footer.style.display = "none";
    // Remove dynamic items
    document.querySelectorAll(".cart-item").forEach(el => el.remove());
  } else {
    empty.style.display = "none";
    footer.style.display = "block";

    // Re-render cart items
    document.querySelectorAll(".cart-item").forEach(el => el.remove());
    cart.forEach(item => {
      const el = document.createElement("div");
      el.className = "cart-item";
      el.innerHTML = `
        <img src="${item.img}" alt="${item.name}" />
        <div class="cart-item-info">
          <h5>${item.name}</h5>
          <span>Qty: ${item.qty}</span>
          <div class="cart-item-price">${formatPrice(item.price * item.qty)}</div>
        </div>
        <button class="cart-item-remove" onclick="removeFromCart(${item.id})" title="Hapus">
          <i data-lucide="trash-2"></i>
        </button>
      `;
      itemsContainer.insertBefore(el, document.getElementById("cartEmpty"));
    });

    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    totalPrice.textContent = formatPrice(total);
  }

  if (window.lucide) lucide.createIcons();
}

window.removeFromCart = function(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCartUI();
  showToast("Item dihapus dari keranjang", "error");
};

function formatPrice(num) {
  return "Rp" + num.toLocaleString("id-ID");
}

// =====================================================
// 11. ORDER FORM
// =====================================================
function initOrderForm() {
  const form = document.getElementById("orderForm");
  const fileInput = document.getElementById("design");
  const fileUploadArea = document.getElementById("fileUploadArea");
  const filePreview = document.getElementById("filePreview");
  const fileUploadContent = fileUploadArea.querySelector(".file-upload-content");

  // File upload preview
  fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      showToast("Ukuran file maksimal 10MB", "error");
      return;
    }

    fileUploadContent.style.display = "none";
    filePreview.style.display = "flex";

    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        filePreview.innerHTML = `
          <img src="${ev.target.result}" alt="preview" />
          <div>
            <strong style="font-size:0.85rem">${file.name}</strong>
            <span style="font-size:0.75rem;color:var(--text-muted)">${(file.size/1024).toFixed(0)} KB</span>
          </div>
          <button type="button" onclick="clearFileUpload()" style="margin-left:auto;color:var(--text-muted)">
            <i data-lucide="x"></i>
          </button>
        `;
        if (window.lucide) lucide.createIcons();
      };
      reader.readAsDataURL(file);
    } else {
      filePreview.innerHTML = `
        <i data-lucide="file-text" style="color:var(--accent)"></i>
        <div>
          <strong style="font-size:0.85rem">${file.name}</strong>
          <span style="font-size:0.75rem;color:var(--text-muted)">${(file.size/1024).toFixed(0)} KB</span>
        </div>
        <button type="button" onclick="clearFileUpload()" style="margin-left:auto;color:var(--text-muted)">
          <i data-lucide="x"></i>
        </button>
      `;
      if (window.lucide) lucide.createIcons();
    }
  });

  // Drag & Drop
  fileUploadArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    fileUploadArea.classList.add("drag-over");
  });
  fileUploadArea.addEventListener("dragleave", () => {
    fileUploadArea.classList.remove("drag-over");
  });
  fileUploadArea.addEventListener("drop", (e) => {
    e.preventDefault();
    fileUploadArea.classList.remove("drag-over");
    const file = e.dataTransfer.files[0];
    if (file) {
      const dt = new DataTransfer();
      dt.items.add(file);
      fileInput.files = dt.files;
      fileInput.dispatchEvent(new Event("change"));
    }
  });

  // Form submit
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (validateForm()) {
      submitOrder();
    }
  });
}

window.clearFileUpload = function() {
  const fileInput = document.getElementById("design");
  const filePreview = document.getElementById("filePreview");
  const fileUploadContent = document.querySelector(".file-upload-content");

  fileInput.value = "";
  filePreview.style.display = "none";
  filePreview.innerHTML = "";
  if (fileUploadContent) fileUploadContent.style.display = "flex";
};

function validateForm() {
  let valid = true;

  const fields = [
    { id: "nama", errId: "namaError", msg: "Nama tidak boleh kosong" },
    { id: "email", errId: "emailError", msg: "Email tidak valid", type: "email" },
    { id: "phone", errId: "phoneError", msg: "Nomor HP tidak boleh kosong" },
    { id: "product", errId: "productError", msg: "Pilih jenis produk" },
    { id: "qty", errId: "qtyError", msg: "Jumlah minimal 1" }
  ];

  fields.forEach(f => {
    const el = document.getElementById(f.id);
    const err = document.getElementById(f.errId);
    if (!el || !err) return;

    el.classList.remove("error");
    err.textContent = "";

    const val = el.value.trim();
    if (!val) {
      el.classList.add("error");
      err.textContent = f.msg;
      valid = false;
    } else if (f.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      el.classList.add("error");
      err.textContent = "Format email tidak valid";
      valid = false;
    } else if (f.id === "qty" && parseInt(val) < 1) {
      el.classList.add("error");
      err.textContent = "Jumlah minimal 1 pcs";
      valid = false;
    }
  });

  return valid;
}

function submitOrder() {
  const btn = document.getElementById("submitBtn");
  btn.disabled = true;
  btn.innerHTML = `<i data-lucide="loader-2" class="spin"></i> <span>Memproses...</span>`;
  if (window.lucide) lucide.createIcons();

  // Simulate brief delay then redirect to WA
  setTimeout(() => {
    const nama = document.getElementById("nama").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const product = document.getElementById("product").value;
    const qty = document.getElementById("qty").value;
    const ukuran = document.getElementById("ukuran").value;
    const angkatan = document.getElementById("angkatan").value.trim();
    const catatan = document.getElementById("catatan").value.trim();

    let msg = `*Order Baru — WattCo*\n\n`;
    msg += `*Nama:* ${nama}\n`;
    if (angkatan) msg += `*Angkatan/Org:* ${angkatan}\n`;
    msg += `*Email:* ${email}\n`;
    msg += `*No. HP:* ${phone}\n\n`;
    msg += `*Produk:* ${product}\n`;
    msg += `*Jumlah:* ${qty} pcs\n`;
    if (ukuran) msg += `*Ukuran:* ${ukuran}\n`;
    if (catatan) msg += `\n*Catatan:* ${catatan}\n`;
    msg += `\nMohon konfirmasi dan informasi lanjutan. Terima kasih!`;

    window.open(`https://wa.me/628157047507?text=${encodeURIComponent(msg)}`, "_blank");

    btn.disabled = false;
    btn.innerHTML = `<i data-lucide="send"></i> <span>Kirim & Pesan via WhatsApp</span>`;
    if (window.lucide) lucide.createIcons();

    showToast("Berhasil! Melanjutkan ke WhatsApp...", "success");
    document.getElementById("orderForm").reset();
    clearFileUpload();
  }, 1200);
}

// =====================================================
// 12. SCROLL ANIMATIONS
// =====================================================
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

  document.querySelectorAll(".fade-in").forEach(el => observer.observe(el));
}

// =====================================================
// 13. BACK TO TOP
// =====================================================
function initBackToTop() {
  const btn = document.getElementById("backToTop");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      btn.classList.add("visible");
    } else {
      btn.classList.remove("visible");
    }
  });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// =====================================================
// 14. TOAST NOTIFICATIONS
// =====================================================
function showToast(message, type = "success") {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span class="toast-icon"><i data-lucide="${type === "success" ? "check-circle" : "x-circle"}"></i></span>
    <span>${message}</span>
  `;
  container.appendChild(toast);

  if (window.lucide) lucide.createIcons();

  setTimeout(() => {
    toast.classList.add("out");
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// =====================================================
// 15. HERO PARALLAX (subtle)
// =====================================================
window.addEventListener("scroll", () => {
  const hero = document.querySelector(".hero-content");
  const scrollY = window.scrollY;
  if (hero && scrollY < window.innerHeight) {
    hero.style.transform = `translateY(${scrollY * 0.08}px)`;
  }
});

// =====================================================
// 16. Smooth anchor links in footer
// =====================================================
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", (e) => {
    const href = a.getAttribute("href");
    if (href.length > 1) {
      e.preventDefault();
      const id = href.slice(1);
      scrollToSection(id);
    }
  });
});

// Make updateCartUI available globally
window.updateCartUI = updateCartUI;

// Add spin CSS dynamically
const spinStyle = document.createElement("style");
spinStyle.textContent = `.spin { animation: spinAnim 1s linear infinite; } @keyframes spinAnim { to { transform: rotate(360deg); } }`;
document.head.appendChild(spinStyle);

// =====================================================
// ANIMASI TAMBAHAN — WattCo
// =====================================================

// 1. TYPING EFFECT (hero section)
function initTypingEffect() {
  const el = document.querySelector(".hero-title .title-line:first-child");
  if (!el) return;
  const words = ["POWER", "WATTCO", "CUSTOM", "POWER"];
  let wi = 0, ci = 0, deleting = false;
  const original = el.textContent;

  function type() {
    const w = words[wi];
    if (!deleting) {
      el.textContent = w.slice(0, ci + 1);
      ci++;
      if (ci === w.length) { deleting = true; setTimeout(type, 1800); return; }
    } else {
      el.textContent = w.slice(0, ci - 1);
      ci--;
      if (ci === 0) { deleting = false; wi = (wi + 1) % words.length; }
    }
    setTimeout(type, deleting ? 55 : 120);
  }
  setTimeout(type, 2000); // mulai setelah loader selesai
}

// 2. ELECTRIC PARTICLE BACKGROUND (canvas di hero)
function initParticleBackground() {
  const canvas = document.createElement("canvas");
  canvas.id = "particleCanvas";
  canvas.style.cssText = `
    position: fixed; top: 0; left: 0;
    width: 100%; height: 100%;
    pointer-events: none; z-index: 1;
    opacity: 0.35;
  `;
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  const N = 55;
  const pts = Array.from({ length: N }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - .5) * .6,
    vy: (Math.random() - .5) * .6,
    r: Math.random() * 1.8 + .8
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < N; i++) {
      const p = pts[i];
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0, 212, 255, 0.8)";
      ctx.fill();
      for (let j = i + 1; j < N; j++) {
        const q = pts[j];
        const d = Math.hypot(p.x - q.x, p.y - q.y);
        if (d < 100) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = `rgba(0, 212, 255, ${(1 - d / 100) * .25})`;
          ctx.lineWidth = .6; ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
}

// 3. ANIMATED NUMBER COUNTER
function initCounterAnimation() {
  const stats = document.querySelectorAll(".stat strong");
  const targets = [50, 20, 100]; // sesuaikan dengan angka di hero stats
  const suffixes = ["+", "+", "%"];

  function animateCount(el, target, suffix, duration = 1800) {
    const start = performance.now();
    function step(now) {
      const t = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3); // ease-out cubic
      el.textContent = Math.round(ease * target) + suffix;
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  // Jalankan saat elemen masuk viewport
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const idx = Array.from(stats).indexOf(entry.target);
        if (idx >= 0) animateCount(entry.target, targets[idx], suffixes[idx]);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  stats.forEach(el => observer.observe(el));
}

// 4. MOUSE PARALLAX pada hero card
function initParallax() {
  const card = document.querySelector(".hero-card");
  if (!card) return;
  document.addEventListener("mousemove", (e) => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const rx = ((e.clientY - cy) / cy) * 6;
    const ry = ((e.clientX - cx) / cx) * -6;
    card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  });
  document.addEventListener("mouseleave", () => {
    card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg)";
  });
}

// 5. RIPPLE EFFECT pada tombol
function initRippleEffect() {
  document.querySelectorAll(".btn-primary, .btn-secondary, .btn-submit, .btn-checkout").forEach(btn => {
    btn.addEventListener("click", function(e) {
      const ripple = document.createElement("span");
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.cssText = `
        position: absolute;
        width: ${size}px; height: ${size}px;
        left: ${e.clientX - rect.left - size / 2}px;
        top: ${e.clientY - rect.top - size / 2}px;
        background: rgba(255,255,255,0.25);
        border-radius: 50%;
        transform: scale(0);
        animation: rippleAnim .5s ease-out forwards;
        pointer-events: none;
      `;
      this.style.position = "relative";
      this.style.overflow = "hidden";
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 500);
    });
  });
}

// 6. PAGE TRANSITION saat load
function initPageTransition() {
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.5s ease";
  window.addEventListener("load", () => {
    setTimeout(() => { document.body.style.opacity = "1"; }, 100);
  });
}

// Tambahkan CSS ripple ke head
const extraStyle = document.createElement("style");
extraStyle.textContent = `
  @keyframes rippleAnim {
    to { transform: scale(2.5); opacity: 0; }
  }
  .hero-card {
    transition: transform 0.1s ease;
  }
`;
document.head.appendChild(extraStyle);

// Panggil semua animasi
document.addEventListener("DOMContentLoaded", () => {
  initParticleBackground();
  initTypingEffect();
  initCounterAnimation();
  initParallax();
  initRippleEffect();
});

// =====================================================
// ANIMASI TAMBAHAN BATCH 2 — WattCo
// =====================================================

// 7. LIGHTNING PULSE — elemen dekoratif hero
function initLightningPulse() {
  const bolts = document.querySelectorAll(".marquee-track .sep");
  let i = 0;
  setInterval(() => {
    bolts.forEach(b => b.style.opacity = "0.2");
    if (bolts[i]) {
      bolts[i].style.opacity = "1";
      bolts[i].style.transform = "scale(1.4)";
      bolts[i].style.transition = "all 0.2s";
      setTimeout(() => {
        if (bolts[i]) { bolts[i].style.transform = "scale(1)"; }
      }, 200);
    }
    i = (i + 1) % bolts.length;
  }, 300);
}

// 8. GLITCH TEXT — otomatis tiap beberapa detik
function initGlitchEffect() {
  const targets = document.querySelectorAll(".hero-title .title-line");
  if (!targets.length) return;

  // Inject CSS glitch
  const s = document.createElement("style");
  s.textContent = `
    .glitch-active { position: relative; }
    .glitch-active::before, .glitch-active::after {
      content: attr(data-text);
      position: absolute; top: 0; left: 0;
      width: 100%; overflow: hidden;
    }
    .glitch-active::before {
      color: #00d4ff;
      animation: gltch1 0.15s steps(2) 3;
      clip-path: polygon(0 0, 100% 0, 100% 40%, 0 40%);
    }
    .glitch-active::after {
      color: #ff4081;
      animation: gltch2 0.15s steps(2) 3;
      clip-path: polygon(0 60%, 100% 60%, 100% 100%, 0 100%);
    }
    @keyframes gltch1 {
      0% { transform: translate(-4px, 0); }
      50% { transform: translate(4px, 0); }
      100% { transform: translate(0, 0); }
    }
    @keyframes gltch2 {
      0% { transform: translate(4px, 0); }
      50% { transform: translate(-4px, 0); }
      100% { transform: translate(0, 0); }
    }
  `;
  document.head.appendChild(s);

  function glitch() {
    const el = targets[Math.floor(Math.random() * targets.length)];
    el.setAttribute("data-text", el.textContent);
    el.classList.add("glitch-active");
    setTimeout(() => el.classList.remove("glitch-active"), 500);
  }
  setInterval(glitch, 4000);
}

// 9. PROGRESS BAR ANIMATION — untuk section about
function initProgressBars() {
  // Tambahkan section progress di about jika belum ada
  const aboutContent = document.querySelector(".about-content");
  if (!aboutContent) return;

  const progSection = document.createElement("div");
  progSection.className = "progress-section";
  progSection.style.cssText = "margin-top: 1.5rem; display: flex; flex-direction: column; gap: 12px;";
  progSection.innerHTML = `
    <div class="prog-row" style="display:flex;align-items:center;gap:10px">
      <span style="font-size:0.8rem;color:var(--text-secondary);width:100px;flex-shrink:0">Kualitas Produk</span>
      <div style="flex:1;height:5px;background:var(--border);border-radius:99px;overflow:hidden">
        <div class="prog-fill" data-target="95" style="height:100%;width:0%;background:var(--gradient);border-radius:99px;transition:width 1.4s cubic-bezier(.4,0,.2,1)"></div>
      </div>
      <span class="prog-num" style="font-size:0.8rem;color:var(--accent);font-weight:700;width:36px;text-align:right">0%</span>
    </div>
    <div class="prog-row" style="display:flex;align-items:center;gap:10px">
      <span style="font-size:0.8rem;color:var(--text-secondary);width:100px;flex-shrink:0">Ketepatan Waktu</span>
      <div style="flex:1;height:5px;background:var(--border);border-radius:99px;overflow:hidden">
        <div class="prog-fill" data-target="90" style="height:100%;width:0%;background:var(--gradient);border-radius:99px;transition:width 1.4s cubic-bezier(.4,0,.2,1)"></div>
      </div>
      <span class="prog-num" style="font-size:0.8rem;color:var(--accent);font-weight:700;width:36px;text-align:right">0%</span>
    </div>
    <div class="prog-row" style="display:flex;align-items:center;gap:10px">
      <span style="font-size:0.8rem;color:var(--text-secondary);width:100px;flex-shrink:0">Kepuasan Klien</span>
      <div style="flex:1;height:5px;background:var(--border);border-radius:99px;overflow:hidden">
        <div class="prog-fill" data-target="98" style="height:100%;width:0%;background:var(--gradient);border-radius:99px;transition:width 1.4s cubic-bezier(.4,0,.2,1)"></div>
      </div>
      <span class="prog-num" style="font-size:0.8rem;color:var(--accent);font-weight:700;width:36px;text-align:right">0%</span>
    </div>
  `;
  aboutContent.appendChild(progSection);

  // Trigger saat masuk viewport
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const rows = entry.target.querySelectorAll(".prog-row");
      rows.forEach((row, i) => {
        const fill = row.querySelector(".prog-fill");
        const num = row.querySelector(".prog-num");
        const target = parseInt(fill.dataset.target);
        setTimeout(() => {
          fill.style.width = target + "%";
          const start = performance.now();
          function tick(now) {
            const t = Math.min((now - start) / 1400, 1);
            num.textContent = Math.round((1 - Math.pow(1 - t, 3)) * target) + "%";
            if (t < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
        }, i * 200);
      });
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.4 });
  obs.observe(progSection);
}

// 10. 3D MAGNETIC TILT — semua product cards
function initMagneticTilt() {
  const style = document.createElement("style");
  style.textContent = `.product-card { transform-style: preserve-3d; }`;
  document.head.appendChild(style);

  document.addEventListener("mousemove", (e) => {
    document.querySelectorAll(".product-card").forEach(card => {
      const r = card.getBoundingClientRect();
      const inCard = e.clientX > r.left && e.clientX < r.right &&
                     e.clientY > r.top && e.clientY < r.bottom;
      if (inCard) {
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(600px) rotateX(${-y * 10}deg) rotateY(${x * 10}deg) translateY(-6px)`;
        card.style.transition = "transform 0.08s ease";
      } else {
        card.style.transform = "perspective(600px) rotateX(0) rotateY(0) translateY(0)";
        card.style.transition = "transform 0.4s ease";
      }
    });
  });
}

// 11. HUD SCAN LINE — pada portfolio images
function initScanEffect() {
  const style = document.createElement("style");
  style.textContent = `
    .portfolio-item::after {
      content: '';
      position: absolute; left: 0; right: 0; height: 2px;
      background: linear-gradient(90deg, transparent, rgba(0,212,255,0.6), transparent);
      animation: scanLine 3s linear infinite;
      pointer-events: none;
    }
    @keyframes scanLine {
      from { top: -2px; opacity: 0; }
      10% { opacity: 1; }
      90% { opacity: 1; }
      to { top: 100%; opacity: 0; }
    }
    .portfolio-item:nth-child(2)::after { animation-delay: -1s; }
    .portfolio-item:nth-child(3)::after { animation-delay: -2s; }
    .portfolio-item:nth-child(4)::after { animation-delay: -.5s; }
    .portfolio-item:nth-child(5)::after { animation-delay: -1.5s; }
  `;
  document.head.appendChild(style);
}

// 12. STAGGERED LIST — untuk FAQ items
function initStaggeredFAQ() {
  const style = document.createElement("style");
  style.textContent = `
    .faq-item {
      opacity: 0;
      transform: translateX(-20px);
      transition: opacity 0.45s ease, transform 0.45s ease, border-color 0.3s;
    }
    .faq-item.visible {
      opacity: 1;
      transform: translateX(0);
    }
  `;
  document.head.appendChild(style);

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const items = document.querySelectorAll(".faq-item");
        items.forEach((item, i) => {
          setTimeout(() => item.classList.add("visible"), i * 90);
        });
        obs.disconnect();
      }
    });
  }, { threshold: 0.1 });

  const faqSection = document.getElementById("faq");
  if (faqSection) obs.observe(faqSection);
}

// Panggil semua di DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  initLightningPulse();
  initGlitchEffect();
  initProgressBars();
  initMagneticTilt();
  initScanEffect();
  initStaggeredFAQ();
});