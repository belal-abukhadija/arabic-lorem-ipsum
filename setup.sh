#!/bin/bash

# Arabic Lorem Ipsum Generator
# Quick Setup Script for Linux/Mac

echo "🚀 Setting up Arabic Lorem Ipsum Generator..."
echo ""

# Check Node.js installation
echo "📦 Checking Node.js installation..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo "✓ Node.js $NODE_VERSION installed"
else
    echo "✗ Node.js not found. Please install Node.js 18+ from https://nodejs.org"
    exit 1
fi

# Install frontend dependencies
echo ""
echo "📦 Installing frontend dependencies..."
if npm install; then
    echo "✓ Frontend dependencies installed"
else
    echo "✗ Failed to install frontend dependencies"
    exit 1
fi

# Install API dependencies
echo ""
echo "📦 Installing API dependencies..."
cd api
if npm install; then
    echo "✓ API dependencies installed"
else
    echo "✗ Failed to install API dependencies"
    cd ..
    exit 1
fi
cd ..

# Create .env file for API if it doesn't exist
if [ ! -f "api/.env" ]; then
    echo ""
    echo "📝 Creating API .env file..."
    cp api/.env.example api/.env
    echo "✓ .env file created. Please update with your settings."
fi

# Make scripts executable
chmod +x setup.sh

# Run tests
echo ""
echo "🧪 Running tests..."
if npm test -- --passWithNoTests; then
    echo "✓ All tests passed"
else
    echo "⚠ Some tests failed, but setup continues"
fi

# Success message
echo ""
echo "✓ Setup complete!"
echo ""
echo "📚 Next steps:"
echo "  1. Frontend: npm run dev"
echo "  2. API (optional): cd api && npm run dev"
echo ""
echo "🌐 The app will be available at:"
echo "  Frontend: http://localhost:3000"
echo "  API: http://localhost:3001"
echo ""
echo "📖 Documentation:"
echo "  README.md - Main documentation"
echo "  API_DOCS.md - API reference"
echo "  DEPLOYMENT.md - Deployment guide"
echo ""
