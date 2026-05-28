/* ===================================================
   WattCo — SPA Navigation + Design Studio
   spa.js — tambahkan setelah script.js di index.html
   =================================================== */

// =====================================================
// SPA — PAGE SYSTEM
// Ubah web jadi multi-page dengan fade+slide transition
// =====================================================

const pages = {
  home:      { label: "Home",         icon: "home" },
  products:  { label: "Produk",       icon: "layers" },
  studio:    { label: "Design Studio",icon: "palette" },
  portfolio: { label: "Portfolio",    icon: "image" },
  order:     { label: "Order",        icon: "file-text" },
  about:     { label: "About",        icon: "info" },
  faq:       { label: "FAQ",          icon: "help-circle" },
  contact:   { label: "Kontak",       icon: "phone" },
};

let currentPage = "home";
let isTransitioning = false;

// Inject SPA styles
(function injectSPAStyles() {
  const s = document.createElement("style");
  s.textContent = `
    /* ---- Page wrapper ---- */
    .spa-page {
      position: fixed; inset: 0;
      overflow-y: auto; overflow-x: hidden;
      z-index: 0;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.5s cubic-bezier(.4,0,.2,1),
                  transform 0.5s cubic-bezier(.4,0,.2,1);
    }
    .spa-page.active {
      opacity: 1;
      pointer-events: all;
      transform: none !important;
      z-index: 1;
    }
    .spa-page.exit-left  { transform: translateX(-60px); opacity: 0 !important; }
    .spa-page.exit-right { transform: translateX(60px);  opacity: 0 !important; }
    .spa-page.enter-left  { transform: translateX(60px); }
    .spa-page.enter-right { transform: translateX(-60px); }

    /* ---- Navbar SPA links ---- */
    .nav-links a.spa-link { cursor: none; }
    .nav-links a.spa-link.active {
      color: var(--accent);
      background: var(--accent-dim);
    }

    /* ---- Page transition overlay ---- */
    .page-flash {
      position: fixed; inset: 0;
      background: var(--accent);
      z-index: 5000;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.15s ease;
    }
    .page-flash.flash { opacity: 0.06; }

    /* ---- Studio page styles ---- */
    #page-studio {
      background: var(--bg-primary);
      padding-top: var(--nav-h);
    }
    .studio-wrap {
      max-width: 1200px; margin: 0 auto;
      padding: 3rem 2rem;
    }
    .studio-grid {
      display: grid;
      grid-template-columns: 340px 1fr;
      gap: 2rem;
      align-items: start;
      margin-top: 2.5rem;
    }
    .studio-controls {
      display: flex; flex-direction: column; gap: 1.25rem;
    }
    .studio-panel {
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      padding: 1.25rem;
    }
    .studio-panel h4 {
      font-family: var(--font-display);
      font-size: 0.9rem; font-weight: 700;
      letter-spacing: 0.08em;
      margin-bottom: 1rem;
      color: var(--accent);
      text-transform: uppercase;
      display: flex; align-items: center; gap: 8px;
    }

    /* Product selector */
    .product-selector {
      display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px;
    }
    .prod-opt {
      aspect-ratio: 1;
      border: 1px solid var(--border);
      border-radius: var(--radius);
      display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      gap: 4px; cursor: none;
      transition: all var(--transition);
      background: var(--bg-secondary);
      font-size: 0.7rem; color: var(--text-secondary);
      padding: 8px 4px;
    }
    .prod-opt .prod-emoji { font-size: 1.5rem; }
    .prod-opt:hover { border-color: var(--accent); color: var(--accent); }
    .prod-opt.selected {
      border-color: var(--accent);
      background: var(--accent-dim);
      color: var(--accent);
    }

    /* Color swatches */
    .color-swatches {
      display: flex; gap: 8px; flex-wrap: wrap;
    }
    .swatch {
      width: 30px; height: 30px;
      border-radius: 50%;
      cursor: none;
      border: 2px solid transparent;
      transition: all var(--transition);
      flex-shrink: 0;
    }
    .swatch:hover { transform: scale(1.15); }
    .swatch.selected {
      border-color: var(--accent);
      box-shadow: 0 0 0 3px var(--accent-dim);
    }

    /* Text input */
    .studio-input {
      width: 100%;
      background: var(--bg-secondary);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 10px 12px;
      color: var(--text-primary);
      font-size: 0.85rem;
      outline: none;
      transition: border-color var(--transition);
      font-family: var(--font-body);
      margin-bottom: 8px;
    }
    .studio-input:focus { border-color: var(--accent); }

    /* Font selector */
    .font-opts { display: flex; gap: 8px; flex-wrap: wrap; }
    .font-opt {
      padding: 6px 12px;
      border: 1px solid var(--border);
      border-radius: 6px;
      font-size: 0.8rem;
      cursor: none;
      background: var(--bg-secondary);
      color: var(--text-secondary);
      transition: all var(--transition);
    }
    .font-opt:hover { border-color: var(--accent); color: var(--accent); }
    .font-opt.selected { background: var(--accent-dim); border-color: var(--accent); color: var(--accent); }

    /* Text color */
    .text-color-row { display: flex; gap: 8px; align-items: center; margin-top: 8px; }
    .text-color-row label { font-size: 0.78rem; color: var(--text-secondary); }

    /* Logo upload */
    .logo-upload-area {
      border: 2px dashed var(--border);
      border-radius: var(--radius);
      padding: 1.5rem;
      text-align: center;
      cursor: none;
      transition: all var(--transition);
      position: relative;
    }
    .logo-upload-area:hover { border-color: var(--accent); background: var(--accent-dim); }
    .logo-upload-area input { position: absolute; inset: 0; opacity: 0; cursor: none; width: 100%; height: 100%; }
    .logo-upload-area p { font-size: 0.8rem; color: var(--text-muted); margin-top: 6px; }

    /* Position grid */
    .pos-grid {
      display: grid; grid-template-columns: repeat(3, 1fr); gap: 4px;
      width: 120px;
    }
    .pos-cell {
      aspect-ratio: 1;
      border: 1px solid var(--border);
      border-radius: 4px;
      cursor: none;
      background: var(--bg-secondary);
      transition: all var(--transition);
    }
    .pos-cell:hover { border-color: var(--accent); background: var(--accent-dim); }
    .pos-cell.selected { background: var(--accent); border-color: var(--accent); }

    /* Range slider */
    .studio-range { width: 100%; accent-color: var(--accent); }

    /* Canvas area */
    .studio-canvas-wrap {
      position: sticky; top: calc(var(--nav-h) + 1rem);
    }
    .studio-canvas-header {
      display: flex; align-items: center; justify-content: space-between;
      margin-bottom: 1rem;
    }
    .studio-canvas-header h3 {
      font-family: var(--font-display); font-size: 1.1rem; font-weight: 700;
    }
    .canvas-actions { display: flex; gap: 8px; }
    .canvas-btn {
      padding: 8px 16px;
      border-radius: var(--radius);
      font-size: 0.8rem; font-weight: 600;
      border: 1px solid var(--border);
      background: var(--bg-card);
      color: var(--text-secondary);
      cursor: none;
      transition: all var(--transition);
      font-family: var(--font-display);
    }
    .canvas-btn:hover { border-color: var(--accent); color: var(--accent); }
    .canvas-btn.primary {
      background: var(--gradient); color: #000; border: none;
    }
    .canvas-btn.primary:hover { transform: translateY(-2px); box-shadow: var(--shadow-accent); }

    #studioCanvas {
      width: 100%;
      border-radius: var(--radius-lg);
      border: 1px solid var(--border);
      background: var(--bg-card);
      display: block;
    }

    /* Studio action bar */
    .studio-order-bar {
      margin-top: 1.5rem;
      padding: 1.25rem 1.5rem;
      background: var(--accent-dim);
      border: 1px solid var(--border-hover);
      border-radius: var(--radius-lg);
      display: flex; align-items: center; justify-content: space-between;
      gap: 1rem;
      flex-wrap: wrap;
    }
    .studio-order-bar p { font-size: 0.88rem; color: var(--text-secondary); }
    .studio-order-bar strong { color: var(--accent); }

    /* Responsive studio */
    @media (max-width: 900px) {
      .studio-grid { grid-template-columns: 1fr; }
      .studio-canvas-wrap { position: relative; top: 0; }
    }
  `;
  document.head.appendChild(s);
})();

