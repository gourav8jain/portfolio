#!/bin/bash

# Portfolio Website Deployment Script
# This script helps deploy the portfolio to GitHub Pages

echo "🚀 Portfolio Website Deployment Script"
echo "======================================"

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git repository not found. Please initialize git first:"
    echo "   git init"
    echo "   git add ."
    echo "   git commit -m 'Initial commit'"
    exit 1
fi

# Check if files exist
if [ ! -f "index.html" ] || [ ! -f "styles.css" ] || [ ! -f "script.js" ]; then
    echo "❌ Required files missing. Please ensure index.html, styles.css, and script.js exist."
    exit 1
fi

echo "✅ All required files found"

# Add all files to git
echo "📁 Adding files to git..."
git add .

# Commit changes
echo "💾 Committing changes..."
git commit -m "Update portfolio website"

# Push to remote
echo "🚀 Pushing to GitHub..."
git push origin main

echo ""
echo "✅ Deployment completed!"
echo ""
echo "📋 Next steps for GitHub Pages:"
echo "1. Go to your GitHub repository"
echo "2. Click on 'Settings'"
echo "3. Scroll down to 'GitHub Pages' section"
echo "4. Select 'Deploy from a branch'"
echo "5. Choose 'main' branch and '/ (root)' folder"
echo "6. Click 'Save'"
echo ""
echo "🌐 Your portfolio will be available at:"
echo "   https://[username].github.io/[repository-name]"
echo ""
echo "📱 Test the website on different devices to ensure responsiveness"
echo "🎨 Customize colors and content as needed" 