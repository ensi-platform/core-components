#!/bin/bash
set -e

source "$(dirname "${BASH_SOURCE[0]}")/common.sh"

NO_REPACK=false

for arg in "$@"; do
  case $arg in
  -v | --verbose) VERBOSE=true ;;
  -nr | --no-repack) NO_REPACK=true ;;
  esac
done

log_info "Unlinking @ensi-platform/core-components..."

cd $CORE_COMPONENTS_PATH
run_cmd "yarn unlink react"
run_cmd "yarn unlink @types/react"

cd $FRONTEND_PATH
run_cmd "yarn unlink @ensi-platform/core-components"

cd "$FRONTEND_PATH/node_modules/react"
run_cmd "yarn unlink"

cd "$FRONTEND_PATH/node_modules/@types/react"
run_cmd "yarn unlink"

cd "$CORE_COMPONENTS_PATH/dist"
run_cmd "yarn unlink"

if [ "$NO_REPACK" = false ]; then
  log_info "$FRONTEND_PATH repacking..."

  cd $FRONTEND_PATH
  CORE_COMPONENTS_VERSION=$(jq -r '.dependencies["@ensi-platform/core-components"]' package.json)
  run_cmd "yarn add @ensi-platform/core-components@$CORE_COMPONENTS_VERSION"

  log_info "$CORE_COMPONENTS_PATH repacking..."

  cd $CORE_COMPONENTS_PATH
  REACT_VERSION=$(jq -r '.dependencies["react"]' package.json)
  TYPES_REACT_VERSION=$(jq -r '.devDependencies["@types/react"]' package.json)
  run_cmd "yarn add react@$REACT_VERSION"
  run_cmd "yarn add --dev @types/react@$TYPES_REACT_VERSION"
else
  log_warning "Skipping repack"
fi

log_success "@ensi-platform/core-components successfully unlinked"
