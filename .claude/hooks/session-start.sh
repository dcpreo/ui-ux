#!/bin/bash
set -euo pipefail

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

# Install CLI dependencies
cd "$CLAUDE_PROJECT_DIR/cli"
npm install
