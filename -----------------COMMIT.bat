@echo off
set /p msg="Commit mesaji: "
git add .
git commit -m "%msg%"
git push
pause