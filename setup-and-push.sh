#!/bin/bash

# Color codes for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== Git Setup and Push Script ===${NC}\n"

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo -e "${RED}Git is not installed!${NC}"
    echo "Please run: xcode-select --install"
    exit 1
fi

# Check if git is configured
if [ -z "$(git config --global user.name)" ]; then
    echo -e "${BLUE}Setting up Git configuration...${NC}"
    read -p "Enter your name: " username
    read -p "Enter your email: " email
    git config --global user.name "$username"
    git config --global user.email "$email"
    echo -e "${GREEN}Git configured!${NC}\n"
fi

# Navigate to project directory
cd "$(dirname "$0")"

# Check if already a git repo
if [ ! -d .git ]; then
    echo -e "${BLUE}Initializing git repository...${NC}"
    git init
    echo -e "${GREEN}Repository initialized!${NC}\n"
fi

# Add all files
echo -e "${BLUE}Adding files...${NC}"
git add .

# Commit
echo -e "${BLUE}Creating commit...${NC}"
git commit -m "Initial commit: Admin customization app with shadcn/ui"

# Check if remote exists
if ! git remote | grep -q "origin"; then
    echo -e "${BLUE}Adding remote repository...${NC}"
    git remote add origin git@github.com:elizmdavis/design-test.git
fi

# Set branch to main
git branch -M main

# Push to GitHub
echo -e "${BLUE}Pushing to GitHub...${NC}"
git push -u origin main

if [ $? -eq 0 ]; then
    echo -e "\n${GREEN}✅ Success! Code pushed to GitHub!${NC}"
    echo -e "${GREEN}View your repository: https://github.com/elizmdavis/design-test${NC}"
    echo -e "${GREEN}After enabling GitHub Pages, your site will be at:${NC}"
    echo -e "${GREEN}https://elizmdavis.github.io/design-test/${NC}"
else
    echo -e "\n${RED}❌ Push failed. Please check the error above.${NC}"
    echo "Common issues:"
    echo "1. SSH key not added to GitHub"
    echo "2. Repository doesn't exist"
    echo "3. No permission to push"
fi

