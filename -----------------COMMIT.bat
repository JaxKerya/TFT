@echo off
chcp 65001 >nul

echo ===============================
echo  GIT OTOMATIK COMMIT & PUSH
echo ===============================
echo.

:: Repo kontrolü
git rev-parse --is-inside-work-tree >nul 2>&1
if %errorlevel% neq 0 (
    echo Bu klasor bir git reposu degil.
    pause
    exit /b
)

:: Unstaged degisiklikleri kontrol et
git diff --quiet
if %errorlevel% neq 0 (
    echo Degisiklikler var. Commit icin hazirlaniyor...
) else (
    echo Degisiklik yok. Cikis yapiliyor.
    pause
    exit /b
)

:: Commit mesaji al
echo.
set /p msg="Commit mesaji: "

if "%msg%"=="" (
    echo Mesaj bos olamaz.
    pause
    exit /b
)

:: Add
git add .

:: Commit
git commit -m "%msg%"

:: Push
git push

echo.
echo ✔ Commit ve Push BASARIYLA TAMAMLANDI.
echo ===============================
pause
