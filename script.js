/* ===================================================
   WattCo — Power Wear | script.js
   Vanilla JS — Clean, no frameworks
   =================================================== */

// =====================================================
// DATA
// =====================================================
const products = [
  { id:1, name:"Kemeja PDH",     category:"pakaian",     categoryLabel:"Kemeja",     desc:"Pakaian Dinas Harian custom. Material drill premium, sablon/bordir nama & logo.", price:185000, priceLabel:"Rp185.000", sizes:["S","M","L","XL"],       badge:"popular", badgeLabel:"Populer", img:"images/pdh.PNG",           inStock:true },
  { id:2, name:"Kaos Event",     category:"pakaian",     categoryLabel:"Kaos",       desc:"Kaos cotton combed 30s, cocok untuk event, ospek, atau gathering komunitas.",       price:85000,  priceLabel:"Rp85.000",  sizes:["S","M","L","XL","XXL"],  badge:"new",     badgeLabel:"Baru",    img:"images/kaos.PNG",          inStock:true },
  { id:3, name:"Jaket Himpunan", category:"pakaian",     categoryLabel:"Jaket",      desc:"Jaket varsity atau bomber custom dengan bordir logo himpunan, premium.",            price:200000, priceLabel:"Rp200.000", sizes:["S","M","L","XL"],       badge:"custom",  badgeLabel:"Custom",  img:"images/jahim.PNG",         inStock:true },
  { id:4, name:"Pin Enamel",     category:"aksesoris",   categoryLabel:"Aksesoris",  desc:"Pin enamel hard/soft dengan desain custom, cocok untuk identitas himpunan.",       price:35000,  priceLabel:"Rp35.000",  sizes:[],                        badge:"new",     badgeLabel:"Baru",    img:"images/pin enamel.jfif",   inStock:true },
  { id:5, name:"Wearpack",       category:"pakaian",     categoryLabel:"Wearpack",   desc:"Wearpack custom dengan sablon teks/logo. Cocok untuk kegiatan lapangan.",          price:250000, priceLabel:"Rp250.000", sizes:[],                        badge:"custom",  badgeLabel:"Custom",  img:"images/wearpack.PNG",      inStock:true },
  { id:6, name:"Tote Bag",       category:"merchandise", categoryLabel:"Merchandise",desc:"Tote bag canvas premium dengan sablon custom. Fungsional dan stylish.",            price:55000,  priceLabel:"Rp55.000",  sizes:[],                        badge:"popular", badgeLabel:"Populer", img:"images/totebag.PNG",       inStock:true },
  { id:7, name:"Lanyard",        category:"merchandise", categoryLabel:"Merchandise",desc:"Lanyard premium dengan desain custom. Media branding yang stylish.",               price:15000,  priceLabel:"Rp15.000",  sizes:[],                        badge:"popular", badgeLabel:"Populer", img:"images/lanyard.PNG",       inStock:true },
  { id:8, name:"Gelang Custom",  category:"aksesoris",   categoryLabel:"Aksesoris",  desc:"Gelang custom dengan desain dan warna sesuai kebutuhan organisasi.",              price:25000,  priceLabel:"Rp25.000",  sizes:[],                        badge:"new",     badgeLabel:"Baru",    img:"images/gelang custom.WEBP",inStock:true },
];

const portfolioItems = [
  { id:1, title:"PDH HMTE Unpad 2023",       desc:"Kemeja PDH Tahun 2023",         tag:"PDH Custom", img:"images/pdh porto.png",      featured:true  },
  { id:2, title:"Jaket Himpunan Elektro",    desc:"Batch 50 pcs, bordir premium",  tag:"Jaket",      img:"images/jahim porto.png",    featured:false },
  { id:3, title:"Wearpack Praktikum 2023",   desc:"200 pcs untuk praktikum",       tag:"Wearpack",   img:"images/wearpack porto.png", featured:false },
  { id:4, title:"Gelang Custom Himpunan",    desc:"Custom warna & desain",         tag:"Aksesoris",  img:"images/gelang porto.png",   featured:false },
  { id:5, title:"PDH Premium 2024",          desc:"PDH bordir nama lengkap",       tag:"PDH Custom", img:"images/pdh porto.png",      featured:false },
];