// =====================================================
// BUILD SPA STRUCTURE
// Wrap semua section jadi pages
// =====================================================
function buildSPA() {
  // Flash overlay
  const flash = document.createElement("div");
  flash.className = "page-flash";
  flash.id = "pageFlash";
  document.body.appendChild(flash);

  // Sections yang sudah ada → jadikan pages
  const sectionIds = ["home","products","portfolio","order","about","faq","contact"];

  sectionIds.forEach(id => {
    const section = document.getElementById(id);
    if (!section) return;

    const pageDiv = document.createElement("div");
    pageDiv.id = `page-${id}`;
    pageDiv.className = `spa-page ${id === "home" ? "active" : ""}`;
    pageDiv.style.cssText = `
      background: var(--bg-primary);
      padding-top: ${id === "home" ? "0" : "var(--nav-h)"};
      min-height: 100vh;
    `;

    // Pindahkan section ke dalam page div
    section.parentNode.insertBefore(pageDiv, section);
    pageDiv.appendChild(section);

    // Untuk non-home, section tidak perlu padding top sendiri
    if (id !== "home") {
      section.style.paddingTop = "2rem";
    }
  });

  // Sembunyikan marquee & masukkan ke home page
  const marquee = document.querySelector(".marquee-wrap");
  if (marquee) {
    const homePage = document.getElementById("page-home");
    if (homePage) homePage.appendChild(marquee);
  }

  // Buat Studio Page
  buildStudioPage();

  // Update navbar links
  updateNavLinks();
}

