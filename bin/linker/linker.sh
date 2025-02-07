#!/bin/bash
set -e

source "$(dirname "${BASH_SOURCE[0]}")/common.sh"

VERBOSE=false

for arg in "$@"; do
  case $arg in
  -v | --verbose) VERBOSE=true ;;
  esac
done

YARN_CMD="yarn link"

log_info "React linking..."

cd $FRONTEND_PATH
run_cmd "$YARN_CMD --cwd $FRONTEND_PATH/node_modules/react"
run_cmd "$YARN_CMD --cwd $FRONTEND_PATH/node_modules/@types/react"

cd $CORE_COMPONENTS_PATH
run_cmd "$YARN_CMD react"
run_cmd "$YARN_CMD @types/react"

log_info "@ensi-platform/core-components linking..."
cd "$CORE_COMPONENTS_PATH/dist"
run_cmd "$YARN_CMD"

cd "$FRONTEND_PATH"
run_cmd "$YARN_CMD @ensi-platform/core-components"

log_success "@ensi-platform/core-components successfully linked"
