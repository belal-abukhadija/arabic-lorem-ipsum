# Arabic Lorem Ipsum Generator

A professional, highly customizable SaaS application for generating realistic Arabic placeholder text (lorem ipsum) with advanced features for designers, developers, and content creators.

![Arabic Lorem Ipsum Generator](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue.svg)
![React](https://img.shields.io/badge/React-18.2-blue.svg)

## 🌟 Features

### Core Functionality
- **Realistic Arabic Text Generation**: Generates grammatically structured Arabic text with proper conjunctions, prepositions, and particles
- **Multiple Output Types**: Generate by paragraphs, sentences, words, or character count
- **Theme-Based Vocabularies**: Choose from General, Technology, UI/UX, Design, Business, or Mixed themes
- **Advanced Customization**:
  - Adjustable sentence length (min/max words)
  - Custom keyword injection
  - Punctuation control
  - Word repetition prevention
  - Option to start with classic Lorem Ipsum

### Output Formats
- **Plain Text**: Clean, copy-ready text
- **HTML**: Properly formatted with RTL support and semantic tags
- **JSON**: Structured data with metadata
- **Markdown**: Ready for documentation

### User Experience
- **Real-time Preview**: See changes instantly as you adjust settings
- **Statistics Display**: Live word, sentence, paragraph, and character counts
- **One-Click Actions**: Copy to clipboard and download in various formats
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **RTL Support**: Proper right-to-left text direction for Arabic

### Developer Features
- **REST API**: Programmatic access to text generation
- **Rate Limiting**: Built-in protection against abuse
- **Presets System**: Save and reuse favorite configurations
- **CORS Support**: Easy integration with any frontend

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm/yarn
- Modern web browser with JavaScript enabled

### Frontend Setup

1. **Clone and Install**
```bash
cd text_gen
npm install
```

2. **Start Development Server**
```bash
npm run dev
```

3. **Open in Browser**
```
http://localhost:3000
```

### API Server Setup (Optional)

1. **Navigate to API Directory**
```bash
cd api
npm install
```

2. **Configure Environment**
```bash
cp .env.example .env
# Edit .env with your settings
```

3. **Start API Server**
```bash
npm run dev
```

4. **API Available At**
```
http://localhost:3001
```

## 📖 Usage

### Web Interface

1. **Select Generation Type**: Choose between paragraphs, sentences, words, or characters
2. **Adjust Count**: Use the slider to set how much text to generate
3. **Choose Theme**: Select vocabulary theme (General, Technology, UI, etc.)
4. **Pick Output Format**: Plain, HTML, JSON, or Markdown
5. **Customize**: Fine-tune sentence length, add keywords, toggle punctuation
6. **Generate**: Click "Generate New Text" or adjust settings for auto-generation
7. **Export**: Copy to clipboard or download as file

### API Usage

#### Generate Text

**POST** `/api/generate`

```json
{
  "type": "paragraphs",
  "count": 3,
  "format": "html",
  "theme": "technology",
  "includePunctuation": true,
  "preventRepetition": true,
  "customKeywords": ["المشروع", "التطبيق"],
  "minWordsPerSentence": 5,
  "maxWordsPerSentence": 15
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "text": "...",
    "metadata": {
      "wordCount": 145,
      "characterCount": 892,
      "sentenceCount": 12,
      "paragraphCount": 3,
      "theme": "technology",
      "format": "html"
    }
  },
  "timestamp": "2026-01-16T10:30:00.000Z"
}
```

#### Quick Generation

**GET** `/api/generate/quick?count=5&type=sentences`

Returns plain text with default settings.

#### Save Preset

**POST** `/api/presets`

```json
{
  "name": "Tech Blog Posts",
  "description": "Settings for technology blog placeholder text",
  "options": {
    "type": "paragraphs",
    "count": 5,
    "format": "html",
    "theme": "technology",
    "includePunctuation": true,
    "preventRepetition": true
  }
}
```

#### List Presets

**GET** `/api/presets`

#### Get Preset

**GET** `/api/presets/:id`

#### Delete Preset

**DELETE** `/api/presets/:id`

## 🏗️ Architecture

### Technology Stack

**Frontend:**
- React 18 with TypeScript
- Vite for blazing-fast builds
- Tailwind CSS for styling
- Lucide React for icons

**Backend API:**
- Node.js with Express
- TypeScript for type safety
- Zod for validation
- JWT for authentication (ready)
- Rate limiting with express-rate-limit

**Testing:**
- Jest for unit testing
- High test coverage for core generation logic

### Project Structure

```
text_gen/
├── src/
│   ├── components/          # React components
│   │   ├── Header.tsx
│   │   ├── ControlPanel.tsx
│   │   ├── OutputDisplay.tsx
│   │   └── StatsBar.tsx
│   ├── lib/
│   │   └── textGenerator.ts # Core generation engine
│   ├── __tests__/           # Unit tests
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
├── api/
│   └── src/
│       ├── routes/          # API routes
│       ├── middleware/      # Express middleware
│       └── index.ts         # API server
├── public/                  # Static assets
└── dist/                    # Production build

```

## 🧪 Testing

### Run All Tests
```bash
npm test
```

### Run Tests in Watch Mode
```bash
npm run test:watch
```

### Test Coverage
```bash
npm test -- --coverage
```

Current coverage: 70%+ across all modules

## 📦 Build for Production

### Frontend
```bash
npm run build
```

Output in `dist/` directory, ready for static hosting.

### API
```bash
cd api
npm run build
npm start
```

## 🚢 Deployment

### Frontend Deployment

**Vercel/Netlify (Recommended)**
1. Connect your repository
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Deploy!

**Static Hosting**
```bash
npm run build
# Upload dist/ folder to your hosting
```

### API Deployment

**Heroku**
```bash
cd api
heroku create your-app-name
git push heroku main
```

**Docker**
```bash
cd api
docker build -t arabic-lorem-api .
docker run -p 3001:3001 arabic-lorem-api
```

**Serverless (AWS Lambda, Vercel Functions)**
- API is lightweight and works great with serverless
- Adjust index.ts to export handler function

## 🔐 Environment Variables

### Frontend (.env)
```env
VITE_API_URL=http://localhost:3001
```

### Backend (api/.env)
```env
PORT=3001
NODE_ENV=production
JWT_SECRET=your-secure-secret-key
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
CORS_ORIGIN=https://yourdomain.com
```

## 🎨 Customization

### Adding New Themes

Edit `src/lib/textGenerator.ts`:

```typescript
const ARABIC_WORDS = {
  nouns: {
    // ... existing themes
    yourtheme: [
      'كلمة١', 'كلمة٢', 'كلمة٣'
      // Add your vocabulary
    ]
  }
};
```

### Styling

Tailwind configuration in `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: { /* your brand colors */ }
    }
  }
}
```

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes with tests
4. Submit a pull request

## 📄 License

MIT License - feel free to use in commercial and personal projects.

## 🆘 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/arabic-lorem/issues)
- **Email**: support@example.com
- **Docs**: Full API documentation at `/api/docs`

## 🎯 Roadmap

- [ ] User authentication and saved presets
- [ ] Multi-language support (French, Spanish, etc.)
- [ ] Advanced API features (webhooks, batch generation)
- [ ] Premium themes and vocabularies
- [ ] Browser extension
- [ ] Figma/Sketch plugins

## 👏 Acknowledgments

- Inspired by traditional Lorem Ipsum generators
- Arabic language structure research
- React and TypeScript communities

---

**Built with ❤️ for the Arabic-speaking design and development community**
