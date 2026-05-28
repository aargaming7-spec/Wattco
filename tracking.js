/* ===================================================
   WattCo — Order Tracking System | tracking.js
   Update data order di bagian ORDERS DATA di bawah
   =================================================== */

// =====================================================
// ⚙️ ORDERS DATA — UPDATE DI SINI SEBAGAI ADMIN
// Tambah order baru atau update status di sini
// =====================================================
const ordersData = {

  // FORMAT:
  // "NOMOR-ORDER": {
  //   customer: "Nama Pemesan",
  //   product: "Nama Produk",
  //   qty: jumlah,
  //   orderDate: "tanggal order",
  //   estimasi: "tanggal estimasi selesai",
  //   currentStep: 0-5 (lihat steps di bawah),
  //   notes: "catatan tambahan (opsional)",
  //   phone: "08xxx" (opsional, untuk WA konfirmasi)
  // }

  "WTC-2024-001": {
    customer: "Andika Arya P",
    product: "Kemeja PDH HMTE 2023",
    qty: 45,
    orderDate: "20 Nov 2024",
    estimasi: "5 Des 2024",
    currentStep: 4,
    notes: "Bordir nama + patch HMTE + gear badge",
    phone: "08123456789"
  },
  "WTC-2024-002": {
    customer: "Rizky Pratama",
    product: "Jaket Himpunan Elektro",
    qty: 30,
    orderDate: "22 Nov 2024",
    estimasi: "10 Des 2024",
    currentStep: 2,
    notes: "Varsity jacket navy, bordir logo depan & belakang",
    phone: "08234567890"
  },
  "WTC-2024-003": {
    customer: "Sarah Amelia",
    product: "Kaos Event PKKMB",
    qty: 200,
    orderDate: "25 Nov 2024",
    estimasi: "8 Des 2024",
    currentStep: 3,
    notes: "Sablon DTF full color, ukuran mix S-XL",
    phone: "08345678901"
  },
  "WTC-2024-004": {
    customer: "Bima Satria",
    product: "Pin Enamel Hard Series",
    qty: 100,
    orderDate: "27 Nov 2024",
    estimasi: "15 Des 2024",
    currentStep: 1,
    notes: "Desain logo himpunan, diameter 3.5cm",
    phone: "08456789012"
  },
  "WTC-2024-005": {
    customer: "Dina Rahayu",
    product: "Tote Bag Canvas Custom",
    qty: 50,
    orderDate: "28 Nov 2024",
    estimasi: "7 Des 2024",
    currentStep: 5,
    notes: "Sablon satu warna, ukuran 40x35cm",
    phone: "08567890123"
  },

  // ← TAMBAH ORDER BARU DI SINI
};

// =====================================================
// STEP DEFINITIONS
// currentStep: 0=Diterima, 1=Desain, 2=Produksi,
//              3=QC, 4=Finishing, 5=Selesai
// =====================================================
const trackingSteps = [
  {
    id: 0,
    label: "Order Diterima",
    sublabel: "Pesanan masuk & dikonfirmasi",
    icon: "clipboard-check",
    color: "#00d4ff"
  },
  {
    id: 1,
    label: "Proses Desain",
    sublabel: "Tim desain sedang mengerjakan",
    icon: "palette",
    color: "#0099ff"
  },
  {
    id: 2,
    label: "Produksi",
    sublabel: "Bahan dipotong & dijahit",
    icon: "settings",
    color: "#0066ff"
  },
  {
    id: 3,
    label: "Quality Control",
    sublabel: "Pengecekan kualitas produk",
    icon: "shield-check",
    color: "#6644ff"
  },
  {
    id: 4,
    label: "Finishing",
    sublabel: "Packaging & persiapan kirim",
    icon: "package",
    color: "#aa22ff"
  },
  {
    id: 5,
    label: "Selesai / Dikirim",
    sublabel: "Produk siap diambil/dikirim",
    icon: "check-circle",
    color: "#00ff88"
  },
];

