#!/bin/bash
# =====================================================
# WattCo — Git Setup Script (Mac/Linux)
# Jalankan: bash git-setup.sh
# =====================================================

# Warna terminal
RED='\033[0;31m'
GREEN='\033[0;32m'
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
WHITE='\033[1;37m'
NC='\033[0m' # No Color

clear

echo -e "${CYAN}"
echo "  ██╗    ██╗ █████╗ ████████╗████████╗ ██████╗  ██████╗"
echo "  ██║    ██║██╔══██╗╚══██╔══╝╚══██╔══╝██╔════╝ ██╔═══██╗"
echo "  ██║ █╗ ██║███████║   ██║      ██║   ██║      ██║   ██║"
echo "  ██║███╗██║██╔══██║   ██║      ██║   ██║      ██║   ██║"
echo "  ╚███╔███╔╝██║  ██║   ██║      ██║   ╚██████╗ ╚██████╔╝"
echo "   ╚══╝╚══╝ ╚═╝  ╚═╝   ╚═╝      ╚═╝    ╚═════╝  ╚═════╝"
echo -e "${NC}"
echo -e "${WHITE}  Power Wear — Git Setup Script (Mac/Linux)${NC}"
echo -e "${CYAN}  =====================================================${NC}"
echo ""

# --- Cek Git ---
if ! command -v git &> /dev/null; then
    echo -e "${RED}  [ERROR] Git belum terinstall!${NC}"
    echo "  Mac:   brew install git"
    echo "  Linux: sudo apt install git"
    exit 1
fi
echo -e "${GREEN}  [OK] Git terdeteksi: $(git --version)${NC}"
echo ""

# --- Input ---
read -p "  Username GitHub kamu: " GITHUB_USERNAME
read -p "  Nama repository (contoh: wattco-website): " REPO_NAME
read -p "  Nama lengkap kamu (Git config): " GIT_NAME
read -p "  Email GitHub kamu: " GIT_EMAIL

echo ""
echo -e "${CYAN}  =====================================================${NC}"
echo -e "${WHITE}  Memulai setup Git...${NC}"
echo -e "${CYAN}  =====================================================${NC}"
echo ""

# 1. Git config
git config --global user.name "$GIT_NAME"
git config --global user.email "$GIT_EMAIL"
echo -e "${GREEN}  [1/7] Git identity diset ✓${NC}"

# 2. Init
git init
echo -e "${GREEN}  [2/7] Repository diinisialisasi ✓${NC}"

# 3. .gitignore
cat > .gitignore << 'EOF'
# OS
.DS_Store
Thumbs.db
desktop.ini

# Editor
.vscode/
.idea/
*.suo
*.user

# Logs
*.log
npm-debug.log*
EOF
echo -e "${GREEN}  [3/7] .gitignore dibuat ✓${NC}"

# 4. Add
git add .
echo -e "${GREEN}  [4/7] File ditambahkan ke staging ✓${NC}"

# 5. Commit
git commit -m "🚀 Initial commit: WattCo Power Wear website"
echo -e "${GREEN}  [5/7] Commit pertama berhasil ✓${NC}"

# 6. Branch
git branch -M main
echo -e "${GREEN}  [6/7] Branch diset ke main ✓${NC}"

# 7. Remote
git remote add origin "https://github.com/$GITHUB_USERNAME/$REPO_NAME.git"
echo -e "${GREEN}  [7/7] Remote origin ditambahkan ✓${NC}"

echo ""
echo -e "${CYAN}  =====================================================${NC}"
echo -e "${WHITE}  Setup lokal selesai! 🎉${NC}"
echo -e "${CYAN}  =====================================================${NC}"
echo ""
echo -e "${YELLOW}  Langkah selanjutnya — push ke GitHub:${NC}"
echo ""
echo -e "    ${WHITE}git push -u origin main${NC}"
echo ""
echo -e "${YELLOW}  Tips login GitHub:${NC}"
echo "  - Username: username GitHub kamu"
echo "  - Password: Personal Access Token (BUKAN password biasa)"
echo ""
echo "  Cara buat token:"
echo "  GitHub → Settings → Developer settings"
echo "  → Personal access tokens → Tokens (classic)"
echo "  → Generate new token → centang 'repo' → Generate"
echo ""
echo -e "${YELLOW}  Setelah push, aktifkan GitHub Pages:${NC}"
echo "  Settings → Pages → Branch: main → Save"
echo ""
echo -e "  🌐 Website live di:"
echo -e "  ${CYAN}https://$GITHUB_USERNAME.github.io/$REPO_NAME${NC}"
echo ""
