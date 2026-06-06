/* ===================================================
   WattCo — Order Tracking | tracking.js
   Backend: Supabase REST API
   =================================================== */

const trackingSteps = [
  { id:0, label:"Order Diterima",  sub:"Pesanan masuk & dikonfirmasi",     icon:"clipboard-check" },
  { id:1, label:"Proses Desain",   sub:"Tim desain sedang mengerjakan",    icon:"palette"         },
  { id:2, label:"Produksi",        sub:"Bahan dipotong & dijahit",         icon:"settings"        },
  { id:3, label:"Quality Control", sub:"Pengecekan kualitas produk",       icon:"shield-check"    },
  { id:4, label:"Finishing",       sub:"Packaging & persiapan kirim",      icon:"package"         },
  { id:5, label:"Selesai / Kirim", sub:"Produk siap diambil atau dikirim", icon:"check-circle"    },
];

/* ---- Supabase helpers (pakai SUPABASE_URL & SUPABASE_ANON dari config) ---- */
async function sbFetch(path, opts = {}) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...opts,
    headers: {
      "apikey": SUPABASE_ANON,
      "Authorization": `Bearer ${SUPABASE_ANON}`,
      "Content-Type": "application/json",
      "Prefer": "return=representation",
      ...(opts.headers || {}),
    },
  });
  if (!res.ok) throw new Error(`Supabase ${res.status}`);
  return res.json();
}

const fetchOrder    = id  => sbFetch(`orders?order_id=eq.${encodeURIComponent(id)}&select=*`).then(d => d[0] || null);
const fetchOrderIds = ()  => sbFetch(`orders?select=order_id&order=created_at.asc&limit=12`).then(d => d.map(r => r.order_id));

