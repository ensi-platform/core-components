#!/bin/bash
set -e

ROOT="$(cd "$(dirname "$(dirname "${BASH_SOURCE[0]}")")" && dirname "$(pwd)")"

CONFIG_FILE="${ROOT}/linker.config.json"
DEFAULT_FRONTEND_PATH="$(dirname "${ROOT}")/admin-gui-frontend"

YELLOW="\033[1;33m"
GREEN="\033[1;32m"
BLUE="\033[1;34m"
RED="\033[1;31m"
NC="\033[0m"

VERBOSE=false

log_info() {
  echo -e "${BLUE}[INFO]${NC} $1"
}

log_warning() {
  echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_success() {
  echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_error() {
  echo -e "${RED}[ERROR]${NC} $1" >&2
}

run_cmd() {
  if [ "$VERBOSE" = true ]; then
    eval "$1"
  else
    eval "$1" >/dev/null 2>&1
  fi
}

FRONTEND_PATH="${DEFAULT_FRONTEND_PATH}"

if [ -f "$CONFIG_FILE" ]; then
  FRONTEND_PATH=$(jq -r '.frontendPath // empty' "$CONFIG_FILE")

  if [[ -z "$FRONTEND_PATH" ]]; then
    log_warning "The "frontendPath" is not configured in "linker.config.json". The default value is used: ${DEFAULT_FRONTEND_PATH}"
    FRONTEND_PATH="${DEFAULT_FRONTEND_PATH}"
  fi
else
  log_warning ""linker.config.json" is missing. The default value is used: ${DEFAULT_FRONTEND_PATH}"
fi

CORE_COMPONENTS_PATH="${ROOT}"

# default steps

log_info "CORE_COMPONENTS_PATH: ${CORE_COMPONENTS_PATH}"
log_info "FRONTEND_PATH: ${FRONTEND_PATH}"

if [ ! -d "$FRONTEND_PATH" ]; then
  log_error "The ${FRONTEND_PATH} directory does not exist. Edit the \`linker.config.json\`"
  exit 1
fi

if [ ! -d "$FRONTEND_PATH/node_modules" ]; then
  log_error "$FRONTEND_PATH has no /node_modules dir. Try to run \`yarn install\` for $FRONTEND_PATH"
  exit 1
fi

if [ ! -d "$CORE_COMPONENTS_PATH/node_modules" ]; then
  log_error "$CORE_COMPONENTS_PATH has no /node_modules dir. Try to run \`yarn install\` for $CORE_COMPONENTS_PATH"
  exit 1
fi

if [ ! -d "$CORE_COMPONENTS_PATH/dist" ]; then
  log_error "$CORE_COMPONENTS_PATH has no /dist dir. Try to run \`yarn build\`"
  exit 1
fi
