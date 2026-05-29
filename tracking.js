/* ===================================================
   WattCo — Order Tracking System | tracking.js
   Update ORDERS DATA untuk menambah/update order
   =================================================== */

// =====================================================
// ⚙️ ORDERS DATA — UPDATE DI SINI SEBAGAI ADMIN
// =====================================================
const ordersData = {
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
  // ← Tambah order baru di sini
};

// Step definitions
const trackingSteps = [
  { id:0, label:"Order Diterima",  sub:"Pesanan masuk & dikonfirmasi",        icon:"clipboard-check" },
  { id:1, label:"Proses Desain",   sub:"Tim desain sedang mengerjakan",       icon:"palette"         },
  { id:2, label:"Produksi",        sub:"Bahan dipotong & dijahit",            icon:"settings"        },
  { id:3, label:"Quality Control", sub:"Pengecekan kualitas produk",          icon:"shield-check"    },
  { id:4, label:"Finishing",       sub:"Packaging & persiapan kirim",         icon:"package"         },
  { id:5, label:"Selesai / Kirim", sub:"Produk siap diambil atau dikirim",    icon:"check-circle"    },
];

// =====================================================
// INJECT TRACKING CSS
// =====================================================
(function injectTrackingCSS() {
  const s = document.createElement("style");
  s.textContent = `
    #trackingWidget { max-width: 760px; margin: 0 auto; }

    .track-search-wrap {
      display: flex; gap: 8px; margin-bottom: 2rem;
      background: var(--bg-raised);
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      padding: 6px 6px 6px 16px;
      transition: border-color .25s;
    }
    .track-search-wrap:focus-within { border-color: rgba(10,132,255,0.4); }
    .track-search-wrap input {
      flex: 1; background: transparent; border: none; outline: none;
      color: var(--text-primary); font-family: var(--font-mono);
      font-size: 0.9rem; letter-spacing: 0.06em; text-transform: uppercase;
    }
    .track-search-wrap input::placeholder {
      text-transform: none; letter-spacing: 0;
      font-family: var(--font-body); color: var(--text-muted); font-size: 0.85rem;
    }
    .track-search-btn {
      padding: 10px 22px;
      background: var(--accent); color: #fff;
      font-family: var(--font-display); font-weight: 700;
      font-size: 0.82rem; border-radius: var(--radius);
      display: flex; align-items: center; gap: 6px;
      transition: .25s; white-space: nowrap;
    }
    .track-search-btn:hover { filter: brightness(1.1); transform: translateY(-1px); }

    .track-pills-label {
      font-size: 0.72rem; color: var(--text-muted);
      letter-spacing: 0.1em; text-transform: uppercase;
      margin-bottom: 10px; font-family: var(--font-mono);
    }
    .track-pills { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 2.5rem; }
    .track-pill {
      padding: 5px 14px;
      border: 1px solid var(--border);
      border-radius: 99px;
      font-size: 0.72rem; font-family: var(--font-mono);
      color: var(--accent);
      background: var(--accent-dim);
      transition: .2s; letter-spacing: 0.05em;
    }
    .track-pill:hover { border-color: var(--accent); transform: translateY(-1px); }

    /* Result */
    .track-result { display: none; }
    .track-result.show { display: block; animation: fadeSlideUp .4s ease; }
    @keyframes fadeSlideUp {
      from { opacity: 0; transform: translateY(16px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .track-card {
      background: var(--bg-raised);
      border: 1px solid var(--border);
      border-radius: var(--radius-xl);
      overflow: hidden;
    }

    /* Header */
    .tc-head {
      padding: 1.5rem;
      background: linear-gradient(135deg, rgba(10,132,255,0.05) 0%, transparent 100%);
      border-bottom: 1px solid var(--border);
      display: flex; align-items: flex-start;
      justify-content: space-between; gap: 1rem; flex-wrap: wrap;
    }
    .tc-order-id {
      font-family: var(--font-mono); font-size: 0.78rem;
      color: var(--accent); font-weight: 600;
      letter-spacing: 0.1em; margin-bottom: 6px;
    }
    .tc-product-name {
      font-family: var(--font-display); font-size: 1.3rem; font-weight: 800;
      margin-bottom: 10px;
    }
    .tc-meta { display: flex; gap: 1.5rem; flex-wrap: wrap; }
    .tc-meta-item { display: flex; flex-direction: column; gap: 2px; }
    .tc-meta-item span:first-child { font-size: 0.66rem; color: var(--text-muted); letter-spacing: 0.1em; text-transform: uppercase; }
    .tc-meta-item span:last-child  { font-size: 0.85rem; font-weight: 600; }

    .tc-status {
      display: flex; align-items: center; gap: 7px;
      padding: 7px 14px; border-radius: 99px;
      font-size: 0.72rem; font-weight: 700;
      letter-spacing: 0.07em; white-space: nowrap;
    }
    .tc-status-dot { width: 7px; height: 7px; border-radius: 50%; }
    .tc-status.active {
      background: var(--accent-dim); color: var(--accent);
      border: 1px solid rgba(10,132,255,0.25);
    }
    .tc-status.active .tc-status-dot { background: var(--accent); animation: dotPulse 2s infinite; }
    .tc-status.done {
      background: rgba(48,209,88,0.08); color: var(--green);
      border: 1px solid rgba(48,209,88,0.25);
    }
    .tc-status.done .tc-status-dot { background: var(--green); }

    /* Progress bar */
    .tc-progress {
      padding: 1.1rem 1.5rem;
      border-bottom: 1px solid var(--border);
      background: var(--bg-card);
    }
    .tc-progress-top {
      display: flex; justify-content: space-between;
      font-size: 0.72rem; margin-bottom: 8px;
    }
    .tc-progress-top span { color: var(--text-muted); }
    .tc-progress-top strong { color: var(--accent); font-family: var(--font-mono); }
    .tc-progress-track { height: 4px; background: var(--border); border-radius: 99px; overflow: hidden; }
    .tc-progress-fill {
      height: 100%; width: 0%;
      background: linear-gradient(90deg, var(--accent) 0%, var(--accent-2) 100%);
      border-radius: 99px;
      transition: width 1.2s cubic-bezier(.4,0,.2,1);
    }

    /* Steps */
    .tc-steps { padding: 1.5rem; display: flex; flex-direction: column; gap: 0; }
    .tc-step {
      display: flex; gap: 14px; position: relative;
      padding-bottom: 1.5rem; opacity: 0;
      transform: translateX(-10px);
      transition: opacity .35s ease, transform .35s ease;
    }
    .tc-step:last-child { padding-bottom: 0; }
    .tc-step.visible { opacity: 1; transform: translateX(0); }

    /* Connector */
    .tc-step::before {
      content: ''; position: absolute;
      left: 17px; top: 36px;
      width: 1.5px; height: calc(100% - 20px);
      background: var(--border); z-index: 0;
    }
    .tc-step:last-child::before { display: none; }
    .tc-step.done::before, .tc-step.current::before {
      background: linear-gradient(to bottom, rgba(10,132,255,0.4), transparent);
    }

    /* Step icon */
    .tc-step-icon {
      width: 36px; height: 36px; border-radius: 50%;
      border: 1.5px solid var(--border);
      background: var(--bg-card);
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0; position: relative; z-index: 1;
      transition: all .3s ease; color: var(--text-muted);
    }
    .tc-step.done .tc-step-icon { border-color: var(--accent); background: var(--accent-dim); color: var(--accent); }
    .tc-step.current .tc-step-icon {
      border-color: var(--accent); background: var(--accent); color: #fff;
      box-shadow: 0 0 0 4px var(--accent-dim);
      animation: iconBreath 2s ease infinite;
    }
    .tc-step.final .tc-step-icon { border-color: var(--green); background: rgba(48,209,88,0.12); color: var(--green); }
    @keyframes iconBreath {
      0%,100% { box-shadow: 0 0 0 4px var(--accent-dim); }
      50%      { box-shadow: 0 0 0 8px rgba(10,132,255,0.08); }
    }

    /* Step content */
    .tc-step-info { flex: 1; padding-top: 6px; }
    .tc-step-label {
      font-size: 0.88rem; font-weight: 700;
      color: var(--text-muted); margin-bottom: 2px;
      display: flex; align-items: center; gap: 8px;
    }
    .tc-step.done .tc-step-label, .tc-step.current .tc-step-label { color: var(--text-primary); }
    .tc-step.final .tc-step-label { color: var(--green); }
    .tc-step-sub { font-size: 0.78rem; color: var(--text-muted); }
    .tc-step.current .tc-step-sub { color: var(--text-secondary); }

    .tc-now-badge {
      display: inline-flex; align-items: center; gap: 4px;
      padding: 2px 8px; background: var(--accent); color: #fff;
      border-radius: 99px; font-size: 0.6rem; font-weight: 700;
      letter-spacing: 0.06em;
    }

    /* Footer */
    .tc-foot {
      padding: 1.1rem 1.5rem;
      border-top: 1px solid var(--border);
      display: flex; align-items: center; justify-content: space-between;
      gap: 1rem; flex-wrap: wrap;
      background: var(--bg-card);
    }
    .tc-foot-notes { font-size: 0.8rem; color: var(--text-secondary); display: flex; align-items: flex-start; gap: 8px; }
    .tc-foot-notes i { color: var(--accent); flex-shrink: 0; margin-top: 1px; width: 14px; height: 14px; }
    .tc-wa-link {
      display: flex; align-items: center; gap: 6px;
      padding: 9px 16px;
      background: rgba(48,209,88,0.08);
      border: 1px solid rgba(48,209,88,0.2);
      border-radius: var(--radius-sm); color: var(--green);
      font-size: 0.8rem; font-weight: 600;
      transition: .2s; white-space: nowrap;
    }
    .tc-wa-link:hover { background: rgba(48,209,88,0.15); }

    /* Not found */
    .track-notfound {
      display: none; text-align: center; padding: 3rem 2rem;
    }
    .track-notfound.show { display: block; animation: fadeSlideUp .4s ease; }
    .track-notfound h4 { font-family: var(--font-display); font-size: 1.1rem; font-weight: 700; margin-bottom: 6px; }
    .track-notfound p { font-size: 0.85rem; color: var(--text-secondary); }

    @media (max-width: 600px) {
      .tc-head { flex-direction: column; }
      .tc-foot { flex-direction: column; }
      .track-search-wrap { flex-direction: column; padding: 10px; }
    }
  `;
  document.head.appendChild(s);
})();