// =====================================================
// UPDATE NAVBAR → SPA links
// =====================================================
function updateNavLinks() {
  const navLinks = document.getElementById("navLinks");
  if (!navLinks) return;

  navLinks.innerHTML = `
    <li><a href="#" class="spa-link active" data-page="home">Home</a></li>
    <li><a href="#" class="spa-link" data-page="products">Produk</a></li>
    <li><a href="#" class="spa-link studio-nav-link" data-page="studio">
      <span style="color:var(--accent)">⚡</span> Design Studio
    </a></li>
    <li><a href="#" class="spa-link" data-page="portfolio">Portfolio</a></li>
    <li><a href="#" class="spa-link" data-page="order">Custom Order</a></li>
    <li><a href="#" class="spa-link" data-page="about">About</a></li>
    <li><a href="#" class="spa-link" data-page="faq">FAQ</a></li>
    <li><a href="#" class="spa-link" data-page="contact">Kontak</a></li>
  `;

  navLinks.querySelectorAll(".spa-link").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = link.dataset.page;
      if (target !== currentPage) navigateTo(target);

      // Close mobile menu
      document.getElementById("hamburger")?.classList.remove("open");
      navLinks.classList.remove("mobile-open");
      document.body.classList.remove("menu-open");
    });
  });

  // Update footer links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    const href = a.getAttribute("href");
    if (href && href.length > 1) {
      const id = href.slice(1);
      if (pages[id]) {
        a.href = "#";
        a.addEventListener("click", (e) => {
          e.preventDefault();
          navigateTo(id);
        });
      }
    }
  });
}

// =====================================================
// NAVIGATE BETWEEN PAGES
// =====================================================
function navigateTo(targetId, direction = "auto") {
  if (isTransitioning || targetId === currentPage) return;
  isTransitioning = true;

  const pageOrder = ["home","products","studio","portfolio","order","about","faq","contact"];
  const fromIdx = pageOrder.indexOf(currentPage);
  const toIdx = pageOrder.indexOf(targetId);
  const dir = direction === "auto" ? (toIdx > fromIdx ? "left" : "right") : direction;

  const fromPage = document.getElementById(`page-${currentPage}`);
  const toPage = document.getElementById(`page-${targetId}`);
  if (!fromPage || !toPage) { isTransitioning = false; return; }

  // Flash
  const flash = document.getElementById("pageFlash");
  if (flash) {
    flash.classList.add("flash");
    setTimeout(() => flash.classList.remove("flash"), 150);
  }

  // Prepare incoming page
  toPage.classList.add(dir === "left" ? "enter-left" : "enter-right");
  toPage.style.opacity = "0";
  toPage.style.pointerEvents = "none";

  // Scroll incoming to top
  toPage.scrollTop = 0;

  requestAnimationFrame(() => {
    // Exit current
    fromPage.classList.add(dir === "left" ? "exit-left" : "exit-right");
    fromPage.classList.remove("active");

    // Small delay then enter
    setTimeout(() => {
      toPage.classList.remove("enter-left", "enter-right");
      toPage.classList.add("active");

      // Update nav
      document.querySelectorAll(".spa-link").forEach(l => {
        l.classList.toggle("active", l.dataset.page === targetId);
      });

      currentPage = targetId;

      setTimeout(() => {
        fromPage.classList.remove("exit-left", "exit-right");
        fromPage.style.opacity = "";
        isTransitioning = false;

        // Re-trigger animations on new page
        document.querySelectorAll(`#page-${targetId} .fade-in`).forEach(el => {
          el.classList.remove("visible");
          setTimeout(() => el.classList.add("visible"), 100);
        });
        if (window.lucide) lucide.createIcons();
      }, 520);
    }, 60);
  });
}

// Expose globally
window.navigateTo = navigateTo;

