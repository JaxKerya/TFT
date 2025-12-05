@echo off
setlocal enabledelayedexpansion

title GIT OTOMATIK COMMIT

echo.
echo ===============================
echo   GIT OTOMATIK COMMIT
echo ===============================
echo.

:: Git kontrolü
where git >nul 2>nul
if %errorlevel% neq 0 (
    echo [X] Git bulunamadi. Lutfen Git'in yüklü oldugundan emin olun.
    pause
    exit /b
)

:: Degisiklik kontrolü
git status --porcelain >nul
if %errorlevel% neq 0 (
    echo [X] Bu klasor bir git reposu degil.
    pause
    exit /b
)

git status --porcelain | findstr . >nul
if %errorlevel% neq 0 (
    echo [!] Hic degisiklik yok. Commit yapilacak bir sey bulunamadi.
    echo.
    pause
    exit /b
)

echo Degisiklikler bulundu. Commit icin hazirlaniyor...
echo.

set /p msg=Commit mesaji: 

if "!msg!"=="" (
    echo [X] Commit mesaji bos olamaz.
    pause
    exit /b
)

echo.
git add -A

git commit -m "!msg!"
if %errorlevel% neq 0 (
    echo [X] Commit sirasinda hata olustu.
    pause
    exit /b
)

git push
if %errorlevel% neq 0 (
    echo [X] Push sirasinda hata olustu.
    pause
    exit /b
)

echo.
echo ✔ Commit ve Push BASARIYLA TAMAMLANDI.
echo ===============================
echo.
pause
exit /b
