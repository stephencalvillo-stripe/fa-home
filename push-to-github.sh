#!/bin/bash
# Push FA Home project to GitHub — run this once to set up and push.

set -e
cd "$(dirname "$0")"

echo "→ Setting up Git in this folder..."
rm -rf .git 2>/dev/null || true
git init

echo "→ Adding your GitHub repo..."
git remote add origin https://github.com/stephencalvillo-stripe/fa-home.git 2>/dev/null || git remote set-url origin https://github.com/stephencalvillo-stripe/fa-home.git

echo "→ Staging all files..."
git add .

echo "→ Creating first commit..."
git commit -m "Initial commit: FA Home dashboard prototype"

echo "→ Pushing to GitHub (main branch)..."
git branch -M main
git push -u origin main

echo ""
echo "Done. Your project is at: https://github.com/stephencalvillo-stripe/fa-home"
