@echo off
echo.
echo ========================================
echo   CONVERSOR WebM para MP4 - NEPTUNO
echo ========================================
echo.
echo Convertendo video...
echo.

cd /d "%~dp0"

REM Usar o FFmpeg do Playwright (já instalado)
set FFMPEG_PATH=%LOCALAPPDATA%\ms-playwright\ffmpeg-1011\ffmpeg.exe

if exist "%FFMPEG_PATH%" (
    echo FFmpeg encontrado! Convertendo...
    echo.
    "%FFMPEG_PATH%" -i NEPTUNO_DEMO_COMPLETO_9_PASSOS.webm -c:v libx264 -preset slow -crf 18 -c:a aac -b:a 192k NEPTUNO_DEMO_COMPLETO_9_PASSOS.mp4
    echo.
    echo ========================================
    echo   CONVERSAO CONCLUIDA!
    echo ========================================
    echo.
    echo Arquivo gerado: NEPTUNO_DEMO_COMPLETO_9_PASSOS.mp4
    echo.
) else (
    echo ERRO: FFmpeg nao encontrado!
    echo.
    echo Por favor, instale FFmpeg:
    echo https://ffmpeg.org/download.html
    echo.
)

pause