// =====================================================
// BUILD TRACKING WIDGET
// =====================================================
function buildTrackingWidget() {
  const widget = document.getElementById("trackingWidget");
  if (!widget) return;

  widget.innerHTML = `
    <div class="track-search-wrap">
      <input type="text" id="trackInput" placeholder="Masukkan nomor order, contoh: WTC-2024-001" maxlength="20" />
      <button class="track-search-btn" id="trackBtn">
        <i data-lucide="search" style="width:14px;height:14px"></i> Lacak
      </button>
    </div>
    <div class="track-pills-label">// Coba nomor order demo:</div>
    <div class="track-pills">
      ${Object.keys(ordersData).map(id =>
        `<button class="track-pill" onclick="trackOrder('${id}')">${id}</button>`
      ).join("")}
    </div>
    <div class="track-result" id="trackResult"></div>
    <div class="track-notfound" id="trackNotFound">
      <div style="font-size:3rem;margin-bottom:1rem">🔍</div>
      <h4>Order Tidak Ditemukan</h4>
      <p>Pastikan nomor order sesuai yang dikirim via WhatsApp.</p>
      <a href="https://wa.me/628157047507" target="_blank" style="display:inline-flex;align-items:center;gap:8px;margin-top:1.25rem;padding:10px 20px;background:rgba(48,209,88,0.08);border:1px solid rgba(48,209,88,0.2);border-radius:var(--radius-sm);color:var(--green);font-size:.82rem;font-weight:600">
        <i data-lucide="message-circle" style="width:15px;height:15px"></i> Konfirmasi via WhatsApp
      </a>
    </div>
  `;

  const input = document.getElementById("trackInput");
  const btn = document.getElementById("trackBtn");

  btn?.addEventListener("click", () => {
    const v = input?.value.trim().toUpperCase();
    if (v) trackOrder(v);
  });
  input?.addEventListener("keydown", e => {
    if (e.key === "Enter") {
      const v = input.value.trim().toUpperCase();
      if (v) trackOrder(v);
    }
  });
  input?.addEventListener("input", e => {
    const pos = e.target.selectionStart;
    e.target.value = e.target.value.toUpperCase();
    e.target.setSelectionRange(pos, pos);
  });

  if (window.lucide) lucide.createIcons({ nodes: [widget] });
}