/* ---- CSS ---- */
(function(){
  const s = document.createElement("style");
  s.textContent = `
  #trackingWidget{max-width:760px;margin:0 auto}
  .track-search-wrap{display:flex;gap:8px;margin-bottom:2rem;background:var(--bg-raised);border:1px solid var(--border);border-radius:var(--radius-lg);padding:6px 6px 6px 16px;transition:border-color .25s}
  .track-search-wrap:focus-within{border-color:rgba(10,132,255,.4)}
  .track-search-wrap input{flex:1;background:transparent;border:none;outline:none;color:var(--text-primary);font-family:var(--font-mono);font-size:.9rem;letter-spacing:.06em;text-transform:uppercase}
  .track-search-wrap input::placeholder{text-transform:none;letter-spacing:0;font-family:var(--font-body);color:var(--text-muted);font-size:.85rem}
  .track-search-btn{padding:10px 22px;background:var(--accent);color:#fff;font-family:var(--font-display);font-weight:700;font-size:.82rem;border-radius:var(--radius);display:flex;align-items:center;gap:6px;transition:.25s;white-space:nowrap;border:none}
  .track-search-btn:hover{filter:brightness(1.1);transform:translateY(-1px)}
  .track-search-btn:disabled{opacity:.5;pointer-events:none}
  .track-pills-label{font-size:.72rem;color:var(--text-muted);letter-spacing:.1em;text-transform:uppercase;margin-bottom:10px;font-family:var(--font-mono)}
  .track-pills{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:2.5rem;min-height:32px;align-items:center}
  .track-pill{padding:5px 14px;border:1px solid var(--border);border-radius:99px;font-size:.72rem;font-family:var(--font-mono);color:var(--accent);background:var(--accent-dim);transition:.2s;letter-spacing:.05em;cursor:pointer}
  .track-pill:hover{border-color:var(--accent);transform:translateY(-1px)}
  .pills-spinner{width:12px;height:12px;border-radius:50%;border:1.5px solid var(--border);border-top-color:var(--accent);animation:spin .8s linear infinite;display:inline-block}
  @keyframes spin{to{transform:rotate(360deg)}}
  @keyframes fadeSlideUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
  @keyframes shimmer{from{background-position:200% 0}to{background-position:-200% 0}}
  @keyframes iconBreath{0%,100%{box-shadow:0 0 0 4px var(--accent-dim)}50%{box-shadow:0 0 0 8px rgba(10,132,255,.08)}}

  /* skeleton */
  .track-skeleton{display:none;border-radius:var(--radius-xl);overflow:hidden;border:1px solid var(--border)}
  .track-skeleton.show{display:block}
  .skel-block{background:linear-gradient(90deg,var(--bg-raised) 25%,var(--bg-card-hover,#1C1C1E) 50%,var(--bg-raised) 75%);background-size:200% 100%;animation:shimmer 1.4s infinite}
  .skel-head{height:110px}
  .skel-bar{height:52px;border-top:1px solid var(--border)}
  .skel-steps{height:260px;border-top:1px solid var(--border);padding:1.5rem;display:flex;flex-direction:column;gap:1.5rem}
  .skel-step{display:flex;gap:14px;align-items:center}
  .skel-circle{width:36px;height:36px;border-radius:50%;background:var(--border);flex-shrink:0}
  .skel-line{height:12px;background:var(--border);border-radius:6px}

  /* card */
  .track-result{display:none}.track-result.show{display:block;animation:fadeSlideUp .4s ease}
  .track-notfound{display:none;text-align:center;padding:3rem 2rem}
  .track-notfound.show{display:block;animation:fadeSlideUp .4s ease}
  .track-notfound h4{font-family:var(--font-display);font-size:1.1rem;font-weight:700;margin-bottom:6px}
  .track-notfound p{font-size:.85rem;color:var(--text-secondary)}
  .track-error{display:none;text-align:center;padding:2rem;flex-direction:column;align-items:center;gap:8px}
  .track-error.show{display:flex;animation:fadeSlideUp .4s ease}
  .track-error p{font-size:.85rem;color:var(--text-secondary)}
  .track-error-badge{padding:6px 14px;background:rgba(255,69,58,.08);border:1px solid rgba(255,69,58,.2);border-radius:99px;color:#FF453A;font-size:.75rem;font-weight:600}
  .track-card{background:var(--bg-raised);border:1px solid var(--border);border-radius:var(--radius-xl);overflow:hidden}
  .tc-head{padding:1.5rem;background:linear-gradient(135deg,rgba(10,132,255,.05) 0%,transparent 100%);border-bottom:1px solid var(--border);display:flex;align-items:flex-start;justify-content:space-between;gap:1rem;flex-wrap:wrap}
  .tc-order-id{font-family:var(--font-mono);font-size:.78rem;color:var(--accent);font-weight:600;letter-spacing:.1em;margin-bottom:6px}
  .tc-product-name{font-family:var(--font-display);font-size:1.3rem;font-weight:800;margin-bottom:10px}
  .tc-meta{display:flex;gap:1.5rem;flex-wrap:wrap}
  .tc-meta-item{display:flex;flex-direction:column;gap:2px}
  .tc-meta-item span:first-child{font-size:.66rem;color:var(--text-muted);letter-spacing:.1em;text-transform:uppercase}
  .tc-meta-item span:last-child{font-size:.85rem;font-weight:600}
  .tc-status{display:flex;align-items:center;gap:7px;padding:7px 14px;border-radius:99px;font-size:.72rem;font-weight:700;letter-spacing:.07em;white-space:nowrap}
  .tc-status-dot{width:7px;height:7px;border-radius:50%}
  .tc-status.active{background:var(--accent-dim);color:var(--accent);border:1px solid rgba(10,132,255,.25)}
  .tc-status.active .tc-status-dot{background:var(--accent);animation:dotPulse 2s infinite}
  .tc-status.done{background:rgba(48,209,88,.08);color:var(--green);border:1px solid rgba(48,209,88,.25)}
  .tc-status.done .tc-status-dot{background:var(--green)}
  .tc-progress{padding:1.1rem 1.5rem;border-bottom:1px solid var(--border);background:var(--bg-card)}
  .tc-progress-top{display:flex;justify-content:space-between;font-size:.72rem;margin-bottom:8px}
  .tc-progress-top span{color:var(--text-muted)}.tc-progress-top strong{color:var(--accent);font-family:var(--font-mono)}
  .tc-progress-track{height:4px;background:var(--border);border-radius:99px;overflow:hidden}
  .tc-progress-fill{height:100%;width:0%;background:linear-gradient(90deg,var(--accent) 0%,var(--accent-2) 100%);border-radius:99px;transition:width 1.2s cubic-bezier(.4,0,.2,1)}
  .tc-steps{padding:1.5rem;display:flex;flex-direction:column;gap:0}
  .tc-step{display:flex;gap:14px;position:relative;padding-bottom:1.5rem;opacity:0;transform:translateX(-10px);transition:opacity .35s ease,transform .35s ease}
  .tc-step:last-child{padding-bottom:0}
  .tc-step.visible{opacity:1;transform:translateX(0)}
  .tc-step::before{content:'';position:absolute;left:17px;top:36px;width:1.5px;height:calc(100% - 20px);background:var(--border);z-index:0}
  .tc-step:last-child::before{display:none}
  .tc-step.done::before,.tc-step.current::before{background:linear-gradient(to bottom,rgba(10,132,255,.4),transparent)}
  .tc-step-icon{width:36px;height:36px;border-radius:50%;border:1.5px solid var(--border);background:var(--bg-card);display:flex;align-items:center;justify-content:center;flex-shrink:0;position:relative;z-index:1;transition:all .3s ease;color:var(--text-muted)}
  .tc-step.done .tc-step-icon{border-color:var(--accent);background:var(--accent-dim);color:var(--accent)}
  .tc-step.current .tc-step-icon{border-color:var(--accent);background:var(--accent);color:#fff;box-shadow:0 0 0 4px var(--accent-dim);animation:iconBreath 2s ease infinite}
  .tc-step.final .tc-step-icon{border-color:var(--green);background:rgba(48,209,88,.12);color:var(--green)}
  .tc-step-info{flex:1;padding-top:6px}
  .tc-step-label{font-size:.88rem;font-weight:700;color:var(--text-muted);margin-bottom:2px;display:flex;align-items:center;gap:8px}
  .tc-step.done .tc-step-label,.tc-step.current .tc-step-label{color:var(--text-primary)}
  .tc-step.final .tc-step-label{color:var(--green)}
  .tc-step-sub{font-size:.78rem;color:var(--text-muted)}
  .tc-step.current .tc-step-sub{color:var(--text-secondary)}
  .tc-now-badge{display:inline-flex;align-items:center;gap:4px;padding:2px 8px;background:var(--accent);color:#fff;border-radius:99px;font-size:.6rem;font-weight:700;letter-spacing:.06em}
  .tc-foot{padding:1.1rem 1.5rem;border-top:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;gap:1rem;flex-wrap:wrap;background:var(--bg-card)}
  .tc-foot-notes{font-size:.8rem;color:var(--text-secondary);display:flex;align-items:flex-start;gap:8px}
  .tc-wa-link{display:flex;align-items:center;gap:6px;padding:9px 16px;background:rgba(48,209,88,.08);border:1px solid rgba(48,209,88,.2);border-radius:var(--radius-sm);color:var(--green);font-size:.8rem;font-weight:600;transition:.2s;white-space:nowrap;text-decoration:none}
  .tc-wa-link:hover{background:rgba(48,209,88,.15)}
  @media(max-width:600px){.tc-head,.tc-foot{flex-direction:column}.track-search-wrap{flex-direction:column;padding:10px}}
  `;
  document.head.appendChild(s);
})();