const faqs = [
  { q:"Berapa minimum order (MOQ) di WattCo?",      a:"Minimum order untuk produk pakaian adalah 12 pcs. Untuk aksesoris seperti pin enamel dan gelang, minimum order adalah 50 pcs. Kami juga menerima order satuan untuk produk tertentu dengan harga yang berbeda." },
  { q:"Apakah bisa custom desain sepenuhnya?",       a:"Ya! Semua produk WattCo dapat dikustomisasi sepenuhnya — dari warna, bahan, sablon, bordir, hingga ukuran. Tim desainer kami siap membantu mewujudkan konsep desainmu." },
  { q:"Bagaimana cara pembayaran?",                  a:"Pembayaran dilakukan via transfer bank atau e-wallet. Sistem DP 50% di awal untuk memulai produksi, dan pelunasan saat produk selesai & siap kirim." },
  { q:"Apakah ada garansi kualitas?",                a:"WattCo memberikan garansi kualitas pada setiap produk. Jika ada cacat produksi dari pihak kami, kami akan melakukan penggantian atau pengembalian dana sesuai kesepakatan." },
  { q:"Berapa lama estimasi produksi?",              a:"Tergantung jenis produk: Kemeja PDH 7–14 hari, Kaos 5–10 hari, Jaket 10–21 hari, Pin Enamel 14–21 hari, dan Aksesoris lainnya 5–10 hari kerja." },
  { q:"Apakah bisa kirim ke luar kota?",             a:"Bisa! WattCo melayani pengiriman ke seluruh Indonesia via ekspedisi pilihan (JNE, J&T, SiCepat, dll). Biaya ongkir ditanggung oleh pemesan." },
];

// =====================================================
// CART STATE
// =====================================================
let cart = [];

// =====================================================
// UTILITIES
// =====================================================
function formatRp(n) {
  return "Rp" + n.toLocaleString("id-ID");
}

function showToast(msg, type = "success") {
  const tc = document.getElementById("toastContainer");
  if (!tc) return;
  const t = document.createElement("div");
  t.className = `toast toast-${type}`;
  t.innerHTML = `
    <i data-lucide="${type === "success" ? "check-circle" : "x-circle"}" class="toast-icon" style="width:18px;height:18px"></i>
    <span>${msg}</span>`;
  tc.appendChild(t);
  if (window.lucide) lucide.createIcons({ nodes: [t] });
  setTimeout(() => {
    t.classList.add("hiding");
    setTimeout(() => t.remove(), 300);
  }, 3000);
}

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  // close mobile menu
  document.getElementById("navLinks")?.classList.remove("mobile-open");
  document.getElementById("hamburger")?.classList.remove("open");
}
window.scrollToSection = scrollToSection;

// =====================================================
// CURSOR
// =====================================================
function initCursor() {
  const cur = document.getElementById("cursor");
  const fol = document.getElementById("cursorFollower");
  if (!cur || !fol) return;

  let mx = 0, my = 0, fx = 0, fy = 0;

  document.addEventListener("mousemove", e => {
    mx = e.clientX; my = e.clientY;
    cur.style.left = mx + "px"; cur.style.top = my + "px";
  });

  function animFol() {
    fx += (mx - fx) * 0.12;
    fy += (my - fy) * 0.12;
    fol.style.left = fx + "px"; fol.style.top = fy + "px";
    requestAnimationFrame(animFol);
  }
  animFol();

  document.addEventListener("mousedown", () => {
    cur.style.width = "12px"; cur.style.height = "12px";
    fol.style.width = "20px"; fol.style.height = "20px";
  });
  document.addEventListener("mouseup", () => {
    cur.style.width = "6px"; cur.style.height = "6px";
    fol.style.width = "32px"; fol.style.height = "32px";
  });

  document.querySelectorAll("a,button,[data-lucide]").forEach(el => {
    el.addEventListener("mouseenter", () => {
      fol.style.width = "48px"; fol.style.height = "48px";
      fol.style.borderColor = "rgba(10,132,255,0.6)";
    });
    el.addEventListener("mouseleave", () => {
      fol.style.width = "32px"; fol.style.height = "32px";
      fol.style.borderColor = "rgba(10,132,255,0.4)";
    });
  });
}

