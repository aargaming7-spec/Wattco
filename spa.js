/* ===================================================
   WattCo — Design Studio | spa.js
   Canvas-based real-time design preview
   =================================================== */

(function injectStudioCSS() {
  const s = document.createElement("style");
  s.textContent = `
    /* Studio grid */
    .studio-grid {
      display: grid;
      grid-template-columns: 320px 1fr;
      gap: 1.5rem;
      align-items: start;
    }

    /* Controls panel */
    .studio-controls {
      background: var(--bg-raised);
      border: 1px solid var(--border);
      border-radius: var(--radius-xl);
      overflow: hidden;
    }
    .sc-section {
      padding: 1.25rem;
      border-bottom: 1px solid var(--border);
    }
    .sc-section:last-child { border-bottom: none; }
    .sc-label {
      font-size: 0.68rem; font-weight: 700;
      letter-spacing: 0.1em; text-transform: uppercase;
      color: var(--text-muted); margin-bottom: 0.85rem;
    }

    /* Product options */
    .prod-opts { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; }
    .prod-opt {
      padding: 8px 4px;
      border: 1.5px solid var(--border);
      border-radius: var(--radius-sm);
      font-size: 0.72rem; font-weight: 600;
      text-align: center; color: var(--text-secondary);
      transition: .2s;
    }
    .prod-opt:hover { border-color: var(--border-hover); color: var(--text-primary); }
    .prod-opt.selected { border-color: var(--accent); background: var(--accent-dim); color: var(--accent); }
    .prod-opt-icon { font-size: 1.2rem; margin-bottom: 3px; display: block; }

    /* Color swatches */
    .swatches { display: flex; gap: 7px; flex-wrap: wrap; margin-bottom: 8px; }
    .swatch {
      width: 28px; height: 28px; border-radius: 50%;
      border: 2.5px solid transparent;
      transition: transform .2s, border-color .2s;
      flex-shrink: 0;
    }
    .swatch:hover { transform: scale(1.15); }
    .swatch.selected { border-color: var(--text-primary); }
    .color-row { display: flex; align-items: center; gap: 10px; margin-top: 8px; }
    .color-row label { font-size: 0.75rem; color: var(--text-muted); }
    .color-row input[type="color"] {
      width: 32px; height: 32px; border-radius: 50%;
      border: 1.5px solid var(--border); padding: 2px;
      background: transparent;
    }

    /* Logo upload */
    .logo-upload-btn {
      display: flex; align-items: center; gap: 8px;
      padding: 10px 14px;
      background: var(--bg-card);
      border: 1.5px dashed var(--border);
      border-radius: var(--radius-sm);
      font-size: 0.8rem; color: var(--text-secondary);
      transition: .2s; position: relative; overflow: hidden;
      width: 100%;
    }
    .logo-upload-btn:hover { border-color: var(--accent); color: var(--accent); background: var(--accent-dim); }
    .logo-upload-btn input { position: absolute; inset: 0; opacity: 0; }
    .logo-controls { display: flex; flex-direction: column; gap: 8px; margin-top: 10px; }
    .slider-row { display: flex; align-items: center; gap: 10px; }
    .slider-row label { font-size: 0.72rem; color: var(--text-muted); min-width: 70px; }
    .slider-row input[type="range"] { flex: 1; accent-color: var(--accent); }
    .slider-val { font-size: 0.72rem; color: var(--accent); font-family: var(--font-mono); min-width: 28px; text-align: right; }

    /* Text inputs */
    .studio-input {
      width: 100%; padding: 10px 12px;
      background: var(--bg-card); border: 1px solid var(--border);
      border-radius: var(--radius-sm); color: var(--text-primary);
      font-size: 0.85rem; outline: none; transition: .2s;
      margin-bottom: 8px;
    }
    .studio-input:focus { border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-dim); }

    /* Font options */
    .font-opts { display: flex; flex-wrap: wrap; gap: 6px; }
    .font-opt {
      padding: 5px 12px;
      border: 1.5px solid var(--border);
      border-radius: 99px; font-size: 0.72rem;
      color: var(--text-secondary); transition: .2s;
    }
    .font-opt:hover { border-color: var(--border-hover); }
    .font-opt.selected { border-color: var(--accent); background: var(--accent-dim); color: var(--accent); }

    /* Position grid */
    .pos-grid {
      display: grid; grid-template-columns: repeat(3,1fr); gap: 4px;
    }
    .pos-cell {
      aspect-ratio: 1; border-radius: 6px;
      border: 1.5px solid var(--border);
      display: flex; align-items: center; justify-content: center;
      font-size: 0.6rem; color: var(--text-muted);
      transition: .2s;
    }
    .pos-cell:hover { border-color: var(--border-hover); }
    .pos-cell.selected { border-color: var(--accent); background: var(--accent-dim); }
    .pos-cell::after { content: '·'; font-size: 1.2rem; }
    .pos-cell.selected::after { content: '✕'; color: var(--accent); font-size: 0.7rem; }

    /* Canvas area */
    .studio-canvas-wrap {
      background: var(--bg-raised);
      border: 1px solid var(--border);
      border-radius: var(--radius-xl);
      overflow: hidden;
    }
    .studio-canvas-head {
      padding: 1rem 1.25rem;
      border-bottom: 1px solid var(--border);
      display: flex; align-items: center; justify-content: space-between;
    }
    .studio-canvas-head span {
      font-family: var(--font-display); font-size: 0.9rem; font-weight: 700;
    }
    .studio-canvas-actions { display: flex; gap: 8px; }
    .studio-action-btn {
      display: flex; align-items: center; gap: 6px;
      padding: 7px 14px; border-radius: var(--radius-sm);
      font-size: 0.78rem; font-weight: 600;
      border: 1px solid var(--border); color: var(--text-secondary);
      transition: .2s;
    }
    .studio-action-btn:hover { border-color: var(--border-hover); color: var(--text-primary); }
    .studio-action-btn.primary {
      background: var(--accent); border-color: var(--accent); color: #fff;
    }
    .studio-action-btn.primary:hover { filter: brightness(1.1); }
    .canvas-container { padding: 2rem; display: flex; justify-content: center; }
    #designCanvas { border-radius: var(--radius-lg); display: block; max-width: 100%; }

    .studio-order-wrap {
      padding: 1.25rem;
      border-top: 1px solid var(--border);
      display: flex; align-items: center; gap: 12px;
    }
    .studio-order-wrap p { font-size: 0.82rem; color: var(--text-secondary); flex: 1; }
    .studio-order-btn {
      display: flex; align-items: center; gap: 6px;
      padding: 10px 18px;
      background: var(--green); color: #000;
      font-family: var(--font-display); font-weight: 700;
      font-size: 0.82rem; border-radius: var(--radius-sm);
      white-space: nowrap; transition: .2s;
    }
    .studio-order-btn:hover { filter: brightness(1.08); transform: translateY(-1px); }

    @media (max-width: 900px) {
      .studio-grid { grid-template-columns: 1fr; }
    }
  `;
  document.head.appendChild(s);
})();

