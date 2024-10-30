#!/bin/bash

# выхожу, если одна из команд завершилась неудачно
set -e

# Получаем имя компонента из аргументов
COMPONENT_NAME=$1

# Проверяем, передано ли имя компонента
if [ -z "$COMPONENT_NAME" ]; then
  echo "Error: No component name provided."
  echo "Usage: yarn build-component <component-name>"
  exit 1
fi

# Добавляем префикс @ensi-platform/core-components- к имени компонента
FULL_COMPONENT_NAME="@ensi-platform/core-components-$COMPONENT_NAME"

LERNA_ROOT_PATH="$PWD"

# Удаляю билд для указанного компонента
COMPONENT_DIST_PATH="dist/$FULL_COMPONENT_NAME"

if [ -d "$COMPONENT_DIST_PATH" ]; then
  echo "Removing existing build for component: $FULL_COMPONENT_NAME"
  rm -rf "$COMPONENT_DIST_PATH"
fi

echo "Start building component: $FULL_COMPONENT_NAME"

mkdir -p "$COMPONENT_DIST_PATH"

# Выполняем сборку только для указанного компонента
lerna exec --scope "$FULL_COMPONENT_NAME" -- $(pwd)/bin/rollup.sh

# Копируем package.json в сборку корневого пакета
cp package.json dist/package.json

# Копируем README.md в сборку корневого пакета
cp README.md dist/README.md

# Делаем корневой пакет публичным (необходим npmjs.com/package.json)
yarn json -f dist/package.json -I -e "delete this.private" -e "delete this.workspaces" -e "delete this.scripts.prepare"

# Удаляем папку @ensi-platform в dist
if [ -d "dist/@ensi-platform" ]; then
  echo "Removing directory dist/@ensi-platform"
  rm -rf dist/@ensi-platform
fi

# Создаем входные точки cjs и esm
node bin/create-entry-point.js

# Создаем входные точки ts
node bin/generate-types-index.js



echo "Build complete for component: $FULL_COMPONENT_NAME"