/* ---- Build widget ---- */
async function buildTrackingWidget() {
  const widget = document.getElementById("trackingWidget");
  if (!widget) return;

  widget.innerHTML = `
    <div class="track-search-wrap">
      <input type="text" id="trackInput" placeholder="Masukkan nomor order, contoh: WTC-2024-001" maxlength="20"/>
      <button class="track-search-btn" id="trackBtn">
        <i data-lucide="search" style="width:14px;height:14px"></i> Lacak
      </button>
    </div>
    <div class="track-pills-label">// Order terdaftar:</div>
    <div class="track-pills" id="trackPills">
      <span class="pills-spinner"></span>&nbsp;Memuat data...
    </div>
    <div class="track-skeleton" id="trackSkeleton">
      <div class="skel-block skel-head"></div>
      <div class="skel-block skel-bar"></div>
      <div class="skel-block skel-steps">
        ${[1,2,3,4].map(()=>`<div class="skel-step"><div class="skel-circle"></div><div style="flex:1;display:flex;flex-direction:column;gap:6px"><div class="skel-line" style="width:40%"></div><div class="skel-line" style="width:65%"></div></div></div>`).join("")}
      </div>
    </div>
    <div class="track-result"   id="trackResult"></div>
    <div class="track-notfound" id="trackNotFound">
      <div style="font-size:3rem;margin-bottom:1rem">🔍</div>
      <h4>Order Tidak Ditemukan</h4>
      <p>Pastikan nomor order sesuai yang dikirim via WhatsApp.</p>
      <a href="https://wa.me/628157047507" target="_blank" style="display:inline-flex;align-items:center;gap:8px;margin-top:1.25rem;padding:10px 20px;background:rgba(48,209,88,.08);border:1px solid rgba(48,209,88,.2);border-radius:var(--radius-sm);color:var(--green);font-size:.82rem;font-weight:600;text-decoration:none">
        <i data-lucide="message-circle" style="width:15px;height:15px"></i> Konfirmasi via WhatsApp
      </a>
    </div>
    <div class="track-error" id="trackError">
      <span class="track-error-badge">⚠ Gagal terhubung ke server</span>
      <p>Cek koneksi internet dan pastikan Supabase URL sudah benar di supabase-config.js</p>
      <button onclick="buildTrackingWidget()" style="margin-top:8px;padding:8px 18px;border:1px solid var(--border);border-radius:var(--radius-sm);font-size:.82rem;color:var(--text-secondary);background:transparent;cursor:pointer">Coba Lagi</button>
    </div>`;

  if (window.lucide) lucide.createIcons({ nodes: [widget] });

  /* load pills */
  try {
    const ids = await fetchOrderIds();
    const pills = document.getElementById("trackPills");
    if (pills) pills.innerHTML = ids.length
      ? ids.map(id => `<button class="track-pill" onclick="trackOrder('${id}')">${id}</button>`).join("")
      : `<span style="font-size:.8rem;color:var(--text-muted)">Belum ada order</span>`;
  } catch {
    const pills = document.getElementById("trackPills");
    if (pills) pills.innerHTML = `<span style="font-size:.78rem;color:var(--text-muted)">Gagal memuat — cek config Supabase</span>`;
  }

  /* events */
  const input = document.getElementById("trackInput");
  const btn   = document.getElementById("trackBtn");
  btn?.addEventListener("click", () => { const v = input?.value.trim().toUpperCase(); if(v) trackOrder(v); });
  input?.addEventListener("keydown", e => { if(e.key==="Enter"){ const v=input.value.trim().toUpperCase(); if(v) trackOrder(v); } });
  input?.addEventListener("input", e => { const p=e.target.selectionStart; e.target.value=e.target.value.toUpperCase(); e.target.setSelectionRange(p,p); });
}

