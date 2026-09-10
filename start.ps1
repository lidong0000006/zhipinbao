# 🚀 直聘宝 全栈项目一键启动脚本 (PowerShell)
$ErrorActionPreference = "Stop"

Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "  🚀 正在启动【直聘宝】兼职全职直聘与简历解析全栈系统" -ForegroundColor Green
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host ""

Set-Location -Path $PSScriptRoot

if (-not (Test-Path "node_modules")) {
    Write-Host "[提示] 正在安装依赖包..." -ForegroundColor Yellow
    npm install
}

Write-Host "[提示] 正在自动在默认浏览器中打开 http://localhost:8080 ..." -ForegroundColor Green
Start-Process "http://localhost:8080"

Write-Host "[提示] 正在同时启动 Node Express 后端 (5050) 与 Vite 前端 (8080)..." -ForegroundColor Yellow
npm start