// =====================================================
// TRACK ORDER
// =====================================================
window.trackOrder = function(orderId) {
  const id = orderId.toUpperCase().trim();
  const result = document.getElementById("trackResult");
  const notFound = document.getElementById("trackNotFound");
  const input = document.getElementById("trackInput");

  if (!result || !notFound) return;
  if (input) input.value = id;

  result.classList.remove("show");
  notFound.classList.remove("show");

  document.getElementById("tracking")?.scrollIntoView({ behavior: "smooth", block: "start" });

  const order = ordersData[id];

  setTimeout(() => {
    if (!order) {
      notFound.classList.add("show");
      if (window.lucide) lucide.createIcons({ nodes: [notFound] });
      return;
    }

    result.innerHTML = buildTrackingCard(id, order);
    result.classList.add("show");

    // Animate progress bar
    setTimeout(() => {
      const fill = document.getElementById("tcFill");
      const pct = Math.round((order.currentStep / (trackingSteps.length - 1)) * 100);
      if (fill) fill.style.width = pct + "%";

      // Stagger steps
      document.querySelectorAll(".tc-step").forEach((step, i) => {
        setTimeout(() => step.classList.add("visible"), i * 80);
      });
    }, 120);

    if (window.lucide) lucide.createIcons({ nodes: [result] });
  }, 280);
};