/* ---- Track order ---- */
window.trackOrder = async function(orderId) {
  const id       = orderId.toUpperCase().trim();
  const result   = document.getElementById("trackResult");
  const notFound = document.getElementById("trackNotFound");
  const skeleton = document.getElementById("trackSkeleton");
  const errorEl  = document.getElementById("trackError");
  const input    = document.getElementById("trackInput");
  const btn      = document.getElementById("trackBtn");
  if (!result) return;

  if (input) input.value = id;
  result.classList.remove("show");
  notFound.classList.remove("show");
  errorEl?.classList.remove("show");
  skeleton?.classList.add("show");
  if (btn) btn.disabled = true;

  document.getElementById("tracking")?.scrollIntoView({ behavior:"smooth", block:"start" });

  try {
    const order = await fetchOrder(id);
    skeleton?.classList.remove("show");
    if (btn) btn.disabled = false;

    if (!order) { notFound.classList.add("show"); if(window.lucide) lucide.createIcons({nodes:[notFound]}); return; }

    result.innerHTML = buildCard(id, order);
    result.classList.add("show");
    setTimeout(() => {
      const fill = document.getElementById("tcFill");
      const pct  = Math.round((order.current_step / (trackingSteps.length-1)) * 100);
      if (fill) fill.style.width = pct + "%";
      document.querySelectorAll(".tc-step").forEach((el,i) => setTimeout(()=>el.classList.add("visible"), i*80));
    }, 120);
    if (window.lucide) lucide.createIcons({ nodes:[result] });

  } catch(err) {
    console.error(err);
    skeleton?.classList.remove("show");
    if (btn) btn.disabled = false;
    errorEl?.classList.add("show");
  }
};

