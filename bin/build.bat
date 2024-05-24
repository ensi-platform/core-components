@echo off
REM удаляю билды
call yarn clean

REM устанавливаем ограничение на количество параллельных процессов при сборке (default - 10) Внимание, 1 процесс съедает ~1gb RAM
SET CONCURRENCY=2
SET LERNA_ROOT_PATH=%CD%

echo "start build on %CONCURRENCY% parallel process"

mkdir dist

REM собираю все подпакеты с компонентами
call lerna exec --concurrency %CONCURRENCY% -- %CD%\bin\rollup.bat

REM копирую package.json и README.md в сборку корневого пакета
copy package.json dist\package.json
copy README.md dist\README.md

REM делаю корневой пакет публичным (Необходим npmjs.com/package/json)
call yarn json -f dist\package.json -I -e "delete this.private" -e "delete this.workspaces" -e "delete this.scripts.prepare"

REM Создаем входные точки cjs и esm
node bin\create-entry-point.js

REM Создаем входные точки ts
node bin\generate-types-index.js
