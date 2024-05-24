@echo off

REM Путь к файлу конфигурации rollup
set ROLLUP_CONFIG_PATH=rollup.config.mjs

REM Запуск команды Rollup с указанием пути к файлу конфига
call yarn rollup -c %LERNA_ROOT_PATH%\%ROLLUP_CONFIG_PATH% --silent