// =====================================================
// BUILD DESIGN STUDIO
// =====================================================
function buildDesignStudio() {
  const container = document.getElementById("studioGrid");
  if (!container) return;

  container.innerHTML = `
    <!-- Controls -->
    <div class="studio-controls">

      <div class="sc-section">
        <div class="sc-label">Pilih Produk</div>
        <div class="prod-opts">
          <button class="prod-opt selected" data-prod="kemeja">
            <span class="prod-opt-icon">👕</span>PDH/Kemeja
          </button>
          <button class="prod-opt" data-prod="kaos">
            <span class="prod-opt-icon">👚</span>Kaos
          </button>
          <button class="prod-opt" data-prod="jaket">
            <span class="prod-opt-icon">🧥</span>Jaket
          </button>
          <button class="prod-opt" data-prod="hoodie">
            <span class="prod-opt-icon">🧤</span>Hoodie
          </button>
          <button class="prod-opt" data-prod="totebag">
            <span class="prod-opt-icon">🛍</span>Tote Bag
          </button>
          <button class="prod-opt" data-prod="wearpack">
            <span class="prod-opt-icon">🦺</span>Wearpack
          </button>
        </div>
      </div>

      <div class="sc-section">
        <div class="sc-label">Warna Produk</div>
        <div class="swatches">
          ${[
            ["#0D1B2E","Navy"],["#1C1C1E","Hitam"],["#F5F5F0","Putih"],
            ["#E63946","Merah"],["#2D6A4F","Hijau"],["#FF9F0A","Kuning"],
            ["#5E5CE6","Ungu"],["#8B4513","Coklat"]
          ].map(([c,n],i) => `
            <div class="swatch${i===0?" selected":""}" data-color="${c}" title="${n}"
              style="background:${c};${c==="#F5F5F0"?"border:2px solid #ccc;":""}"></div>
          `).join("")}
        </div>
        <div class="color-row">
          <label>Custom:</label>
          <input type="color" id="customColor" value="#0D1B2E" />
        </div>
      </div>

      <div class="sc-section">
        <div class="sc-label">Upload Logo</div>
        <label class="logo-upload-btn">
          <i data-lucide="upload-cloud" style="width:16px;height:16px"></i>
          <span id="logoUploadText">Klik untuk upload logo</span>
          <input type="file" id="logoFile" accept="image/*" />
        </label>
        <div class="logo-controls">
          <div class="slider-row">
            <label>Ukuran Logo</label>
            <input type="range" id="logoSize" min="30" max="140" value="70" />
            <span class="slider-val" id="logoSizeVal">70</span>
          </div>
        </div>
      </div>

      <div class="sc-section">
        <div class="sc-label">Teks Desain</div>
        <input class="studio-input" id="textLine1" type="text" placeholder="Baris 1 (contoh: HMTE)" maxlength="24" />
        <input class="studio-input" id="textLine2" type="text" placeholder="Baris 2 (opsional)" maxlength="28" />
        <div class="font-opts">
          ${[
            ["Arial","Sans-serif"],["Georgia","Serif"],
            ["Courier New","Mono"],["Impact","Bold"],
            ["Trebuchet MS","Round"],
          ].map(([f,l],i) =>
            `<button class="font-opt${i===0?" selected":""}" data-font="${f}">${l}</button>`
          ).join("")}
        </div>
        <div class="logo-controls" style="margin-top:10px">
          <div class="slider-row">
            <label>Ukuran Teks</label>
            <input type="range" id="textSize" min="10" max="56" value="22" />
            <span class="slider-val" id="textSizeVal">22</span>
          </div>
          <div class="color-row">
            <label>Warna Teks:</label>
            <input type="color" id="textColor" value="#FFFFFF" />
          </div>
        </div>
      </div>

      <div class="sc-section">
        <div class="sc-label">Posisi Desain</div>
        <div class="pos-grid">
          ${Array.from({length:9},(_,i) =>
            `<button class="pos-cell${i===4?" selected":""}" data-pos="${i}"></button>`
          ).join("")}
        </div>
      </div>

    </div>

    <!-- Canvas -->
    <div class="studio-canvas-wrap">
      <div class="studio-canvas-head">
        <span>Preview Desain</span>
        <div class="studio-canvas-actions">
          <button class="studio-action-btn" id="resetBtn">
            <i data-lucide="rotate-ccw" style="width:13px;height:13px"></i> Reset
          </button>
          <button class="studio-action-btn primary" id="downloadBtn">
            <i data-lucide="download" style="width:13px;height:13px"></i> Simpan PNG
          </button>
        </div>
      </div>
      <div class="canvas-container">
        <canvas id="designCanvas" width="480" height="540"></canvas>
      </div>
      <div class="studio-order-wrap">
        <p>Suka dengan preview-nya? Hubungi kami untuk mulai produksi.</p>
        <button class="studio-order-btn" id="studioOrderBtn">
          <i data-lucide="message-circle" style="width:14px;height:14px"></i> Order Sekarang
        </button>
      </div>
    </div>
  `;

  if (window.lucide) lucide.createIcons({ nodes: [container] });
  initStudioCanvas();
}