// =====================================================
// BUILD DESIGN STUDIO PAGE
// =====================================================
function buildStudioPage() {
  const studioPage = document.createElement("div");
  studioPage.id = "page-studio";
  studioPage.className = "spa-page";

  studioPage.innerHTML = `
    <div class="studio-wrap">
      <div class="section-header">
        <div class="section-tag">— Design Studio</div>
        <h2>Rancang <span class="accent">Desainmu</span></h2>
        <p>Pilih produk, atur warna, tambahkan logo & teks — preview langsung di sini</p>
      </div>

      <div class="studio-grid">
        <!-- CONTROLS -->
        <div class="studio-controls">

          <!-- 1. Pilih Produk -->
          <div class="studio-panel">
            <h4><i data-lucide="layers" style="width:14px;height:14px"></i> Pilih Produk</h4>
            <div class="product-selector" id="prodSelector">
              <div class="prod-opt selected" data-prod="kemeja">
                <span class="prod-emoji">👕</span>
                <span>PDH / Kemeja</span>
              </div>
              <div class="prod-opt" data-prod="kaos">
                <span class="prod-emoji">👔</span>
                <span>Kaos</span>
              </div>
              <div class="prod-opt" data-prod="jaket">
                <span class="prod-emoji">🧥</span>
                <span>Jaket</span>
              </div>
              <div class="prod-opt" data-prod="hoodie">
                <span class="prod-emoji">🫧</span>
                <span>Hoodie</span>
              </div>
              <div class="prod-opt" data-prod="totebag">
                <span class="prod-emoji">👜</span>
                <span>Tote Bag</span>
              </div>
              <div class="prod-opt" data-prod="pin">
                <span class="prod-emoji">📌</span>
                <span>Pin</span>
              </div>
            </div>
          </div>

          <!-- 2. Warna Produk -->
          <div class="studio-panel">
            <h4><i data-lucide="droplet" style="width:14px;height:14px"></i> Warna Produk</h4>
            <div class="color-swatches" id="colorSwatches">
              <div class="swatch selected" data-color="#0a1628" style="background:#0a1628" title="Navy"></div>
              <div class="swatch" data-color="#1a1a2e" style="background:#1a1a2e" title="Dark Navy"></div>
              <div class="swatch" data-color="#2c2c2c" style="background:#2c2c2c" title="Charcoal"></div>
              <div class="swatch" data-color="#ffffff" style="background:#ffffff;border:1px solid #ddd" title="White"></div>
              <div class="swatch" data-color="#c8102e" style="background:#c8102e" title="Red"></div>
              <div class="swatch" data-color="#00529b" style="background:#00529b" title="Blue"></div>
              <div class="swatch" data-color="#008751" style="background:#008751" title="Green"></div>
              <div class="swatch" data-color="#f5a623" style="background:#f5a623" title="Gold"></div>
              <div class="swatch" data-color="#6a0dad" style="background:#6a0dad" title="Purple"></div>
              <div class="swatch" data-color="#808080" style="background:#808080" title="Grey"></div>
            </div>
            <div style="margin-top:10px;display:flex;align-items:center;gap:8px">
              <label style="font-size:0.78rem;color:var(--text-secondary)">Custom:</label>
              <input type="color" id="customColor" value="#0a1628"
                style="width:36px;height:28px;border:1px solid var(--border);border-radius:6px;background:none;cursor:none;padding:2px" />
            </div>
          </div>

          <!-- 3. Logo -->
          <div class="studio-panel">
            <h4><i data-lucide="image" style="width:14px;height:14px"></i> Logo / Gambar</h4>
            <div class="logo-upload-area" id="logoUpload">
              <input type="file" id="logoFile" accept="image/*" />
              <i data-lucide="upload-cloud" style="width:28px;height:28px;color:var(--text-muted)"></i>
              <p id="logoUploadText">Klik untuk upload logo</p>
            </div>
            <div style="margin-top:10px">
              <label style="font-size:0.78rem;color:var(--text-secondary);display:block;margin-bottom:6px">
                Ukuran logo: <span id="logoSizeVal">60</span>px
              </label>
              <input type="range" class="studio-range" id="logoSize" min="20" max="150" value="60" />
            </div>
          </div>

          <!-- 4. Teks -->
          <div class="studio-panel">
            <h4><i data-lucide="type" style="width:14px;height:14px"></i> Teks Custom</h4>
            <input type="text" class="studio-input" id="textLine1" placeholder="Baris 1 — contoh: HMTE UNPAD" maxlength="25" />
            <input type="text" class="studio-input" id="textLine2" placeholder="Baris 2 — contoh: 2023" maxlength="25" />
            <div class="font-opts" id="fontOpts">
              <div class="font-opt selected" data-font="Rajdhani" style="font-family:sans-serif">BOLD</div>
              <div class="font-opt" data-font="serif" style="font-family:serif">Serif</div>
              <div class="font-opt" data-font="monospace" style="font-family:monospace">MONO</div>
              <div class="font-opt" data-font="cursive" style="font-family:cursive">Script</div>
            </div>
            <div class="text-color-row">
              <label>Warna teks:</label>
              <input type="color" id="textColor" value="#ffffff"
                style="width:36px;height:28px;border:1px solid var(--border);border-radius:6px;background:none;cursor:none;padding:2px" />
              <label style="margin-left:8px">Ukuran: <span id="textSizeVal">18</span>px</label>
              <input type="range" class="studio-range" id="textSize" min="10" max="36" value="18" style="width:80px" />
            </div>
          </div>

          <!-- 5. Posisi Desain -->
          <div class="studio-panel">
            <h4><i data-lucide="move" style="width:14px;height:14px"></i> Posisi Desain</h4>
            <p style="font-size:0.78rem;color:var(--text-secondary);margin-bottom:10px">Klik kotak untuk atur posisi logo & teks</p>
            <div class="pos-grid" id="posGrid">
              ${[0,1,2,3,4,5,6,7,8].map(i =>
                `<div class="pos-cell ${i===4?'selected':''}" data-pos="${i}"></div>`
              ).join("")}
            </div>
          </div>

        </div>

        <!-- CANVAS PREVIEW -->
        <div class="studio-canvas-wrap">
          <div class="studio-canvas-header">
            <h3>Live <span class="accent">Preview</span></h3>
            <div class="canvas-actions">
              <button class="canvas-btn" id="resetBtn">Reset</button>
              <button class="canvas-btn" id="downloadBtn">⬇ Download PNG</button>
              <button class="canvas-btn primary" id="studioOrderBtn">
                ⚡ Order Sekarang
              </button>
            </div>
          </div>
          <canvas id="studioCanvas" width="540" height="620"></canvas>

          <div class="studio-order-bar">
            <div>
              <p>Desain sudah siap? Klik <strong>Order Sekarang</strong> untuk kirim ke WhatsApp kami.</p>
              <p style="font-size:0.78rem;margin-top:4px">Tim WattCo akan membantu finalisasi desain kamu ⚡</p>
            </div>
            <a href="https://wa.me/628157047507" target="_blank" class="btn-primary" style="font-size:0.85rem;padding:10px 20px;white-space:nowrap">
              <i data-lucide="message-circle"></i> Chat WA
            </a>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(studioPage);
  setTimeout(() => {
    initStudio();
    if (window.lucide) lucide.createIcons();
  }, 300);
}

// =====================================================
// DESIGN STUDIO LOGIC
// =====================================================
function initStudio() {
  const canvas = document.getElementById("studioCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  // State
  const state = {
    product: "kemeja",
    color: "#0a1628",
    logo: null,
    logoSize: 60,
    text1: "",
    text2: "",
    font: "Rajdhani, sans-serif",
    textColor: "#ffffff",
    textSize: 18,
    position: 4, // center
  };

  // Product shapes
  const productShapes = {
    kemeja:  { label: "PDH / Kemeja",  emoji: "👕" },
    kaos:    { label: "Kaos",          emoji: "👔" },
    jaket:   { label: "Jaket",         emoji: "🧥" },
    hoodie:  { label: "Hoodie",        emoji: "🫧" },
    totebag: { label: "Tote Bag",      emoji: "👜" },
    pin:     { label: "Pin Enamel",    emoji: "📌" },
  };

  // Draw canvas
  function draw() {
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    // Background
    ctx.fillStyle = "#0d1526";
    ctx.roundRect(0, 0, W, H, 16);
    ctx.fill();

    // Draw product silhouette
    drawProduct(ctx, state, W, H);

    // Draw design elements at position
    drawDesign(ctx, state, W, H);

    // Watermark
    ctx.font = "11px monospace";
    ctx.fillStyle = "rgba(255,255,255,0.15)";
    ctx.textAlign = "right";
    ctx.fillText("WattCo Design Studio", W - 12, H - 10);
  }

  function drawProduct(ctx, state, W, H) {
    const cx = W / 2, cy = H / 2;
    const color = state.color;
    const prod = state.product;

    ctx.save();

    if (prod === "pin") {
      // Circle pin
      ctx.beginPath();
      ctx.arc(cx, cy, 110, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.2)";
      ctx.lineWidth = 3;
      ctx.stroke();
      // pin edge
      ctx.beginPath();
      ctx.arc(cx, cy, 105, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255,255,255,0.08)";
      ctx.lineWidth = 6;
      ctx.stroke();
    } else if (prod === "totebag") {
      // Tote bag shape
      const bx = cx - 110, by = cy - 120, bw = 220, bh = 260;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.roundRect(bx, by + 40, bw, bh, [0, 0, 16, 16]);
      ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.15)";
      ctx.lineWidth = 1.5;
      ctx.stroke();
      // handles
      ctx.strokeStyle = color;
      ctx.lineWidth = 10;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(cx - 50, by + 40);
      ctx.quadraticCurveTo(cx - 50, by, cx - 20, by);
      ctx.quadraticCurveTo(cx, by - 10, cx + 20, by);
      ctx.quadraticCurveTo(cx + 50, by, cx + 50, by + 40);
      ctx.stroke();
    } else {
      // Shirt/jacket shape
      drawShirt(ctx, cx, cy, color, prod);
    }

    ctx.restore();
  }

  function drawShirt(ctx, cx, cy, color, type) {
    const W2 = 220, H2 = type === "hoodie" || type === "jaket" ? 280 : 250;
    const x = cx - W2/2, y = cy - H2/2 + 20;

    ctx.fillStyle = color;
    ctx.beginPath();

    if (type === "hoodie") {
      // Hoodie with hood
      ctx.moveTo(x + 60, y);
      ctx.quadraticCurveTo(cx, y - 30, x + W2 - 60, y);
      ctx.lineTo(x + W2, y + 70);
      ctx.lineTo(x + W2 + 40, y + 60);
      ctx.lineTo(x + W2 + 45, y + 180);
      ctx.lineTo(x + W2, y + 180);
      ctx.lineTo(x + W2, y + H2);
      ctx.lineTo(x, y + H2);
      ctx.lineTo(x, y + 180);
      ctx.lineTo(x - 45, y + 180);
      ctx.lineTo(x - 40, y + 60);
      ctx.lineTo(x, y + 70);
      ctx.closePath();
    } else {
      // Regular shirt/jacket/kaos
      ctx.moveTo(x + 55, y);
      ctx.lineTo(x + 20, y + 20);
      ctx.lineTo(x, y + 80);
      ctx.lineTo(x - 40, y + 70);
      ctx.lineTo(x - 45, y + 180);
      ctx.lineTo(x, y + 180);
      ctx.lineTo(x, y + H2);
      ctx.lineTo(x + W2, y + H2);
      ctx.lineTo(x + W2, y + 180);
      ctx.lineTo(x + W2 + 45, y + 180);
      ctx.lineTo(x + W2 + 40, y + 70);
      ctx.lineTo(x + W2, y + 80);
      ctx.lineTo(x + W2 - 20, y + 20);
      ctx.lineTo(x + W2 - 55, y);
      // collar
      ctx.quadraticCurveTo(cx, y + 50, x + 55, y);
      ctx.closePath();
    }

    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,0.12)";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Collar detail
    if (type === "kemeja") {
      ctx.fillStyle = "rgba(0,0,0,0.15)";
      ctx.beginPath();
      ctx.moveTo(cx - 25, y + 5);
      ctx.lineTo(cx, y + 45);
      ctx.lineTo(cx + 25, y + 5);
      ctx.lineTo(cx + 12, y + 2);
      ctx.quadraticCurveTo(cx, y + 30, cx - 12, y + 2);
      ctx.closePath();
      ctx.fill();
      // buttons
      ctx.fillStyle = "rgba(255,255,255,0.2)";
      [70, 100, 130, 160].forEach(offset => {
        ctx.beginPath();
        ctx.arc(cx, y + offset, 4, 0, Math.PI * 2);
        ctx.fill();
      });
    }
  }

  function getDesignPosition(pos, W, H) {
    const positions = [
      { x: W*0.3, y: H*0.28 }, { x: W*0.5, y: H*0.28 }, { x: W*0.7, y: H*0.28 },
      { x: W*0.3, y: H*0.5  }, { x: W*0.5, y: H*0.5  }, { x: W*0.7, y: H*0.5  },
      { x: W*0.3, y: H*0.72 }, { x: W*0.5, y: H*0.72 }, { x: W*0.7, y: H*0.72 },
    ];
    return positions[pos] || positions[4];
  }

  function drawDesign(ctx, state, W, H) {
    const pos = getDesignPosition(state.position, W, H);
    let offsetY = pos.y;

    ctx.save();
    ctx.textAlign = "center";

    // Draw logo
    if (state.logo) {
      const s = state.logoSize;
      ctx.drawImage(state.logo, pos.x - s/2, offsetY - s/2, s, s);
      offsetY += s/2 + 10;
    }

    // Draw text
    if (state.text1 || state.text2) {
      ctx.fillStyle = state.textColor;
      ctx.font = `bold ${state.textSize}px ${state.font}`;
      ctx.shadowColor = "rgba(0,0,0,0.5)";
      ctx.shadowBlur = 4;

      if (state.text1) {
        ctx.fillText(state.text1, pos.x, offsetY + (state.logo ? 0 : -state.textSize/2));
        offsetY += state.textSize + 6;
      }
      if (state.text2) {
        ctx.font = `${Math.round(state.textSize * 0.8)}px ${state.font}`;
        ctx.fillStyle = state.textColor + "cc";
        ctx.fillText(state.text2, pos.x, offsetY + (state.logo ? 0 : state.textSize/4));
      }
      ctx.shadowBlur = 0;
    }

    // Placeholder if nothing added yet
    if (!state.logo && !state.text1 && !state.text2) {
      ctx.strokeStyle = "rgba(0,212,255,0.2)";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([5, 5]);
      ctx.strokeRect(pos.x - 60, pos.y - 40, 120, 80);
      ctx.setLineDash([]);
      ctx.fillStyle = "rgba(0,212,255,0.4)";
      ctx.font = "12px monospace";
      ctx.fillText("+ Tambah Desain", pos.x, pos.y + 5);
    }

    ctx.restore();
  }

  // Initial draw
  draw();

  // ── Event listeners ──

  // Product selector
  document.querySelectorAll(".prod-opt").forEach(opt => {
    opt.addEventListener("click", () => {
      document.querySelectorAll(".prod-opt").forEach(o => o.classList.remove("selected"));
      opt.classList.add("selected");
      state.product = opt.dataset.prod;
      draw();
    });
  });

  // Color swatches
  document.querySelectorAll(".swatch").forEach(sw => {
    sw.addEventListener("click", () => {
      document.querySelectorAll(".swatch").forEach(s => s.classList.remove("selected"));
      sw.classList.add("selected");
      state.color = sw.dataset.color;
      document.getElementById("customColor").value = state.color;
      draw();
    });
  });

  document.getElementById("customColor").addEventListener("input", e => {
    state.color = e.target.value;
    document.querySelectorAll(".swatch").forEach(s => s.classList.remove("selected"));
    draw();
  });

  // Logo upload
  document.getElementById("logoFile").addEventListener("change", e => {
    const file = e.target.files[0];
    if (!file) return;
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      state.logo = img;
      document.getElementById("logoUploadText").textContent = "✓ " + file.name;
      draw();
    };
    img.src = url;
  });

  document.getElementById("logoSize").addEventListener("input", e => {
    state.logoSize = parseInt(e.target.value);
    document.getElementById("logoSizeVal").textContent = state.logoSize;
    draw();
  });

  // Text inputs
  ["textLine1", "textLine2"].forEach(id => {
    document.getElementById(id).addEventListener("input", e => {
      if (id === "textLine1") state.text1 = e.target.value;
      else state.text2 = e.target.value;
      draw();
    });
  });

  // Font options
  document.querySelectorAll(".font-opt").forEach(opt => {
    opt.addEventListener("click", () => {
      document.querySelectorAll(".font-opt").forEach(o => o.classList.remove("selected"));
      opt.classList.add("selected");
      state.font = opt.dataset.font;
      draw();
    });
  });

  document.getElementById("textColor").addEventListener("input", e => {
    state.textColor = e.target.value;
    draw();
  });

  document.getElementById("textSize").addEventListener("input", e => {
    state.textSize = parseInt(e.target.value);
    document.getElementById("textSizeVal").textContent = state.textSize;
    draw();
  });

  // Position grid
  document.querySelectorAll(".pos-cell").forEach(cell => {
    cell.addEventListener("click", () => {
      document.querySelectorAll(".pos-cell").forEach(c => c.classList.remove("selected"));
      cell.classList.add("selected");
      state.position = parseInt(cell.dataset.pos);
      draw();
    });
  });

  // Reset
  document.getElementById("resetBtn").addEventListener("click", () => {
    state.logo = null;
    state.text1 = ""; state.text2 = "";
    state.color = "#0a1628"; state.position = 4;
    state.logoSize = 60; state.textSize = 18;
    document.getElementById("textLine1").value = "";
    document.getElementById("textLine2").value = "";
    document.getElementById("logoUploadText").textContent = "Klik untuk upload logo";
    document.getElementById("logoSize").value = 60;
    document.getElementById("textSize").value = 18;
    document.querySelectorAll(".swatch").forEach((s,i) => s.classList.toggle("selected", i===0));
    document.querySelectorAll(".pos-cell").forEach((c,i) => c.classList.toggle("selected", i===4));
    state.color = "#0a1628";
    draw();
  });

  // Download
  document.getElementById("downloadBtn").addEventListener("click", () => {
    const link = document.createElement("a");
    link.download = "wattco-design-preview.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  });

  // Order via WA
  document.getElementById("studioOrderBtn").addEventListener("click", () => {
    const prod = productShapes[state.product]?.label || state.product;
    const msg = encodeURIComponent(
      `Halo WattCo! Saya ingin order:\n\n` +
      `Produk: ${prod}\n` +
      `Warna: ${state.color}\n` +
      `Teks: ${state.text1}${state.text2 ? " / " + state.text2 : ""}\n\n` +
      `Saya sudah preview desain di Design Studio. Mohon info lanjut ya!`
    );
    window.open(`https://wa.me/628157047507?text=${msg}`, "_blank");
  });
}

