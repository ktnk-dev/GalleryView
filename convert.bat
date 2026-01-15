@echo off
setlocal

REM Переходим в папку, где лежит скрипт
cd /d "%~dp0"

>result.js echo const messages =

for /f "delims=" %%A in (result.json) do (
    >>result.js echo %%A
)

REM Закрывающая фигурная скобка и точка с запятой


endlocal