// =====================================================
// INJECT TRACKING CSS
// =====================================================
(function injectTrackingCSS() {
  const s = document.createElement("style");
  s.textContent = `
    /* ── Tracking Section ── */
    #tracking { scroll-margin-top: var(--nav-h); }

    .tracking-wrap {
      max-width: 800px;
      margin: 0 auto;
      padding: 0 2rem;
    }

    /* Search box */
    .tracking-search {
      display: flex;
      gap: 10px;
      margin-bottom: 2.5rem;
      position: relative;
    }
    .tracking-search-input {
      flex: 1;
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 14px 18px 14px 48px;
      color: var(--text-primary);
      font-size: 1rem;
      font-family: var(--font-mono);
      letter-spacing: 0.08em;
      outline: none;
      transition: all var(--transition);
      text-transform: uppercase;
    }
    .tracking-search-input::placeholder {
      text-transform: none;
      letter-spacing: 0;
      font-family: var(--font-body);
      color: var(--text-muted);
    }
    .tracking-search-input:focus {
      border-color: var(--accent);
      box-shadow: 0 0 0 3px var(--accent-dim);
    }
    .tracking-search-icon {
      position: absolute;
      left: 16px; top: 50%;
      transform: translateY(-50%);
      color: var(--text-muted);
      pointer-events: none;
    }
    .tracking-search-btn {
      padding: 14px 24px;
      background: var(--gradient);
      color: #000;
      font-family: var(--font-display);
      font-weight: 700;
      font-size: 0.9rem;
      letter-spacing: 0.08em;
      border-radius: var(--radius);
      border: none;
      cursor: none;
      transition: all var(--transition);
      display: flex; align-items: center; gap: 8px;
      white-space: nowrap;
    }
    .tracking-search-btn:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-accent);
    }

    /* Demo order pills */
    .tracking-demo-hint {
      text-align: center;
      margin-bottom: 2rem;
    }
    .tracking-demo-hint p {
      font-size: 0.78rem;
      color: var(--text-muted);
      margin-bottom: 10px;
      font-family: var(--font-mono);
    }
    .demo-pills {
      display: flex; gap: 8px;
      flex-wrap: wrap; justify-content: center;
    }
    .demo-pill {
      padding: 4px 12px;
      border: 1px solid var(--border);
      border-radius: 99px;
      font-size: 0.72rem;
      font-family: var(--font-mono);
      color: var(--accent);
      cursor: none;
      transition: all var(--transition);
      background: var(--accent-dim);
      letter-spacing: 0.05em;
    }
    .demo-pill:hover {
      border-color: var(--accent);
      background: rgba(0,212,255,0.2);
      transform: translateY(-1px);
    }

    /* Result card */
    .tracking-result {
      display: none;
      animation: fadeInUp 0.5s ease;
    }
    .tracking-result.show { display: block; }

    .tracking-card {
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      overflow: hidden;
    }

    /* Card header */
    .tc-header {
      padding: 1.5rem;
      background: linear-gradient(135deg, rgba(0,212,255,0.08), rgba(0,102,255,0.05));
      border-bottom: 1px solid var(--border);
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 1rem;
      flex-wrap: wrap;
    }
    .tc-order-id {
      font-family: var(--font-mono);
      font-size: 1.1rem;
      color: var(--accent);
      font-weight: 700;
      letter-spacing: 0.1em;
      margin-bottom: 4px;
    }
    .tc-product {
      font-family: var(--font-display);
      font-size: 1.3rem;
      font-weight: 700;
      margin-bottom: 6px;
    }
    .tc-meta {
      display: flex; gap: 1.5rem; flex-wrap: wrap;
    }
    .tc-meta-item {
      display: flex; flex-direction: column; gap: 2px;
    }
    .tc-meta-item span:first-child {
      font-size: 0.72rem;
      color: var(--text-muted);
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }
    .tc-meta-item span:last-child {
      font-size: 0.88rem;
      font-weight: 600;
      color: var(--text-primary);
    }

    /* Status badge */
    .tc-status-badge {
      padding: 8px 16px;
      border-radius: 99px;
      font-size: 0.78rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      white-space: nowrap;
      display: flex; align-items: center; gap: 6px;
    }
    .tc-status-badge .status-dot {
      width: 7px; height: 7px;
      border-radius: 50%;
    }
    .status-active {
      background: rgba(0,212,255,0.15);
      color: var(--accent);
      border: 1px solid rgba(0,212,255,0.3);
    }
    .status-active .status-dot { background: var(--accent); animation: pulse 2s infinite; }
    .status-done {
      background: rgba(0,255,136,0.12);
      color: #00ff88;
      border: 1px solid rgba(0,255,136,0.3);
    }
    .status-done .status-dot { background: #00ff88; }

    /* Progress bar overall */
    .tc-progress-bar-wrap {
      padding: 1.25rem 1.5rem;
      border-bottom: 1px solid var(--border);
      background: var(--bg-secondary);
    }
    .tc-progress-bar-top {
      display: flex; justify-content: space-between;
      font-size: 0.78rem; margin-bottom: 8px;
    }
    .tc-progress-bar-top span { color: var(--text-muted); }
    .tc-progress-bar-top strong { color: var(--accent); }
    .tc-progress-track {
      height: 6px;
      background: var(--border);
      border-radius: 99px;
      overflow: hidden;
    }
    .tc-progress-fill {
      height: 100%;
      background: var(--gradient);
      border-radius: 99px;
      width: 0%;
      transition: width 1.2s cubic-bezier(.4,0,.2,1);
      position: relative;
    }
    .tc-progress-fill::after {
      content: '';
      position: absolute;
      right: 0; top: 0; bottom: 0;
      width: 20px;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4));
      border-radius: 99px;
    }

    /* Steps timeline */
    .tc-steps {
      padding: 2rem 1.5rem;
    }
    .tc-step {
      display: flex;
      gap: 1rem;
      position: relative;
      padding-bottom: 1.75rem;
    }
    .tc-step:last-child { padding-bottom: 0; }

    /* Connector line */
    .tc-step::before {
      content: '';
      position: absolute;
      left: 19px; top: 40px;
      width: 2px;
      height: calc(100% - 20px);
      background: var(--border);
      z-index: 0;
    }
    .tc-step:last-child::before { display: none; }
    .tc-step.completed::before {
      background: linear-gradient(to bottom, var(--accent), rgba(0,212,255,0.2));
    }

    /* Step icon */
    .tc-step-icon {
      width: 40px; height: 40px;
      border-radius: 50%;
      border: 2px solid var(--border);
      background: var(--bg-secondary);
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
      position: relative; z-index: 1;
      transition: all 0.4s ease;
      color: var(--text-muted);
    }
    .tc-step.completed .tc-step-icon {
      border-color: var(--accent);
      background: var(--accent-dim);
      color: var(--accent);
    }
    .tc-step.current .tc-step-icon {
      border-color: var(--accent);
      background: var(--accent);
      color: #000;
      box-shadow: 0 0 16px var(--accent-glow);
      animation: iconPulse 2s ease infinite;
    }
    .tc-step.done-final .tc-step-icon {
      border-color: #00ff88;
      background: rgba(0,255,136,0.15);
      color: #00ff88;
      box-shadow: 0 0 16px rgba(0,255,136,0.3);
    }
    @keyframes iconPulse {
      0%,100% { box-shadow: 0 0 10px var(--accent-glow); }
      50% { box-shadow: 0 0 24px var(--accent-glow), 0 0 40px rgba(0,212,255,0.15); }
    }

    /* Step content */
    .tc-step-content { flex: 1; padding-top: 8px; }
    .tc-step-label {
      font-family: var(--font-display);
      font-size: 0.95rem;
      font-weight: 700;
      margin-bottom: 3px;
      color: var(--text-muted);
      transition: color 0.3s;
    }
    .tc-step.completed .tc-step-label,
    .tc-step.current .tc-step-label { color: var(--text-primary); }
    .tc-step.done-final .tc-step-label { color: #00ff88; }
    .tc-step-sub {
      font-size: 0.8rem;
      color: var(--text-muted);
      line-height: 1.5;
    }
    .tc-step.current .tc-step-sub { color: var(--text-secondary); }

    /* Current step indicator */
    .current-badge {
      display: inline-flex; align-items: center; gap: 5px;
      padding: 2px 10px;
      background: var(--accent);
      color: #000;
      border-radius: 99px;
      font-size: 0.65rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      margin-left: 8px;
      animation: badgePulse 2s ease infinite;
    }
    @keyframes badgePulse {
      0%,100% { opacity: 1; }
      50% { opacity: 0.7; }
    }

    /* Notes & WA section */
    .tc-footer {
      padding: 1.25rem 1.5rem;
      border-top: 1px solid var(--border);
      display: flex; align-items: center;
      justify-content: space-between;
      gap: 1rem;
      flex-wrap: wrap;
      background: var(--bg-secondary);
    }
    .tc-notes {
      font-size: 0.82rem;
      color: var(--text-secondary);
      display: flex; align-items: flex-start; gap: 8px;
    }
    .tc-notes i { color: var(--accent); flex-shrink: 0; margin-top: 1px; }
    .tc-wa-btn {
      display: flex; align-items: center; gap: 8px;
      padding: 10px 18px;
      background: rgba(37,211,102,0.12);
      border: 1px solid rgba(37,211,102,0.3);
      border-radius: var(--radius);
      color: #25d366;
      font-size: 0.82rem;
      font-weight: 600;
      cursor: none;
      transition: all var(--transition);
      white-space: nowrap;
    }
    .tc-wa-btn:hover {
      background: rgba(37,211,102,0.2);
      transform: translateX(3px);
    }

    /* Not found state */
    .tracking-notfound {
      display: none;
      text-align: center;
      padding: 3rem 2rem;
      animation: fadeInUp 0.4s ease;
    }
    .tracking-notfound.show { display: block; }
    .tracking-notfound i { color: var(--text-muted); margin-bottom: 1rem; }
    .tracking-notfound h4 {
      font-family: var(--font-display);
      font-size: 1.1rem; margin-bottom: 0.5rem;
    }
    .tracking-notfound p { font-size: 0.85rem; color: var(--text-secondary); }

    /* Responsive */
    @media (max-width: 600px) {
      .tracking-search { flex-direction: column; }
      .tc-header { flex-direction: column; }
      .tc-meta { gap: 1rem; }
      .tc-footer { flex-direction: column; }
    }
  `;
  document.head.appendChild(s);
})();