// =====================================================
// KEYBOARD NAVIGATION
// =====================================================
function initKeyboardNav() {
  const pageOrder = ["home","products","studio","portfolio","order","about","faq","contact"];

  document.addEventListener("keydown", (e) => {
    if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;

    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      const idx = pageOrder.indexOf(currentPage);
      if (idx < pageOrder.length - 1) navigateTo(pageOrder[idx + 1], "left");
    }
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      const idx = pageOrder.indexOf(currentPage);
      if (idx > 0) navigateTo(pageOrder[idx - 1], "right");
    }
  });
}

// =====================================================
// PAGE INDICATOR DOTS
// =====================================================
function initPageDots() {
  const pageOrder = ["home","products","studio","portfolio","order","about","faq","contact"];

  const dots = document.createElement("div");
  dots.style.cssText = `
    position: fixed; right: 1.5rem; top: 50%;
    transform: translateY(-50%);
    display: flex; flex-direction: column; gap: 8px;
    z-index: 900;
  `;

  const style = document.createElement("style");
  style.textContent = `
    .page-dot {
      width: 6px; height: 6px; border-radius: 50%;
      background: var(--text-muted); cursor: none;
      transition: all 0.3s ease;
      border: 1px solid transparent;
    }
    .page-dot:hover { background: var(--accent); transform: scale(1.3); }
    .page-dot.active {
      background: var(--accent);
      height: 18px; border-radius: 3px;
      box-shadow: 0 0 6px var(--accent-glow);
    }
    @media (max-width: 768px) { .page-dots-wrap { display: none; } }
  `;
  document.head.appendChild(style);
  dots.className = "page-dots-wrap";

  pageOrder.forEach(id => {
    const dot = document.createElement("div");
    dot.className = `page-dot ${id === "home" ? "active" : ""}`;
    dot.title = pages[id]?.label || id;
    dot.addEventListener("click", () => navigateTo(id));
    dot.dataset.page = id;
    dots.appendChild(dot);
  });

  document.body.appendChild(dots);

  // Update dots on navigate
  const origNavigate = window.navigateTo;
  window.navigateTo = function(targetId, dir) {
    origNavigate(targetId, dir);
    setTimeout(() => {
      document.querySelectorAll(".page-dot").forEach(d => {
        d.classList.toggle("active", d.dataset.page === targetId);
      });
    }, 100);
  };
}

