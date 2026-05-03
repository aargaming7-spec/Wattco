@echo off
:: =====================================================
:: WattCo — Git Setup Script (Windows)
:: Jalankan file ini di folder project wattco
:: =====================================================

echo.
echo  ██╗    ██╗ █████╗ ████████╗████████╗ ██████╗ ██████╗
echo  ██║    ██║██╔══██╗╚══██╔══╝╚══██╔══╝██╔════╝██╔═══██╗
echo  ██║ █╗ ██║███████║   ██║      ██║   ██║     ██║   ██║
echo  ██║███╗██║██╔══██║   ██║      ██║   ██║     ██║   ██║
echo  ╚███╔███╔╝██║  ██║   ██║      ██║   ╚██████╗╚██████╔╝
echo   ╚══╝╚══╝ ╚═╝  ╚═╝   ╚═╝      ╚═╝    ╚═════╝ ╚═════╝
echo.
echo  Power Wear — Git Setup Script
echo  =====================================================
echo.

:: --- Cek apakah Git sudah terinstall ---
git --version >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo  [ERROR] Git belum terinstall!
    echo  Download di: https://git-scm.com/download/win
    echo  Lalu jalankan ulang script ini.
    pause
    exit /b
)

echo  [OK] Git terdeteksi.
echo.

:: --- Input dari user ---
set /p GITHUB_USERNAME="  Masukkan username GitHub kamu: "
set /p REPO_NAME="  Nama repository (contoh: wattco-website): "
set /p GIT_NAME="  Nama lengkap kamu (untuk Git config): "
set /p GIT_EMAIL="  Email GitHub kamu: "

echo.
echo  =====================================================
echo  Memulai setup Git...
echo  =====================================================
echo.

:: --- Set Git identity ---
git config --global user.name "%GIT_NAME%"
git config --global user.email "%GIT_EMAIL%"
echo  [1/7] Git identity diset.

:: --- Init repo ---
git init
echo  [2/7] Git repository diinisialisasi.

:: --- Buat .gitignore ---
(
echo # OS files
echo .DS_Store
echo Thumbs.db
echo desktop.ini
echo.
echo # Editor
echo .vscode/
echo .idea/
echo *.suo
echo *.user
echo.
echo # Logs
echo *.log
echo npm-debug.log*
) > .gitignore
echo  [3/7] .gitignore dibuat.

:: --- Add semua file ---
git add .
echo  [4/7] Semua file ditambahkan ke staging.

:: --- Commit pertama ---
git commit -m "🚀 Initial commit: WattCo Power Wear website"
echo  [5/7] Commit pertama berhasil.

:: --- Set branch main ---
git branch -M main
echo  [6/7] Branch diset ke main.

:: --- Remote origin ---
git remote add origin https://github.com/%GITHUB_USERNAME%/%REPO_NAME%.git
echo  [7/7] Remote origin ditambahkan.

echo.
echo  =====================================================
echo  Setup lokal selesai!
echo  =====================================================
echo.
echo  Sekarang jalankan perintah berikut untuk push ke GitHub:
echo.
echo     git push -u origin main
echo.
echo  Jika diminta login, masukkan username dan Personal Access Token
echo  (bukan password biasa).
echo.
echo  Cara buat token: GitHub - Settings - Developer settings
echo  - Personal access tokens - Tokens (classic) - Generate new token
echo  Centang: repo (full control)
echo.
echo  Setelah push, aktifkan GitHub Pages di:
echo  Settings - Pages - Branch: main - Save
echo.
echo  Website akan live di:
echo  https://%GITHUB_USERNAME%.github.io/%REPO_NAME%
echo.
pause
