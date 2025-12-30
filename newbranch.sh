#!/bin/bash

# Color codes for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to display usage
usage() {
    echo -e "${YELLOW}Usage:${NC} ./newbranch.sh <branch-name> [branch-type]"
    echo ""
    echo "Examples:"
    echo "  ./newbranch.sh login-fix"
    echo "  ./newbranch.sh login-fix fix"
    echo "  ./newbranch.sh new-feature feature"
    echo ""
    echo "Branch types: feature, fix, update (default: feature)"
    exit 1
}

# Check if branch name is provided
if [ -z "$1" ]; then
    echo -e "${RED}Error: Branch name is required${NC}"
    usage
fi

BRANCH_NAME=$1
BRANCH_TYPE=${2:-feature}

# Validate branch type
if [[ ! "$BRANCH_TYPE" =~ ^(feature|fix|update)$ ]]; then
    echo -e "${YELLOW}Warning: Invalid branch type '$BRANCH_TYPE'. Using 'feature' instead.${NC}"
    BRANCH_TYPE="feature"
fi

# Construct full branch name
FULL_BRANCH_NAME="${BRANCH_TYPE}/${BRANCH_NAME}"

echo -e "${BLUE}=== Creating New Branch ===${NC}\n"

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo -e "${RED}Error: Not in a git repository${NC}"
    exit 1
fi

# Check if we're on main branch (recommended)
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ]; then
    echo -e "${YELLOW}Warning: You're currently on '$CURRENT_BRANCH', not 'main'${NC}"
    read -p "Continue anyway? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo -e "${RED}Cancelled${NC}"
        exit 1
    fi
fi

# Make sure main is up to date
echo -e "${BLUE}Updating main branch...${NC}"
git checkout main
git pull origin main

# Check if branch already exists locally
if git show-ref --verify --quiet refs/heads/"$FULL_BRANCH_NAME"; then
    echo -e "${RED}Error: Branch '$FULL_BRANCH_NAME' already exists locally${NC}"
    read -p "Switch to existing branch? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git checkout "$FULL_BRANCH_NAME"
        echo -e "${GREEN}Switched to existing branch: $FULL_BRANCH_NAME${NC}"
        exit 0
    else
        exit 1
    fi
fi

# Check if branch exists on remote
if git ls-remote --heads origin "$FULL_BRANCH_NAME" | grep -q "$FULL_BRANCH_NAME"; then
    echo -e "${YELLOW}Branch '$FULL_BRANCH_NAME' exists on remote. Fetching...${NC}"
    git fetch origin "$FULL_BRANCH_NAME"
    git checkout -b "$FULL_BRANCH_NAME" "origin/$FULL_BRANCH_NAME"
    echo -e "${GREEN}Switched to existing remote branch: $FULL_BRANCH_NAME${NC}"
    exit 0
fi

# Create and switch to new branch
echo -e "${BLUE}Creating branch: ${GREEN}$FULL_BRANCH_NAME${NC}"
git checkout -b "$FULL_BRANCH_NAME"

# Push branch to remote
echo -e "${BLUE}Pushing branch to remote...${NC}"
git push -u origin "$FULL_BRANCH_NAME"

if [ $? -eq 0 ]; then
    echo -e "\n${GREEN}✅ Success!${NC}"
    echo -e "${GREEN}Branch '$FULL_BRANCH_NAME' created and pushed to remote${NC}"
    echo -e "\n${BLUE}Next steps:${NC}"
    echo "  1. Make your changes"
    echo "  2. Commit: git add . && git commit -m 'Your message'"
    echo "  3. Push: git push"
    echo "  4. Create PR: Visit https://github.com/elizmdavis/design-test/compare/main...$FULL_BRANCH_NAME"
else
    echo -e "\n${RED}❌ Failed to push branch${NC}"
    echo -e "${YELLOW}Branch created locally but not pushed. You can push manually with:${NC}"
    echo "  git push -u origin $FULL_BRANCH_NAME"
    exit 1
fi

