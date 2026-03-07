# ⚡ GETTING STARTED - 5 Minute Quickstart

## Step 1: Install Dependencies (2 minutes)

Open PowerShell in this directory and run:

```powershell
.\setup.ps1
```

This will:
✓ Check Node.js installation
✓ Install frontend dependencies
✓ Install API dependencies  
✓ Create .env files
✓ Run tests

**OR manually:**
```powershell
npm install
cd api
npm install
cd ..
```

## Step 2: Start the Application (30 seconds)

### Option A: Frontend Only (Fastest)
```powershell
npm run dev
```

Then open: **http://localhost:3000**

### Option B: Frontend + API (Full Features)

**Terminal 1 - Frontend:**
```powershell
npm run dev
```

**Terminal 2 - API:**
```powershell
cd api
npm run dev
```

Then open:
- Frontend: **http://localhost:3000**
- API: **http://localhost:3001**

## Step 3: Try It Out! (2 minutes)

### In the Web Interface:

1. **Generate Text**
   - Select "Paragraphs" 
   - Set count to 3
   - Choose theme "Technology"
   - Click "Generate New Text"

2. **Customize**
   - Try different themes
   - Adjust sentence length
   - Add custom keywords: "API, المشروع"
   - Toggle punctuation

3. **Export**
   - Click "Copy to Clipboard"
   - Try "Download" button
   - Switch formats (HTML, JSON, Markdown)

### Test the API:

**Quick Test (PowerShell):**
```powershell
$body = @{
    type = "sentences"
    count = 5
    format = "plain"
    theme = "technology"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3001/api/generate" `
    -Method Post `
    -ContentType "application/json" `
    -Body $body
```

**Or use cURL:**
```bash
curl -X POST http://localhost:3001/api/generate \
  -H "Content-Type: application/json" \
  -d "{\"type\":\"sentences\",\"count\":5,\"format\":\"plain\",\"theme\":\"technology\"}"
```

## Step 4: Explore Features (1 minute)

### Try These Cool Features:

1. **Theme-Based Generation**
   - Change theme to "UI" → Get UI-related terms
   - Change to "Design" → Get design terminology

2. **Custom Keywords**
   - Add keywords: "البرمجة, التطوير, API"
   - Generate text → See your keywords included

3. **Different Formats**
   - Select HTML → Get RTL-ready markup
   - Select JSON → Get structured data
   - Select Markdown → Get doc-ready text

4. **Stats Display**
   - Watch real-time word count
   - See character, sentence, paragraph counts

## Step 5: Check Health (30 seconds)

### Verify Everything Works:

**Frontend Health:**
- Open http://localhost:3000
- Should see the interface immediately
- No errors in browser console

**API Health:**
```powershell
Invoke-RestMethod http://localhost:3001/health
```

Should return:
```json
{
  "status": "ok",
  "timestamp": "2026-01-16T...",
  "uptime": 123.45
}
```

## Common First-Time Issues & Fixes

### Issue: Port 3000 already in use
**Fix:**
```powershell
# Find and kill process on port 3000
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F
```

### Issue: Port 3001 already in use
**Fix:**
```powershell
# Edit api/.env and change PORT
# PORT=3002
```

### Issue: Module not found errors
**Fix:**
```powershell
# Clean install
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

### Issue: TypeScript errors
**Fix:**
```powershell
# Restart TS server in VS Code
# Ctrl+Shift+P > "TypeScript: Restart TS Server"
```

## What to Try Next

### Beginner Tasks:
1. ✓ Generate 5 paragraphs of tech text
2. ✓ Copy and paste into a document
3. ✓ Download as HTML file
4. ✓ Try all 6 themes
5. ✓ Add your own custom keywords

### Intermediate Tasks:
1. ✓ Test all API endpoints
2. ✓ Create and save a preset
3. ✓ Generate 1000 words
4. ✓ Export in all 4 formats
5. ✓ Read API_DOCS.md

### Advanced Tasks:
1. ✓ Modify text generation logic
2. ✓ Add a new theme vocabulary
3. ✓ Create a new component
4. ✓ Write additional tests
5. ✓ Deploy to production

## Quick Command Reference

```powershell
# Development
npm run dev              # Start frontend
cd api && npm run dev    # Start API

# Testing
npm test                 # Run tests
npm run test:watch       # Watch mode

# Building
npm run build            # Build frontend
cd api && npm run build  # Build API

# Production
npm run preview          # Preview build
cd api && npm start      # Run API production

# Docker
docker-compose up        # Start all services
docker-compose down      # Stop services
```

## Browser Shortcuts

| Key | Action |
|-----|--------|
| Tab | Navigate controls |
| Ctrl+C | Copy (after selecting) |
| Ctrl+Enter | Generate (when focused) |
| Esc | Close modals |

## File Locations to Know

```
📁 Source Code
   src/App.tsx              → Main app
   src/lib/textGenerator.ts → Generation engine
   src/components/          → UI components

📁 API
   api/src/index.ts         → API server
   api/src/routes/          → API endpoints

📁 Configuration
   package.json             → Dependencies
   .env                     → Environment vars
   tailwind.config.js       → Styling

📁 Documentation
   README.md                → Main docs
   API_DOCS.md              → API reference
   QUICK_REFERENCE.md       → Commands
```

## Screenshots to Verify Success

### ✓ Frontend Working:
You should see:
- Header with "Arabic Lorem Ipsum Generator"
- Control panel on the left
- Output display on the right
- Statistics cards showing counts
- Action buttons (Generate, Copy, Download)
- Arabic text preview

### ✓ API Working:
You should see in terminal:
```
🚀 API Server running on http://localhost:3001
📚 API Documentation: http://localhost:3001/api
💚 Health check: http://localhost:3001/health
```

## Next Documentation to Read

1. **First:** README.md (Complete overview)
2. **Second:** QUICK_REFERENCE.md (All commands)
3. **Third:** API_DOCS.md (If using API)
4. **Fourth:** EXAMPLES.md (Use cases)
5. **Fifth:** DEPLOYMENT.md (When ready to deploy)

## Getting Help

### Built-in Help:
- Check terminal for error messages
- Open browser console (F12) for frontend errors
- Check API logs in second terminal

### Documentation:
- README.md - General help
- API_DOCS.md - API issues
- DEPLOYMENT.md - Deployment issues
- PROJECT_SUMMARY.md - What's included

### Common Questions:

**Q: Can I use without the API?**
A: Yes! Frontend works standalone.

**Q: What Node version do I need?**
A: Node.js 18 or higher.

**Q: Is it production ready?**
A: Yes! See DEPLOYMENT.md to deploy.

**Q: Can I customize it?**
A: Absolutely! All code is yours to modify.

**Q: What license?**
A: MIT License - use freely!

---

## 🎉 You're All Set!

You now have a fully functional Arabic Lorem Ipsum Generator!

**What you can do:**
✅ Generate unlimited Arabic text
✅ Customize every aspect
✅ Export in multiple formats
✅ Use via web interface or API
✅ Deploy to production
✅ Modify and extend

**Time to first text: < 30 seconds**
**Time to master: Unlimited possibilities!**

---

**Need help?** Check documentation files or open an issue.

**Ready to deploy?** See DEPLOYMENT.md

**Want to contribute?** See CONTRIBUTING.md

**Enjoy your new SaaS application! 🚀**
