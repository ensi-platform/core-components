#!/bin/bash

# Путь к файлу конфигурации rollup
ROLLUP_CONFIG_PATH="$LERNA_ROOT_PATH/rollup.config.mjs"

# Текущая директория пакета
CURRENT_PACKAGE_DIR=$(basename "$PWD")

# Проверяем, существует ли конфиг
if [ -f "$ROLLUP_CONFIG_PATH" ]; then
    echo "Using Rollup config at: $ROLLUP_CONFIG_PATH"

    # Запуск команды Rollup с указанием пути к файлу конфига
    yarn rollup -c "$ROLLUP_CONFIG_PATH" --silent
else
    echo "Rollup config file not found at: $ROLLUP_CONFIG_PATH"
fi