function buildCard(id, order) {
  const step   = order.current_step;
  const pct    = Math.round((step / (trackingSteps.length-1)) * 100);
  const isDone = step === trackingSteps.length - 1;

  const stepsHTML = trackingSteps.map((s,i) => {
    const cls = (isDone && i===step) ? "final" : i < step ? "done" : i===step ? "current" : "";
    return `<div class="tc-step ${cls}">
      <div class="tc-step-icon"><i data-lucide="${s.icon}" style="width:15px;height:15px"></i></div>
      <div class="tc-step-info">
        <div class="tc-step-label">${s.label}
          ${i===step&&!isDone?`<span class="tc-now-badge">● SEKARANG</span>`:""}
          ${i<step?`<span style="font-size:.75rem;color:var(--accent)">✓</span>`:""}
        </div>
        <div class="tc-step-sub">${s.sub}</div>
      </div>
    </div>`;
  }).join("");

  const waMsg = encodeURIComponent(
    `Halo WattCo! Mau tanya status order:\n\nNo. Order: ${id}\nProduk: ${order.product}\nNama: ${order.customer}\n\nMohon infonya ya!`
  );

  return `<div class="track-card">
    <div class="tc-head">
      <div>
        <div class="tc-order-id">${id}</div>
        <div class="tc-product-name">${order.product}</div>
        <div class="tc-meta">
          <div class="tc-meta-item"><span>Pemesan</span><span>${order.customer}</span></div>
          <div class="tc-meta-item"><span>Jumlah</span><span>${order.qty} pcs</span></div>
          <div class="tc-meta-item"><span>Tgl Order</span><span>${order.order_date}</span></div>
          <div class="tc-meta-item"><span>Estimasi</span><span>${order.estimasi}</span></div>
        </div>
      </div>
      ${isDone
        ? `<div class="tc-status done"><div class="tc-status-dot"></div> SELESAI</div>`
        : `<div class="tc-status active"><div class="tc-status-dot"></div> ON PROGRESS</div>`}
    </div>
    <div class="tc-progress">
      <div class="tc-progress-top"><span>Progress keseluruhan</span><strong>${pct}%</strong></div>
      <div class="tc-progress-track"><div class="tc-progress-fill" id="tcFill" style="width:0%"></div></div>
    </div>
    <div class="tc-steps">${stepsHTML}</div>
    <div class="tc-foot">
      <div class="tc-foot-notes">
        <i data-lucide="file-text" style="width:14px;height:14px;color:var(--accent);flex-shrink:0;margin-top:1px"></i>
        <span>${order.notes || "Tidak ada catatan tambahan"}</span>
      </div>
      <a href="https://wa.me/628157047507?text=${waMsg}" target="_blank" class="tc-wa-link">
        <i data-lucide="message-circle" style="width:14px;height:14px"></i> Tanya via WhatsApp
      </a>
    </div>
  </div>`;
}

document.addEventListener("DOMContentLoaded", () => { buildTrackingWidget(); });