// =====================================================
// CANVAS ENGINE
// =====================================================
function initStudioCanvas() {
  const canvas = document.getElementById("designCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  const W = canvas.width, H = canvas.height;

  const state = {
    product: "kemeja",
    color: "#0D1B2E",
    logo: null, logoSize: 70,
    text1: "", text2: "",
    font: "Arial", textColor: "#FFFFFF", textSize: 22,
    position: 4,
  };

  const productConfigs = {
    kemeja:  { label:"PDH / Kemeja",  shape:"shirt",    collar:true  },
    kaos:    { label:"Kaos",          shape:"tshirt",   collar:false },
    jaket:   { label:"Jaket",         shape:"jacket",   collar:true  },
    hoodie:  { label:"Hoodie",        shape:"hoodie",   collar:false },
    totebag: { label:"Tote Bag",      shape:"bag",      collar:false },
    wearpack:{ label:"Wearpack",      shape:"coverall", collar:true  },
  };

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Background
    ctx.fillStyle = getComputedStyle(document.documentElement)
      .getPropertyValue("--bg-card").trim() || "#141414";
    ctx.fillRect(0, 0, W, H);

    // Draw garment
    drawGarment(ctx, state, W, H);

    // Draw design on top
    drawDesignLayer(ctx, state, W, H);

    // Label
    const cfg = productConfigs[state.product];
    ctx.fillStyle = "rgba(255,255,255,0.15)";
    ctx.font = "11px monospace";
    ctx.textAlign = "center";
    ctx.fillText(cfg?.label || state.product, W / 2, H - 18);
  }

  function drawGarment(ctx, state, W, H) {
    const cx = W / 2;
    const color = state.color;
    const shape = productConfigs[state.product]?.shape || "tshirt";

    ctx.save();

    if (shape === "bag") {
      // Tote bag
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.roundRect(cx - 100, 100, 200, 260, 6);
      ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.1)";
      ctx.lineWidth = 1.5;
      ctx.stroke();
      // Handles
      ctx.strokeStyle = color;
      ctx.lineWidth = 14;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.arc(cx - 38, 100, 30, Math.PI, 0);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(cx + 38, 100, 30, Math.PI, 0);
      ctx.stroke();
      ctx.strokeStyle = "rgba(255,255,255,0.12)";
      ctx.lineWidth = 2;
      ctx.stroke();
    } else if (shape === "coverall") {
      // Wearpack
      const points = [
        [cx-80,60],[cx-55,60],[cx-45,80],[cx+45,80],[cx+55,60],[cx+80,60],
        [cx+90,90],[cx+70,90],[cx+70,360],[cx-70,360],[cx-70,90],[cx-90,90]
      ];
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(...points[0]);
      points.slice(1).forEach(p => ctx.lineTo(...p));
      ctx.closePath(); ctx.fill();
      // Legs
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.rect(cx-65,300,50,100); ctx.fill();
      ctx.beginPath();
      ctx.rect(cx+15,300,50,100); ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.1)"; ctx.lineWidth = 1; ctx.stroke();
    } else {
      // Standard shirts/jackets
      const topY = 50;
      const bodyW = shape === "jacket" ? 170 : 150;
      const sleeveW = shape === "jacket" ? 70 : 60;

      // Body
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(cx - bodyW/2, topY + 40);
      ctx.lineTo(cx - bodyW/2, 380);
      ctx.lineTo(cx + bodyW/2, 380);
      ctx.lineTo(cx + bodyW/2, topY + 40);
      // Shoulders
      ctx.lineTo(cx + bodyW/2 + sleeveW, topY + 80);
      ctx.lineTo(cx + bodyW/2 + sleeveW, topY + 180);
      ctx.lineTo(cx + bodyW/2, topY + 130);
      ctx.moveTo(cx - bodyW/2, topY + 40);
      ctx.lineTo(cx - bodyW/2 - sleeveW, topY + 80);
      ctx.lineTo(cx - bodyW/2 - sleeveW, topY + 180);
      ctx.lineTo(cx - bodyW/2, topY + 130);
      // Neck
      ctx.moveTo(cx - 36, topY + 40);
      ctx.quadraticCurveTo(cx, topY + 72, cx + 36, topY + 40);
      ctx.quadraticCurveTo(cx + bodyW/2, topY + 10, cx + bodyW/2, topY + 40);
      ctx.moveTo(cx - 36, topY + 40);
      ctx.quadraticCurveTo(cx - bodyW/2, topY + 10, cx - bodyW/2, topY + 40);

      ctx.fillStyle = color;
      ctx.fill();

      // Outline
      ctx.strokeStyle = "rgba(255,255,255,0.08)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Collar detail for kemeja/jaket/wearpack
      if (productConfigs[state.product]?.collar) {
        ctx.fillStyle = "rgba(0,0,0,0.18)";
        ctx.beginPath();
        ctx.moveTo(cx - 28, topY + 44);
        ctx.lineTo(cx, topY + 90);
        ctx.lineTo(cx + 28, topY + 44);
        ctx.lineTo(cx + 14, topY + 40);
        ctx.quadraticCurveTo(cx, topY + 60, cx - 14, topY + 40);
        ctx.closePath();
        ctx.fill();

        if (shape !== "jacket") {
          // Buttons
          ctx.fillStyle = "rgba(255,255,255,0.18)";
          [100, 140, 180, 220].forEach(oy => {
            ctx.beginPath();
            ctx.arc(cx, topY + oy - 10, 3.5, 0, Math.PI * 2);
            ctx.fill();
          });
        }
      }

      // Pocket for jacket
      if (shape === "jacket") {
        ctx.fillStyle = "rgba(0,0,0,0.12)";
        ctx.beginPath();
        ctx.roundRect(cx - bodyW/2 + 18, 240, 52, 40, 4);
        ctx.fill();
        ctx.strokeStyle = "rgba(255,255,255,0.08)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    ctx.restore();
  }

  function getDesignXY(pos, W, H) {
    const positions = [
      [W*0.28, H*0.26], [W*0.50, H*0.26], [W*0.72, H*0.26],
      [W*0.28, H*0.50], [W*0.50, H*0.50], [W*0.72, H*0.50],
      [W*0.28, H*0.74], [W*0.50, H*0.74], [W*0.72, H*0.74],
    ];
    return positions[pos] || positions[4];
  }

  function drawDesignLayer(ctx, state, W, H) {
    const [px, py] = getDesignXY(state.position, W, H);
    let offsetY = py;

    ctx.save();
    ctx.textAlign = "center";

    if (state.logo) {
      const s = state.logoSize;
      ctx.drawImage(state.logo, px - s/2, offsetY - s/2, s, s);
      offsetY += s/2 + 10;
    }

    if (state.text1 || state.text2) {
      ctx.fillStyle = state.textColor;
      ctx.shadowColor = "rgba(0,0,0,0.6)";
      ctx.shadowBlur = 5;

      if (state.text1) {
        ctx.font = `bold ${state.textSize}px ${state.font}`;
        const yOff = state.logo ? 0 : -state.textSize/2;
        ctx.fillText(state.text1, px, offsetY + yOff);
        offsetY += state.textSize + 5;
      }
      if (state.text2) {
        const sz2 = Math.round(state.textSize * 0.75);
        ctx.font = `${sz2}px ${state.font}`;
        ctx.fillStyle = state.textColor + "cc";
        const yOff2 = state.logo ? 0 : state.textSize/4;
        ctx.fillText(state.text2, px, offsetY + yOff2);
      }

      ctx.shadowBlur = 0;
    }

    // Placeholder
    if (!state.logo && !state.text1 && !state.text2) {
      ctx.strokeStyle = "rgba(10,132,255,0.25)";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([5, 5]);
      ctx.strokeRect(px - 65, py - 40, 130, 80);
      ctx.setLineDash([]);
      ctx.fillStyle = "rgba(10,132,255,0.45)";
      ctx.font = "11px monospace";
      ctx.fillText("+ Tambah Desain", px, py + 5);
    }

    ctx.restore();
  }

  // Initial draw
  draw();

  // ── Event Listeners ──

  document.querySelectorAll(".prod-opt").forEach(opt => {
    opt.addEventListener("click", () => {
      document.querySelectorAll(".prod-opt").forEach(o => o.classList.remove("selected"));
      opt.classList.add("selected");
      state.product = opt.dataset.prod;
      draw();
    });
  });

  document.querySelectorAll(".swatch").forEach(sw => {
    sw.addEventListener("click", () => {
      document.querySelectorAll(".swatch").forEach(s => s.classList.remove("selected"));
      sw.classList.add("selected");
      state.color = sw.dataset.color;
      document.getElementById("customColor").value = state.color;
      draw();
    });
  });

  document.getElementById("customColor")?.addEventListener("input", e => {
    state.color = e.target.value;
    document.querySelectorAll(".swatch").forEach(s => s.classList.remove("selected"));
    draw();
  });

  document.getElementById("logoFile")?.addEventListener("change", e => {
    const file = e.target.files[0];
    if (!file) return;
    const img = new Image();
    img.onload = () => { state.logo = img; draw(); };
    img.src = URL.createObjectURL(file);
    document.getElementById("logoUploadText").textContent = "✓ " + file.name;
  });

  document.getElementById("logoSize")?.addEventListener("input", e => {
    state.logoSize = parseInt(e.target.value);
    document.getElementById("logoSizeVal").textContent = state.logoSize;
    draw();
  });

  document.getElementById("textLine1")?.addEventListener("input", e => {
    state.text1 = e.target.value; draw();
  });
  document.getElementById("textLine2")?.addEventListener("input", e => {
    state.text2 = e.target.value; draw();
  });

  document.querySelectorAll(".font-opt").forEach(opt => {
    opt.addEventListener("click", () => {
      document.querySelectorAll(".font-opt").forEach(o => o.classList.remove("selected"));
      opt.classList.add("selected");
      state.font = opt.dataset.font; draw();
    });
  });

  document.getElementById("textColor")?.addEventListener("input", e => {
    state.textColor = e.target.value; draw();
  });

  document.getElementById("textSize")?.addEventListener("input", e => {
    state.textSize = parseInt(e.target.value);
    document.getElementById("textSizeVal").textContent = state.textSize;
    draw();
  });

  document.querySelectorAll(".pos-cell").forEach(cell => {
    cell.addEventListener("click", () => {
      document.querySelectorAll(".pos-cell").forEach(c => c.classList.remove("selected"));
      cell.classList.add("selected");
      state.position = parseInt(cell.dataset.pos); draw();
    });
  });

  document.getElementById("resetBtn")?.addEventListener("click", () => {
    state.logo = null; state.text1 = ""; state.text2 = "";
    state.color = "#0D1B2E"; state.position = 4;
    state.logoSize = 70; state.textSize = 22;
    state.font = "Arial"; state.textColor = "#FFFFFF";
    document.getElementById("textLine1").value = "";
    document.getElementById("textLine2").value = "";
    document.getElementById("logoUploadText").textContent = "Klik untuk upload logo";
    document.getElementById("logoSize").value = 70;
    document.getElementById("textSize").value = 22;
    document.getElementById("customColor").value = "#0D1B2E";
    document.querySelectorAll(".swatch").forEach((s,i) => s.classList.toggle("selected", i===0));
    document.querySelectorAll(".pos-cell").forEach((c,i) => c.classList.toggle("selected", i===4));
    document.querySelectorAll(".prod-opt").forEach((o,i) => o.classList.toggle("selected", i===0));
    document.querySelectorAll(".font-opt").forEach((o,i) => o.classList.toggle("selected", i===0));
    state.product = "kemeja";
    draw();
  });

  document.getElementById("downloadBtn")?.addEventListener("click", () => {
    const link = document.createElement("a");
    link.download = "wattco-design-preview.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  });

  document.getElementById("studioOrderBtn")?.addEventListener("click", () => {
    const cfg = productConfigs[state.product];
    const msg = encodeURIComponent(
      `Halo WattCo! Saya ingin order:\n\n` +
      `Produk: ${cfg?.label || state.product}\n` +
      `Warna: ${state.color}\n` +
      `Teks: ${state.text1}${state.text2 ? " / " + state.text2 : ""}\n\n` +
      `Saya sudah preview desain di Design Studio. Mohon info lanjut ya!`
    );
    window.open(`https://wa.me/628157047507?text=${msg}`, "_blank");
  });
}

// =====================================================
// INIT
// =====================================================
document.addEventListener("DOMContentLoaded", () => {
  buildDesignStudio();
  if (window.lucide) lucide.createIcons();
});
