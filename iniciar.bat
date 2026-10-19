
@echo off
title Iniciar Humani
cd /d "%~dp0"

echo Comprobando el servidor de Humani...

powershell -NoProfile -Command "if (Get-NetTCPConnection -LocalPort 3000 -State Listen -ErrorAction SilentlyContinue) { exit 0 } else { exit 1 }"

if %errorlevel% equ 0 (
    echo El servidor ya esta funcionando.
    echo Abriendo la pagina...
    start "" "http://localhost:3000"
) else (
    echo Iniciando el servidor...
    start "Humani - Servidor" cmd /k "cd /d ""%~dp0"" && node server.js"
)

exit
