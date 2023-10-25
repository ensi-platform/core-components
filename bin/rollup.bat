@echo off

set ROLLUP_CONFIG_PATH=rollup.config.mjs

yarn rollup -c %LERNA_ROOT_PATH%\%ROLLUP_CONFIG_PATH% --silent
