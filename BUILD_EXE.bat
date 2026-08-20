@echo off
chcp 65001 >nul
title Tormoz sinovi - Windows EXE yig'ish

where node >nul 2>nul
if errorlevel 1 (
  echo XATO: Node.js o'rnatilmagan.
  echo https://nodejs.org saytidan Node.js LTS versiyasini o'rnating.
  pause
  exit /b 1
)

echo 1/3. Kerakli paketlar tekshirilmoqda...
call npm install --no-audit --no-fund
if errorlevel 1 goto :error

echo 2/3. Eski yig'ish natijalari tozalanmoqda...
if exist release rmdir /s /q release

echo 3/3. Windows EXE fayllari yig'ilmoqda...
call npm run dist:win
if errorlevel 1 goto :error

echo.
echo TAYYOR: Quyidagi EXE fayllar release papkasiga saqlandi:
for %%F in (release\*.exe) do echo   %%~nxF
start "" release
pause
exit /b 0

:error
echo.
echo EXE yig'ishda xato yuz berdi. Yuqoridagi xabarni tekshiring.
pause
exit /b 1