// =====================================================
// BUILD TRACKING SECTION IN DOM
// =====================================================
function buildTrackingSection() {
  // Buat section tracking
  const section = document.createElement("section");
  section.className = "section tracking-section";
  section.id = "tracking";

  section.innerHTML = `
    <div class="container">
      <div class="section-header fade-in">
        <div class="section-tag">— Track Order</div>
        <h2>Lacak <span class="accent">Pesanan</span></h2>
        <p>Masukkan nomor order untuk melihat progress pembuatan merchandise kamu</p>
      </div>

      <div class="tracking-wrap">
        <!-- Search -->
        <div class="tracking-search fade-in">
          <i data-lucide="search" class="tracking-search-icon" style="width:18px;height:18px"></i>
          <input
            type="text"
            class="tracking-search-input"
            id="trackingInput"
            placeholder="Masukkan nomor order, contoh: WTC-2024-001"
            maxlength="20"
          />
          <button class="tracking-search-btn" id="trackingSearchBtn">
            <i data-lucide="zap" style="width:16px;height:16px"></i>
            Lacak
          </button>
        </div>

        <!-- Demo hint -->
        <div class="tracking-demo-hint fade-in">
          <p>// Coba nomor order demo:</p>
          <div class="demo-pills">
            ${Object.keys(ordersData).map(id =>
              `<div class="demo-pill" onclick="trackOrder('${id}')">${id}</div>`
            ).join("")}
          </div>
        </div>

        <!-- Result -->
        <div class="tracking-result" id="trackingResult"></div>

        <!-- Not found -->
        <div class="tracking-notfound" id="trackingNotFound">
          <i data-lucide="search-x" style="width:48px;height:48px"></i>
          <h4>Order Tidak Ditemukan</h4>
          <p>Nomor order tidak valid atau belum terdaftar.<br>
          Pastikan nomor order sesuai yang dikirim via WhatsApp.</p>
          <a href="https://wa.me/628157047507" target="_blank"
            style="display:inline-flex;align-items:center;gap:8px;margin-top:1rem;
            padding:10px 20px;background:rgba(37,211,102,.12);border:1px solid rgba(37,211,102,.3);
            border-radius:var(--radius);color:#25d366;font-size:.85rem;font-weight:600">
            <i data-lucide="message-circle" style="width:16px;height:16px"></i>
            Konfirmasi via WhatsApp
          </a>
        </div>
      </div>
    </div>
  `;

  // Sisipkan sebelum section contact
  const contactSection = document.getElementById("contact");
  if (contactSection) {
    contactSection.parentNode.insertBefore(section, contactSection);
  } else {
    document.querySelector("footer")?.before(section);
  }

  // Event listeners
  const input = document.getElementById("trackingInput");
  const btn = document.getElementById("trackingSearchBtn");

  btn.addEventListener("click", () => {
    const val = input.value.trim().toUpperCase();
    if (val) trackOrder(val);
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const val = input.value.trim().toUpperCase();
      if (val) trackOrder(val);
    }
  });

  // Auto-uppercase
  input.addEventListener("input", (e) => {
    const pos = e.target.selectionStart;
    e.target.value = e.target.value.toUpperCase();
    e.target.setSelectionRange(pos, pos);
  });

  if (window.lucide) lucide.createIcons();
}