// =====================================================
// INIT ALL
// =====================================================
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    buildSPA();
    initKeyboardNav();
    initPageDots();
    if (window.lucide) lucide.createIcons();
    console.log("WattCo SPA + Design Studio ready ⚡");
  }, 1800); // tunggu loader selesai
});

// =====================================================
// PAGE NUMBER INDICATOR + KEYBOARD HINT
// =====================================================
function initPageIndicator() {
  const pageOrder = ["home","products","studio","portfolio","order","about","faq","contact"];

  // Page number
  const indicator = document.createElement("div");
  indicator.className = "page-num-indicator";
  indicator.id = "pageNumIndicator";
  document.body.appendChild(indicator);

  // Keyboard hint
  const hint = document.createElement("div");
  hint.className = "kb-hint";
  hint.innerHTML = `<kbd>←</kbd><kbd>→</kbd> navigasi halaman`;
  document.body.appendChild(hint);

  function updateIndicator(pageId) {
    const idx = pageOrder.indexOf(pageId);
    indicator.textContent = `0${idx + 1} / 0${pageOrder.length}`;
  }

  updateIndicator("home");

  // Hook into navigateTo
  const _orig = window.navigateTo;
  window.navigateTo = function(targetId, dir) {
    _orig(targetId, dir);
    setTimeout(() => updateIndicator(targetId), 100);
  };

  // Hide hint after 5s
  setTimeout(() => { hint.style.opacity = "0"; }, 5000);
}

