#!/bin/bash
# выхожу, если одна из команд завершилась неудачно
set -e

# удаляю билды
yarn clean

# устанавливаем ограничение на количество параллельных процессов при сборке (default - 10) Внимание 1 процесс сжирает ~1gb RAM
CONCURRENCY=${BUILD_CONCURRENCY:=2}
LERNA_ROOT_PATH="$PWD"

echo "start build on $CONCURRENCY parallel process"

mkdir -p dist

# собираю все подпакеты с компонентами
lerna exec --concurrency $CONCURRENCY \
    -- $(pwd)/bin/rollup.sh

# копирую package.json в сборку корневого пакета
cp package.json dist/package.json

# копирую README.md в сборку корневого пакета
cp README.md dist/README.md

# делаю корневой пакет публичным (Необходим npmjs.com/package/json)
yarn json -f dist/package.json -I -e "delete this.private" -e "delete this.workspaces" -e "delete this.scripts.prepare"

# Создаем входные точки cjs и esm
node bin/create-entry-point.js

# Создаем входные точки ts
node bin/generate-types-index.js
