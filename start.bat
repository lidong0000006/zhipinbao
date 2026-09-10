@echo off
chcp 65001 > nul
echo ========================================================
echo   🚀 正在启动【直聘宝】兼职全职直聘与简历解析全栈系统
echo ========================================================
echo.

cd /d "%~dp0"

IF NOT EXIST "node_modules\" (
    echo [提示] 正在安装项目依赖...
    call npm install
)

echo [提示] 启动 Express API 后端 (Port 5050) 与 Vite 前端 (Port 8080)...
echo [提示] 打开浏览器访问: http://localhost:8080
echo.

start http://localhost:8080

call npm start

pause