// =====================================================
// SWIPE NAVIGATION (mobile)
// =====================================================
function initSwipeNav() {
  const pageOrder = ["home","products","studio","portfolio","order","about","faq","contact"];
  let touchStartX = 0, touchStartY = 0;

  document.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  document.addEventListener("touchend", (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = e.changedTouches[0].clientY - touchStartY;

    // Only horizontal swipe (dx > dy)
    if (Math.abs(dx) < 60 || Math.abs(dx) < Math.abs(dy)) return;

    const idx = pageOrder.indexOf(currentPage);
    if (dx < 0 && idx < pageOrder.length - 1) {
      navigateTo(pageOrder[idx + 1], "left");
    } else if (dx > 0 && idx > 0) {
      navigateTo(pageOrder[idx - 1], "right");
    }
  }, { passive: true });
}

// =====================================================
// FIX: body overflow + footer visibility
// =====================================================
function initSPABodyFix() {
  document.body.classList.add("spa-ready");

  // Move footer into contact page after SPA builds
  setTimeout(() => {
    const footer = document.querySelector("footer");
    const contactPage = document.getElementById("page-contact");
    if (footer && contactPage) {
      contactPage.appendChild(footer);
    }
    // back-to-top inside each page
    const btt = document.getElementById("backToTop");
    if (btt) document.body.appendChild(btt);
  }, 2200);
}

// =====================================================
// EXTEND DOMContentLoaded — init new features
// =====================================================
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    initPageIndicator();
    initSwipeNav();
    initSPABodyFix();
    if (window.lucide) lucide.createIcons();
  }, 2000);
});
