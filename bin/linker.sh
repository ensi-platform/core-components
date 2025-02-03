#!/bin/bash
set -e

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && dirname "$(pwd)")"

CONFIG_FILE="${ROOT}/linker.config.json"
DEFAULT_FRONTEND_PATH="$(dirname "${ROOT}")/admin-gui-frontend"

YELLOW="\033[1;33m"
GREEN="\033[1;32m"
RED="\033[1;31m"
NC="\033[0m"

VERBOSE=false

for arg in "$@"; do
  case $arg in
    -v|--verbose)
      VERBOSE=true
      shift
      ;;
  esac
done

log_info() {
  echo -e "${YELLOW}[INFO]${NC} $1"
}

log_success() {
  echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_error() {
  echo -e "${RED}[ERROR]${NC} $1" >&2
}

FRONTEND_PATH="${DEFAULT_FRONTEND_PATH}"
if [ -f "$CONFIG_FILE" ]; then
  FRONTEND_PATH=$(jq -r '.frontendPath // empty' "$CONFIG_FILE")

  if [[ -z "$FRONTEND_PATH" ]]; then
    log_info "The "frontendPath" is not configured in "linker.config.json". The default value is used: ${DEFAULT_FRONTEND_PATH}"
    FRONTEND_PATH="${DEFAULT_FRONTEND_PATH}"
  fi
else
  log_info ""linker.config.json" is missing. The default value is used: ${DEFAULT_FRONTEND_PATH}"
fi

CORE_COMPONENTS_PATH="${ROOT}"

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

YARN_CMD="yarn link"

log_info "React linking..."
cd "$FRONTEND_PATH"
if [ "$VERBOSE" = true ]; then
  eval "$YARN_CMD --cwd $FRONTEND_PATH/node_modules/react"
  eval "$YARN_CMD --cwd $FRONTEND_PATH/node_modules/@types/react"
else
  eval "$YARN_CMD --cwd $FRONTEND_PATH/node_modules/react" >/dev/null 2>&1
  eval "$YARN_CMD --cwd $FRONTEND_PATH/node_modules/@types/react" >/dev/null 2>&1
fi

cd "$CORE_COMPONENTS_PATH"
if [ "$VERBOSE" = true ]; then
  eval "$YARN_CMD react"
  eval "$YARN_CMD @types/react"
else
  eval "$YARN_CMD react" >/dev/null 2>&1
  eval "$YARN_CMD @types/react" >/dev/null 2>&1
fi

if [ ! -d "$CORE_COMPONENTS_PATH/dist" ]; then
  log_error "$CORE_COMPONENTS_PATH has no /dist dir. Try to run \`yarn build\`"
  exit 1
fi

log_info "@ensi-platform/core-components linking..."
cd "$CORE_COMPONENTS_PATH/dist"
if [ "$VERBOSE" = true ]; then
  eval "$YARN_CMD"
else
  eval "$YARN_CMD" >/dev/null 2>&1
fi

cd "$FRONTEND_PATH"
if [ "$VERBOSE" = true ]; then
  eval "$YARN_CMD @ensi-platform/core-components"
else
  eval "$YARN_CMD @ensi-platform/core-components" >/dev/null 2>&1
fi

log_success "@ensi-platform/core-components successfully linked"
