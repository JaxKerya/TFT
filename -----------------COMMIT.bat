@echo off
echo ===============================
echo   GIT OTOMATIK COMMIT & PUSH
echo ===============================
echo.

:: 1) Remote baglantisini kontrol et
git remote -v >nul 2>&1
if %errorlevel% neq 0 (
    echo Bu klasor bir git reposu degil.
    pause
    exit /b
)

:: 2) Otomatik pull (conflict yoksa temizce ceker)
echo Son degisiklikler cekiliyor...
git pull --rebase

echo.
set /p msg="Commit mesaji: "

if "%msg%"=="" (
    echo Mesaj bos olamaz.
    pause
    exit /b
)

:: 3) Degisiklikleri ekle
git add .

:: 4) Commit'i olustur
git commit -m "%msg%"

:: 5) Github'a yukle
git push

echo.
echo ✔ Commit ve Push BASARIYLA TAMAMLANDI.
echo ===============================
pause
