#!/usr/bin/env bash
set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PROJECT_NAME="$(basename "$PROJECT_ROOT")"
ARCH="$(uname -m)"

# Keep machine-specific dependencies outside iCloud-synced project files.
TARGET_DIR="$HOME/.local/share/node-modules/$PROJECT_NAME/$ARCH/node_modules"

mkdir -p "$(dirname "$TARGET_DIR")"
cd "$PROJECT_ROOT"

if [ -L "node_modules" ]; then
  CURRENT_TARGET="$(readlink "node_modules")"
  if [ "$CURRENT_TARGET" != "$TARGET_DIR" ]; then
    rm "node_modules"
    ln -s "$TARGET_DIR" "node_modules"
  fi
elif [ -d "node_modules" ]; then
  if [ ! -d "$TARGET_DIR" ]; then
    mv "node_modules" "$TARGET_DIR"
  else
    rm -rf "node_modules"
  fi
  ln -s "$TARGET_DIR" "node_modules"
else
  ln -s "$TARGET_DIR" "node_modules"
fi

if [ ! -d "$TARGET_DIR" ] || [ -z "$(ls -A "$TARGET_DIR" 2>/dev/null)" ]; then
  echo "Installing dependencies into $TARGET_DIR"
  npm install
fi

echo "node_modules -> $TARGET_DIR"
