@echo off
echo.
echo ========================================
echo   NEPTUNO - Servidor HTTP
echo ========================================
echo.
echo Iniciando servidor local...
echo.
echo Acesse: http://localhost:8080
echo.
echo Pressione Ctrl+C para parar o servidor
echo ========================================
echo.

cd /d "%~dp0"

REM Verificar se Python está instalado
python --version >nul 2>&1
if %errorlevel% == 0 (
    echo Usando Python...
    python -m http.server 8080
    goto :end
)

REM Verificar se Node.js está instalado
node --version >nul 2>&1
if %errorlevel% == 0 (
    echo Usando Node.js...
    npx -y http-server -p 8080
    goto :end
)

REM Se nenhum estiver instalado
echo.
echo ========================================
echo   ERRO: Python ou Node.js necessario!
echo ========================================
echo.
echo Por favor, instale um dos seguintes:
echo.
echo 1. Python: https://www.python.org/downloads/
echo 2. Node.js: https://nodejs.org/
echo.
echo Ou use: INICIAR-SEM-SERVIDOR.bat
echo.
pause

:end