// =====================================================
// TRACK ORDER FUNCTION
// =====================================================
window.trackOrder = function(orderId) {
  const id = orderId.toUpperCase().trim();
  const result = document.getElementById("trackingResult");
  const notFound = document.getElementById("trackingNotFound");
  const input = document.getElementById("trackingInput");

  if (!result || !notFound) return;

  // Set input value
  if (input) input.value = id;

  // Hide both first
  result.classList.remove("show");
  notFound.classList.remove("show");

  // Scroll to tracking section
  const trackSection = document.getElementById("tracking");
  if (trackSection) {
    // SPA mode
    if (typeof navigateTo === "function" && currentPage !== "tracking") {
      // navigate if in SPA
    }
    setTimeout(() => {
      trackSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }

  // Find order
  const order = ordersData[id];

  setTimeout(() => {
    if (!order) {
      notFound.classList.add("show");
      if (window.lucide) lucide.createIcons();
      return;
    }

    // Render result
    result.innerHTML = renderTrackingCard(id, order);
    result.classList.add("show");

    // Animate progress bar
    setTimeout(() => {
      const fill = document.getElementById("tcProgressFill");
      const pct = Math.round((order.currentStep / (trackingSteps.length - 1)) * 100);
      if (fill) fill.style.width = pct + "%";

      // Animate steps one by one
      document.querySelectorAll(".tc-step").forEach((step, i) => {
        setTimeout(() => {
          step.style.opacity = "1";
          step.style.transform = "translateX(0)";
        }, i * 100);
      });
    }, 100);

    if (window.lucide) lucide.createIcons();
  }, 300);
};

// =====================================================
// RENDER TRACKING CARD HTML
// =====================================================
function renderTrackingCard(id, order) {
  const pct = Math.round((order.currentStep / (trackingSteps.length - 1)) * 100);
  const isDone = order.currentStep === trackingSteps.length - 1;
  const currentStepData = trackingSteps[order.currentStep];

  // Status badge
  const statusBadge = isDone
    ? `<div class="tc-status-badge status-done">
        <div class="status-dot"></div> SELESAI
       </div>`
    : `<div class="tc-status-badge status-active">
        <div class="status-dot"></div> ON PROGRESS
       </div>`;

  // Steps HTML
  const stepsHTML = trackingSteps.map((step, i) => {
    let cls = "";
    if (i < order.currentStep) cls = "completed";
    else if (i === order.currentStep) cls = isDone ? "done-final" : "current";

    const isCurrent = i === order.currentStep && !isDone;

    return `
      <div class="tc-step ${cls}" style="opacity:0;transform:translateX(-12px);transition:opacity .4s ease ${i*0.08}s, transform .4s ease ${i*0.08}s">
        <div class="tc-step-icon">
          <i data-lucide="${step.icon}" style="width:18px;height:18px"></i>
        </div>
        <div class="tc-step-content">
          <div class="tc-step-label">
            ${step.label}
            ${isCurrent ? `<span class="current-badge">● SEKARANG</span>` : ""}
            ${i < order.currentStep ? `<span style="font-size:.7rem;color:var(--accent);margin-left:6px">✓</span>` : ""}
          </div>
          <div class="tc-step-sub">${step.sublabel}</div>
        </div>
      </div>
    `;
  }).join("");

  // WA message
  const waMsg = encodeURIComponent(
    `Halo WattCo! Saya ingin menanyakan status order:\n\n` +
    `No. Order: ${id}\n` +
    `Produk: ${order.product}\n` +
    `Nama: ${order.customer}\n\n` +
    `Mohon update progress-nya ya, terima kasih!`
  );

  return `
    <div class="tracking-card">
      <!-- Header -->
      <div class="tc-header">
        <div>
          <div class="tc-order-id">${id}</div>
          <div class="tc-product">${order.product}</div>
          <div class="tc-meta">
            <div class="tc-meta-item">
              <span>Pemesan</span>
              <span>${order.customer}</span>
            </div>
            <div class="tc-meta-item">
              <span>Jumlah</span>
              <span>${order.qty} pcs</span>
            </div>
            <div class="tc-meta-item">
              <span>Tgl Order</span>
              <span>${order.orderDate}</span>
            </div>
            <div class="tc-meta-item">
              <span>Estimasi</span>
              <span>${order.estimasi}</span>
            </div>
          </div>
        </div>
        ${statusBadge}
      </div>

      <!-- Progress bar overall -->
      <div class="tc-progress-bar-wrap">
        <div class="tc-progress-bar-top">
          <span>Progress keseluruhan</span>
          <strong>${pct}%</strong>
        </div>
        <div class="tc-progress-track">
          <div class="tc-progress-fill" id="tcProgressFill" style="width:0%"></div>
        </div>
      </div>

      <!-- Steps -->
      <div class="tc-steps">
        ${stepsHTML}
      </div>

      <!-- Footer -->
      <div class="tc-footer">
        <div class="tc-notes">
          <i data-lucide="file-text" style="width:15px;height:15px"></i>
          <span>${order.notes || "Tidak ada catatan tambahan"}</span>
        </div>
        <a href="https://wa.me/628157047507?text=${waMsg}" target="_blank" class="tc-wa-btn">
          <i data-lucide="message-circle" style="width:15px;height:15px"></i>
          Tanya via WhatsApp
        </a>
      </div>
    </div>
  `;
}

// =====================================================
// ADD TRACKING TO NAVBAR
// =====================================================
function addTrackingToNav() {
  setTimeout(() => {
    const navLinks = document.getElementById("navLinks");
    if (!navLinks) return;

    // Tambahkan link tracking
    const li = document.createElement("li");
    li.innerHTML = `
      <a href="#tracking" class="spa-link" data-page="tracking"
        style="color:var(--accent) !important"
        onclick="event.preventDefault(); document.getElementById('tracking')?.scrollIntoView({behavior:'smooth'})">
        <span>📦</span> Lacak Order
      </a>
    `;
    // Sisipkan sebelum FAQ
    const links = navLinks.querySelectorAll("li");
    const faqLi = Array.from(links).find(l => l.querySelector('[data-page="faq"]'));
    if (faqLi) navLinks.insertBefore(li, faqLi);
    else navLinks.appendChild(li);

    if (window.lucide) lucide.createIcons();
  }, 2500);
}

// =====================================================
// INIT
// =====================================================
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    buildTrackingSection();
    addTrackingToNav();
    if (window.lucide) lucide.createIcons();
    console.log("WattCo Order Tracking ready ⚡");
  }, 2000);
});