// =====================================================
// LOADER
// =====================================================
function initLoader() {
  const bar = document.getElementById("loaderBar");
  const sub = document.getElementById("loaderSub");
  const loader = document.getElementById("loader");
  const msgs = ["Menyiapkan produk...", "Memuat desain...", "Almost there..."];
  let pct = 0;
  let mi = 0;

  const iv = setInterval(() => {
    pct += Math.random() * 18 + 5;
    if (pct >= 100) { pct = 100; clearInterval(iv); }
    if (bar) bar.style.width = pct + "%";
    if (sub && pct < 90) sub.textContent = msgs[mi++ % msgs.length];
    if (pct >= 100) {
      setTimeout(() => {
        loader?.classList.add("hidden");
        document.body.style.overflow = "";
      }, 400);
    }
  }, 120);

  document.body.style.overflow = "hidden";
}

// =====================================================
// NAVBAR
// =====================================================
function initNavbar() {
  const nav = document.getElementById("navbar");
  const ham = document.getElementById("hamburger");
  const links = document.getElementById("navLinks");
  const toggle = document.getElementById("themeToggle");
  const icon = document.getElementById("themeIcon");

  window.addEventListener("scroll", () => {
    nav?.classList.toggle("scrolled", window.scrollY > 20);

    // Active nav link based on scroll
    const sections = ["home","products","studio","about","portfolio","tracking","order","faq","contact"];
    let active = "home";
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el && window.scrollY >= el.offsetTop - 120) active = id;
    });
    document.querySelectorAll(".nav-links a").forEach(a => {
      const href = a.getAttribute("href")?.replace("#","");
      a.classList.toggle("active", href === active);
    });

    // Back to top
    document.getElementById("backToTop")?.classList.toggle("show", window.scrollY > 400);
  });

  ham?.addEventListener("click", () => {
    ham.classList.toggle("open");
    links?.classList.toggle("mobile-open");
  });

  toggle?.addEventListener("click", () => {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    document.documentElement.setAttribute("data-theme", isDark ? "light" : "dark");
    icon?.setAttribute("data-icon", isDark ? "sun" : "moon");
    if (window.lucide) lucide.createIcons({ nodes: [toggle] });
  });

  document.getElementById("backToTop")?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// =====================================================
// PRODUCTS GRID
// =====================================================
function renderProducts(filter = "all") {
  const grid = document.getElementById("productsGrid");
  if (!grid) return;

  const filtered = filter === "all" ? products : products.filter(p => p.category === filter);

  grid.innerHTML = filtered.map(p => `
    <div class="product-card fade-in" data-cat="${p.category}" data-id="${p.id}">
      <div class="product-img-wrap">
        <img src="${p.img}" alt="${p.name}" loading="lazy" />
        <span class="product-badge badge-${p.badge}">${p.badgeLabel}</span>
      </div>
      <div class="product-info">
        <div class="product-cat">${p.categoryLabel}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-desc">${p.desc}</div>
        <div class="product-footer">
          <div class="product-price">${p.priceLabel}</div>
          ${p.sizes.length ? `<div class="product-sizes">${p.sizes.map(s => `<span class="size-tag">${s}</span>`).join("")}</div>` : ""}
          <button class="btn-add-cart" onclick="addToCart(${p.id})" aria-label="Tambah ke keranjang">
            <i data-lucide="plus" style="width:16px;height:16px"></i>
          </button>
        </div>
      </div>
    </div>
  `).join("");

  if (window.lucide) lucide.createIcons();
  initFadeObserver();
}

