# WattCo — Power Wear 🔵⚡
**Website Vendor Custom Merchandise**
Tugas Kuliah Komunikasi Multimedia

---

## 📁 Struktur File
```
wattco/
├── index.html      → Struktur HTML utama (semua halaman dalam 1 file)
├── style.css       → Styling lengkap (dark/light mode, responsive)
├── script.js       → JavaScript vanilla (logika, data, interaksi)
└── README.md       → Dokumentasi ini
```

---

## 🚀 Cara Menjalankan Lokal

### Cara 1 — Langsung buka di browser
1. Download semua file ke satu folder bernama `wattco`
2. Buka file `index.html` dengan browser (double-click)
3. Website langsung berjalan! ✅

### Cara 2 — Pakai Live Server (VS Code) [Direkomendasikan]
1. Install VS Code: https://code.visualstudio.com
2. Install ekstensi **Live Server** (klik Extensions → cari "Live Server")
3. Buka folder `wattco` di VS Code
4. Klik kanan `index.html` → **Open with Live Server**
5. Browser otomatis terbuka di `http://127.0.0.1:5500`

### Cara 3 — Python HTTP Server
```bash
# Masuk ke folder wattco
cd wattco

# Python 3
python -m http.server 8080

# Buka browser: http://localhost:8080
```

---

## 📤 Cara Upload ke GitHub

### Langkah 1 — Buat Akun & Repo GitHub
1. Daftar/login di https://github.com
2. Klik tombol **"+"** → **New repository**
3. Isi:
   - Repository name: `wattco-website`
   - Description: `WattCo — Power Wear | Vendor Custom Merchandise`
   - Pilih: **Public**
   - Centang: **Add a README file**
4. Klik **Create repository**

### Langkah 2 — Install Git
- Windows: https://git-scm.com/download/win
- Mac: sudah terinstall (cek dengan `git --version`)
- Linux: `sudo apt install git`

### Langkah 3 — Upload via Terminal/CMD
```bash
# 1. Masuk ke folder project
cd path/ke/folder/wattco

# 2. Inisialisasi git
git init

# 3. Set identity (sekali saja)
git config --global user.name "Nama Kamu"
git config --global user.email "email@kamu.com"

# 4. Tambahkan semua file
git add .

# 5. Commit pertama
git commit -m "Initial commit: WattCo website"

# 6. Ganti branch ke main
git branch -M main

# 7. Hubungkan ke GitHub (ganti USERNAME dengan username GitHub kamu)
git remote add origin https://github.com/USERNAME/wattco-website.git

# 8. Push ke GitHub
git push -u origin main
```

### Langkah 4 — Aktifkan GitHub Pages (Deploy Website)
1. Buka repo di GitHub
2. Klik **Settings** → **Pages** (di sidebar kiri)
3. Source: **Deploy from a branch**
4. Branch: **main** → folder: **/ (root)**
5. Klik **Save**
6. Tunggu 1-2 menit
7. Website live di: `https://USERNAME.github.io/wattco-website`

---

## ✨ Fitur Website

| Fitur | Status |
|-------|--------|
| Landing Page / Hero Section | ✅ |
| Katalog Produk | ✅ |
| Filter Produk (kategori) | ✅ |
| Keranjang Order | ✅ |
| Checkout via WhatsApp | ✅ |
| Form Custom Order | ✅ |
| Upload Desain (simulasi) | ✅ |
| Portfolio Karya | ✅ |
| About Us | ✅ |
| FAQ Accordion | ✅ |
| Halaman Kontak | ✅ |
| Dark / Light Mode | ✅ |
| Responsive Mobile | ✅ |
| Animasi Modern | ✅ |
| Custom Cursor | ✅ |
| Loader Screen | ✅ |
| Toast Notification | ✅ |
| Smooth Scroll | ✅ |

---

## 🎨 Brand Identity

- **Nama:** WattCo
- **Tagline:** Power Wear
- **Warna:** Hitam (#050810) + Biru Elektrik (#00d4ff)
- **Font:** Rajdhani (display) + Outfit (body)
- **Target:** HMTE Universitas Padjadjaran
- **WA:** +62 815-7047-507
- **IG:** @vvatt.co

---

## 📱 Kompatibilitas Browser
- Chrome 90+ ✅
- Firefox 88+ ✅
- Safari 14+ ✅
- Edge 90+ ✅
- Mobile (iOS & Android) ✅

---

*WattCo — Power Wear Your Identity ⚡*
