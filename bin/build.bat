@echo off
REM удаляю билды
call yarn clean

REM устанавливаем ограничение на количество параллельных процессов при сборке (default - 10)
SET CONCURRENCY=10
SET LERNA_ROOT_PATH=%CD%

echo "start build on %CONCURRENCY% parallel process"

mkdir dist

REM собираю все подпакеты с компонентами
lerna exec --concurrency %CONCURRENCY% -- %CD%/bin/rollup.bat && copy package.json dist/package.json && README.md dist/README.md && yarn json -f dist/package.json -I -e "delete this.private" -e "delete this.workspaces"