function initFilterTabs() {
  document.querySelectorAll(".filter-tab").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-tab").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderProducts(btn.dataset.filter);
    });
  });
}

// =====================================================
// PORTFOLIO GRID
// =====================================================
function renderPortfolio() {
  const grid = document.getElementById("portfolioGrid");
  if (!grid) return;

  grid.innerHTML = portfolioItems.map(p => `
    <div class="portfolio-item${p.featured ? " featured" : ""} fade-in">
      <img src="${p.img}" alt="${p.title}" loading="lazy" />
      <div class="portfolio-overlay">
        <span class="porto-tag">${p.tag}</span>
        <div class="porto-title">${p.title}</div>
        <div class="porto-desc">${p.desc}</div>
      </div>
    </div>
  `).join("");
}

// =====================================================
// FAQ
// =====================================================
function renderFAQ() {
  const list = document.getElementById("faqList");
  if (!list) return;

  list.innerHTML = faqs.map((f, i) => `
    <div class="faq-item fade-in" id="faq-${i}">
      <div class="faq-q" onclick="toggleFAQ(${i})">
        <span>${f.q}</span>
        <span class="faq-icon">+</span>
      </div>
      <div class="faq-a">
        <div class="faq-a-inner">${f.a}</div>
      </div>
    </div>
  `).join("");
}

window.toggleFAQ = function(i) {
  const item = document.getElementById(`faq-${i}`);
  if (!item) return;
  const isOpen = item.classList.contains("open");
  document.querySelectorAll(".faq-item").forEach(el => el.classList.remove("open"));
  if (!isOpen) item.classList.add("open");
};

