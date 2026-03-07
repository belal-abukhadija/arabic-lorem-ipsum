# Quick Reference Guide

## 🚀 Quick Commands

### Development
```bash
# Start frontend dev server
npm run dev

# Start API dev server
cd api && npm run dev

# Run both (use 2 terminals)
npm run dev        # Terminal 1
cd api && npm run dev  # Terminal 2
```

### Testing
```bash
npm test                    # Run all tests
npm run test:watch          # Watch mode
npm test -- --coverage      # With coverage
```

### Building
```bash
npm run build               # Build frontend
cd api && npm run build     # Build API
```

### Production
```bash
npm run preview             # Preview production build
cd api && npm start         # Start API in production
```

## 📖 Common Tasks

### Generate Text Programmatically

```typescript
import { generateArabicLoremIpsum } from './lib/textGenerator';

const { formatted, result } = generateArabicLoremIpsum({
  type: 'paragraphs',
  count: 3,
  format: 'html',
  theme: 'technology',
  includePunctuation: true,
  preventRepetition: true,
  customKeywords: ['API', 'البرمجة'],
  minWordsPerSentence: 5,
  maxWordsPerSentence: 15
});

console.log(formatted);
console.log(result.metadata);
```

### API Request (cURL)

```bash
curl -X POST http://localhost:3001/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "type": "sentences",
    "count": 5,
    "format": "plain",
    "theme": "ui"
  }'
```

### API Request (JavaScript)

```javascript
const response = await fetch('http://localhost:3001/api/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    type: 'paragraphs',
    count: 3,
    format: 'html',
    theme: 'technology'
  })
});

const data = await response.json();
```

## 🎨 Customization Quick Guide

### Add New Theme

Edit `src/lib/textGenerator.ts`:

```typescript
const ARABIC_WORDS = {
  nouns: {
    // ... existing themes
    medical: [
      'المستشفى', 'الطبيب', 'المريض', 'العلاج'
      // Add more medical terms
    ]
  }
};
```

### Change Primary Color

Edit `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        500: '#YOUR_COLOR',
        // ... other shades
      }
    }
  }
}
```

### Adjust Rate Limiting

Edit `api/.env`:

```env
RATE_LIMIT_WINDOW_MS=900000      # 15 minutes in ms
RATE_LIMIT_MAX_REQUESTS=200      # Max requests per window
```

## 🔧 Configuration Files

| File | Purpose |
|------|---------|
| `package.json` | Frontend dependencies and scripts |
| `api/package.json` | API dependencies and scripts |
| `tsconfig.json` | TypeScript configuration |
| `vite.config.ts` | Vite build configuration |
| `tailwind.config.js` | Tailwind CSS styling |
| `.env` | Environment variables (create from `.env.example`) |

## 📁 Key Files

| File | Purpose |
|------|---------|
| `src/lib/textGenerator.ts` | Core text generation engine |
| `src/App.tsx` | Main application component |
| `src/components/ControlPanel.tsx` | User controls |
| `src/components/OutputDisplay.tsx` | Text preview |
| `api/src/routes/generator.ts` | Text generation API |
| `api/src/routes/presets.ts` | Preset management API |

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Find process using port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Find process using port 3000 (Mac/Linux)
lsof -ti:3000 | xargs kill -9
```

### Build Errors

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# For API
cd api
rm -rf node_modules package-lock.json
npm install
```

### CORS Errors

Check `api/.env`:
```env
CORS_ORIGIN=http://localhost:3000
```

### TypeScript Errors

```bash
# Check TypeScript
npx tsc --noEmit

# VS Code: Restart TS Server
Ctrl+Shift+P > "TypeScript: Restart TS Server"
```

## 🌐 URLs

| Service | URL |
|---------|-----|
| Frontend Dev | http://localhost:3000 |
| API Dev | http://localhost:3001 |
| API Health | http://localhost:3001/health |
| API Docs | http://localhost:3001/api |

## 📊 Generation Types

| Type | Description | Count Range |
|------|-------------|-------------|
| `paragraphs` | Generate full paragraphs | 1-20 |
| `sentences` | Generate sentences | 1-20 |
| `words` | Generate words | 1-500 |
| `characters` | Generate characters | 1-1000 |

## 🎯 Themes

| Theme | Use Case |
|-------|----------|
| `general` | Generic placeholder text |
| `technology` | Tech/software content |
| `ui` | User interface mockups |
| `design` | Design projects |
| `business` | Business documents |
| `mixed` | Combination of all |

## 📝 Output Formats

| Format | Extension | Description |
|--------|-----------|-------------|
| `plain` | .txt | Plain text |
| `html` | .html | HTML with RTL support |
| `json` | .json | JSON with metadata |
| `markdown` | .md | Markdown format |

## 🔑 Environment Variables

### Frontend (.env)
```env
VITE_API_URL=http://localhost:3001
```

### Backend (api/.env)
```env
PORT=3001
NODE_ENV=development
JWT_SECRET=your-secret-key
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
CORS_ORIGIN=http://localhost:3000
```

## 📦 Useful NPM Scripts

```bash
npm run dev         # Start dev server
npm run build       # Build for production
npm run preview     # Preview production build
npm test           # Run tests
npm run lint       # Lint code
```

## 🐳 Docker Commands

```bash
docker-compose up              # Start all services
docker-compose up -d           # Start in background
docker-compose down            # Stop all services
docker-compose logs -f         # View logs
docker-compose build           # Rebuild images
```

## 📚 Documentation Files

- `README.md` - Main documentation
- `API_DOCS.md` - Complete API reference
- `DEPLOYMENT.md` - Deployment guide
- `CONTRIBUTING.md` - How to contribute
- `SECURITY.md` - Security policy
- `PROJECT_SUMMARY.md` - Project overview
- `QUICK_REFERENCE.md` - This file!

## 🆘 Getting Help

1. Check documentation files
2. Search existing GitHub issues
3. Create new issue with details
4. Email: support@example.com

---

**Keep this file handy for quick reference!** 📌