function buildTrackingCard(id, order) {
  const pct = Math.round((order.currentStep / (trackingSteps.length - 1)) * 100);
  const isDone = order.currentStep === trackingSteps.length - 1;

  const statusHTML = isDone
    ? `<div class="tc-status done"><div class="tc-status-dot"></div> SELESAI</div>`
    : `<div class="tc-status active"><div class="tc-status-dot"></div> ON PROGRESS</div>`;

  const stepsHTML = trackingSteps.map((step, i) => {
    let cls = "";
    if (isDone && i === order.currentStep) cls = "final";
    else if (i < order.currentStep) cls = "done";
    else if (i === order.currentStep) cls = "current";

    return `
      <div class="tc-step ${cls}">
        <div class="tc-step-icon">
          <i data-lucide="${step.icon}" style="width:15px;height:15px"></i>
        </div>
        <div class="tc-step-info">
          <div class="tc-step-label">
            ${step.label}
            ${i === order.currentStep && !isDone ? `<span class="tc-now-badge">● SEKARANG</span>` : ""}
            ${i < order.currentStep ? `<span style="font-size:.75rem;color:var(--accent)">✓</span>` : ""}
          </div>
          <div class="tc-step-sub">${step.sub}</div>
        </div>
      </div>`;
  }).join("");

  const waMsg = encodeURIComponent(
    `Halo WattCo! Saya ingin menanyakan status order:\n\n` +
    `No. Order: ${id}\n` +
    `Produk: ${order.product}\n` +
    `Nama: ${order.customer}\n\n` +
    `Mohon update progress-nya ya, terima kasih!`
  );

  return `
    <div class="track-card">
      <div class="tc-head">
        <div>
          <div class="tc-order-id">${id}</div>
          <div class="tc-product-name">${order.product}</div>
          <div class="tc-meta">
            <div class="tc-meta-item"><span>Pemesan</span><span>${order.customer}</span></div>
            <div class="tc-meta-item"><span>Jumlah</span><span>${order.qty} pcs</span></div>
            <div class="tc-meta-item"><span>Tgl Order</span><span>${order.orderDate}</span></div>
            <div class="tc-meta-item"><span>Estimasi</span><span>${order.estimasi}</span></div>
          </div>
        </div>
        ${statusHTML}
      </div>

      <div class="tc-progress">
        <div class="tc-progress-top">
          <span>Progress keseluruhan</span>
          <strong>${pct}%</strong>
        </div>
        <div class="tc-progress-track">
          <div class="tc-progress-fill" id="tcFill" style="width:0%"></div>
        </div>
      </div>

      <div class="tc-steps">${stepsHTML}</div>

      <div class="tc-foot">
        <div class="tc-foot-notes">
          <i data-lucide="file-text"></i>
          <span>${order.notes || "Tidak ada catatan tambahan"}</span>
        </div>
        <a href="https://wa.me/628157047507?text=${waMsg}" target="_blank" class="tc-wa-link">
          <i data-lucide="message-circle" style="width:14px;height:14px"></i>
          Tanya via WhatsApp
        </a>
      </div>
    </div>`;
}

// =====================================================
// INIT
// =====================================================
document.addEventListener("DOMContentLoaded", () => {
  buildTrackingWidget();
});
