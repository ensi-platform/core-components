@echo off

set ROLLUP_CONFIG_PATH="rollup.config.mjs"

echo path=
echo %LERNA_ROOT_PATH%\%ROLLUP_CONFIG_PATH%

yarn rollup -c %LERNA_ROOT_PATH%\%ROLLUP_CONFIG_PATH% --silent
