import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import generatorRouter from './routes/generator.js';
import presetsRouter from './routes/presets.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', limiter);

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// API Routes
app.use('/api/generate', generatorRouter);
app.use('/api/presets', presetsRouter);

// API Documentation
app.get('/api', (req, res) => {
  res.json({
    name: 'Arabic Lorem Ipsum Generator API',
    version: '1.0.0',
    endpoints: {
      generate: 'POST /api/generate - Generate Arabic placeholder text',
      presets: {
        list: 'GET /api/presets - Get all presets',
        create: 'POST /api/presets - Create a new preset',
        get: 'GET /api/presets/:id - Get a specific preset',
        delete: 'DELETE /api/presets/:id - Delete a preset'
      }
    },
    documentation: '/api/docs'
  });
});

// Error handling
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 API Server running on http://localhost:${PORT}`);
  console.log(`📚 API Documentation: http://localhost:${PORT}/api`);
  console.log(`💚 Health check: http://localhost:${PORT}/health`);
});

export default app;
