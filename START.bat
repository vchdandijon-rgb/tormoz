@echo off
chcp 65001 >nul
title Tormoz sinovi - ishga tushirish

where node >nul 2>nul
if errorlevel 1 (
  echo XATO: Node.js o'rnatilmagan.
  echo https://nodejs.org saytidan Node.js LTS versiyasini o'rnating.
  pause
  exit /b 1
)

if not exist node_modules (
  echo Kerakli paketlar birinchi marta o'rnatilmoqda...
  call npm install
  if errorlevel 1 goto :error
)

call npm start
exit /b 0

:error
echo.
echo Paketlarni o'rnatishda xato yuz berdi.
pause
exit /b 1
