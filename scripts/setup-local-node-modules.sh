#!/usr/bin/env bash
set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PROJECT_NAME="$(basename "$PROJECT_ROOT")"
ARCH="$(uname -m)"
NODE_MODULES_ROOT="$HOME/.local/share"
CANONICAL_PARENT="$NODE_MODULES_ROOT/node-modules"

# Keep machine-specific dependencies outside iCloud-synced project files.
BASE_DIR="$CANONICAL_PARENT/$PROJECT_NAME"
ARCH_PARENT_DIR="$BASE_DIR/$ARCH"
ARCH_TARGET_DIR="$ARCH_PARENT_DIR/node_modules"
CURRENT_LINK="$BASE_DIR/current"
PROJECT_TARGET="$CURRENT_LINK/node_modules"

mkdir -p "$ARCH_PARENT_DIR"

# Keep a stable target in the repo symlink while resolving locally per machine.
if [ -L "$CURRENT_LINK" ]; then
  CURRENT_ARCH_TARGET="$(readlink "$CURRENT_LINK")"
  if [ "$CURRENT_ARCH_TARGET" != "$ARCH_PARENT_DIR" ]; then
    rm "$CURRENT_LINK"
    ln -s "$ARCH_PARENT_DIR" "$CURRENT_LINK"
  fi
elif [ -e "$CURRENT_LINK" ]; then
  rm -rf "$CURRENT_LINK"
  ln -s "$ARCH_PARENT_DIR" "$CURRENT_LINK"
else
  ln -s "$ARCH_PARENT_DIR" "$CURRENT_LINK"
fi

cd "$PROJECT_ROOT"

if [ -L "node_modules" ]; then
  CURRENT_TARGET="$(readlink "node_modules")"
  if [ "$CURRENT_TARGET" != "$PROJECT_TARGET" ]; then
    rm "node_modules"
    ln -s "$PROJECT_TARGET" "node_modules"
  fi
elif [ -d "node_modules" ]; then
  if [ ! -d "$ARCH_TARGET_DIR" ]; then
    mv "node_modules" "$ARCH_TARGET_DIR"
  else
    rm -rf "node_modules"
  fi
  ln -s "$PROJECT_TARGET" "node_modules"
else
  ln -s "$PROJECT_TARGET" "node_modules"
fi

if [ ! -d "$ARCH_TARGET_DIR" ] || [ -z "$(ls -A "$ARCH_TARGET_DIR" 2>/dev/null)" ]; then
  echo "Installing dependencies into $ARCH_TARGET_DIR"
  npm install
fi

echo "node_modules -> $PROJECT_TARGET (resolves to $ARCH_TARGET_DIR)"
