# Arabic Lorem Ipsum Generator
# Quick Setup Script for Windows

Write-Host "🚀 Setting up Arabic Lorem Ipsum Generator..." -ForegroundColor Cyan
Write-Host ""

# Check Node.js installation
Write-Host "📦 Checking Node.js installation..." -ForegroundColor Yellow
$nodeVersion = node --version 2>$null
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Node.js $nodeVersion installed" -ForegroundColor Green
} else {
    Write-Host "✗ Node.js not found. Please install Node.js 18+ from https://nodejs.org" -ForegroundColor Red
    exit 1
}

# Install frontend dependencies
Write-Host ""
Write-Host "📦 Installing frontend dependencies..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ Failed to install frontend dependencies" -ForegroundColor Red
    exit 1
}
Write-Host "✓ Frontend dependencies installed" -ForegroundColor Green

# Install API dependencies
Write-Host ""
Write-Host "📦 Installing API dependencies..." -ForegroundColor Yellow
Set-Location api
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ Failed to install API dependencies" -ForegroundColor Red
    Set-Location ..
    exit 1
}
Write-Host "✓ API dependencies installed" -ForegroundColor Green
Set-Location ..

# Create .env file for API if it doesn't exist
if (-not (Test-Path "api\.env")) {
    Write-Host ""
    Write-Host "📝 Creating API .env file..." -ForegroundColor Yellow
    Copy-Item "api\.env.example" "api\.env"
    Write-Host "✓ .env file created. Please update with your settings." -ForegroundColor Green
}

# Run tests
Write-Host ""
Write-Host "🧪 Running tests..." -ForegroundColor Yellow
npm test -- --passWithNoTests
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ All tests passed" -ForegroundColor Green
} else {
    Write-Host "⚠ Some tests failed, but setup continues" -ForegroundColor Yellow
}

# Success message
Write-Host ""
Write-Host "✓ Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📚 Next steps:" -ForegroundColor Cyan
Write-Host "  1. Frontend: npm run dev" -ForegroundColor White
Write-Host "  2. API (optional): cd api && npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "🌐 The app will be available at:" -ForegroundColor Cyan
Write-Host "  Frontend: http://localhost:3000" -ForegroundColor White
Write-Host "  API: http://localhost:3001" -ForegroundColor White
Write-Host ""
Write-Host "📖 Documentation:" -ForegroundColor Cyan
Write-Host "  README.md - Main documentation" -ForegroundColor White
Write-Host "  API_DOCS.md - API reference" -ForegroundColor White
Write-Host "  DEPLOYMENT.md - Deployment guide" -ForegroundColor White
Write-Host ""