// =====================================================
// CART
// =====================================================
window.addToCart = function(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;

  const existing = cart.find(c => c.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  renderCart();
  showToast(`${product.name} ditambahkan ke keranjang`);

  // Open cart
  document.getElementById("cartSidebar")?.classList.add("open");
  document.getElementById("cartOverlay")?.classList.add("show");
};

function renderCart() {
  const items = document.getElementById("cartItems");
  const empty = document.getElementById("cartEmpty");
  const footer = document.getElementById("cartFooter");
  const count = document.getElementById("cartCount");
  const total = document.getElementById("cartTotalPrice");

  if (!items) return;

  const totalQty = cart.reduce((a, c) => a + c.qty, 0);
  const totalPrice = cart.reduce((a, c) => a + c.price * c.qty, 0);

  if (count) {
    count.textContent = totalQty;
    count.classList.toggle("show", totalQty > 0);
  }

  if (cart.length === 0) {
    if (empty) empty.style.display = "flex";
    if (footer) footer.style.display = "none";
    return;
  }

  if (empty) empty.style.display = "none";
  if (footer) footer.style.display = "block";
  if (total) total.textContent = formatRp(totalPrice);

  // Render items (keep empty div)
  const cartItemsHtml = cart.map(c => `
    <div class="cart-item">
      <img class="cart-item-img" src="${c.img}" alt="${c.name}" />
      <div class="cart-item-info">
        <div class="cart-item-name">${c.name}</div>
        <div class="cart-item-price">${c.priceLabel} × ${c.qty}</div>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart(${c.id})">
        <i data-lucide="x" style="width:14px;height:14px"></i>
      </button>
    </div>
  `).join("");

  items.innerHTML = cartItemsHtml;
  if (window.lucide) lucide.createIcons({ nodes: [items] });
}

window.removeFromCart = function(id) {
  cart = cart.filter(c => c.id !== id);
  renderCart();
};

function initCart() {
  const btn = document.getElementById("cartBtn");
  const overlay = document.getElementById("cartOverlay");
  const closeBtn = document.getElementById("closeCart");

  function openCart() {
    document.getElementById("cartSidebar")?.classList.add("open");
    overlay?.classList.add("show");
  }
  function closeCart() {
    document.getElementById("cartSidebar")?.classList.remove("open");
    overlay?.classList.remove("show");
  }

  btn?.addEventListener("click", openCart);
  overlay?.addEventListener("click", closeCart);
  closeBtn?.addEventListener("click", closeCart);

  document.getElementById("checkoutBtn")?.addEventListener("click", () => {
    if (cart.length === 0) return;
    const lines = cart.map(c => `- ${c.name} x${c.qty} (${c.priceLabel})`).join("\n");
    const total = cart.reduce((a, c) => a + c.price * c.qty, 0);
    const msg = encodeURIComponent(
      `Halo WattCo! Saya ingin order:\n\n${lines}\n\nTotal Estimasi: ${formatRp(total)}\n\nMohon konfirmasi & info lebih lanjut, terima kasih!`
    );
    window.open(`https://wa.me/628157047507?text=${msg}`, "_blank");
  });
}

// =====================================================
// ORDER FORM
// =====================================================
function initOrderForm() {
  const form = document.getElementById("orderForm");
  const fileInput = document.getElementById("design");
  const filePreview = document.getElementById("filePreview");
  const fileContent = document.querySelector(".file-upload-content");

  fileInput?.addEventListener("change", e => {
    const file = e.target.files[0];
    if (!file) return;
    if (filePreview) {
      filePreview.style.display = "block";
      filePreview.textContent = `✓ ${file.name}`;
    }
    if (fileContent) fileContent.style.display = "none";
  });

  form?.addEventListener("submit", e => {
    e.preventDefault();
    let valid = true;

    const fields = [
      { id: "nama",    err: "namaError",    msg: "Nama wajib diisi" },
      { id: "email",   err: "emailError",   msg: "Email wajib diisi" },
      { id: "phone",   err: "phoneError",   msg: "No. WhatsApp wajib diisi" },
      { id: "product", err: "productError", msg: "Pilih jenis produk" },
      { id: "qty",     err: "qtyError",     msg: "Jumlah wajib diisi" },
    ];

    fields.forEach(f => {
      const el = document.getElementById(f.id);
      const errEl = document.getElementById(f.err);
      if (!el?.value.trim()) {
        if (errEl) errEl.textContent = f.msg;
        el?.focus();
        valid = false;
      } else {
        if (errEl) errEl.textContent = "";
      }
    });

    if (!valid) return;

    const nama    = document.getElementById("nama").value;
    const email   = document.getElementById("email").value;
    const phone   = document.getElementById("phone").value;
    const product = document.getElementById("product").value;
    const qty     = document.getElementById("qty").value;
    const ukuran  = document.getElementById("ukuran")?.value;
    const catatan = document.getElementById("catatan")?.value;
    const angkatan= document.getElementById("angkatan")?.value;

    const msg = encodeURIComponent(
      `Halo WattCo! Saya ingin order:\n\n` +
      `Nama: ${nama}\n` +
      `Organisasi: ${angkatan || "-"}\n` +
      `Email: ${email}\n` +
      `No. WA: ${phone}\n` +
      `Produk: ${product}\n` +
      `Jumlah: ${qty} pcs\n` +
      `Ukuran: ${ukuran || "-"}\n` +
      `Catatan: ${catatan || "-"}\n\n` +
      `Mohon konfirmasi & info lanjut. Terima kasih!`
    );

    window.open(`https://wa.me/628157047507?text=${msg}`, "_blank");
    showToast("Pesanan dikirim! Kami akan segera menghubungimu.");
  });
}

// =====================================================
// FADE IN OBSERVER
// =====================================================
function initFadeObserver() {
  const els = document.querySelectorAll(".fade-in:not(.visible)");
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add("visible"), i * 60);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  els.forEach(el => obs.observe(el));
}

// =====================================================
// INIT
// =====================================================
document.addEventListener("DOMContentLoaded", () => {
  initLoader();
  initCursor();
  initNavbar();
  initCart();
  initOrderForm();
  renderProducts();
  renderPortfolio();
  renderFAQ();
  initFilterTabs();
  initFadeObserver();

  if (window.lucide) lucide.createIcons();
});
