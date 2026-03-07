import express from 'express';
import { z } from 'zod';
import { generateArabicLoremIpsum } from '../../src/lib/textGenerator.js';

const router = express.Router();

// Validation schema
const GenerateSchema = z.object({
  type: z.enum(['paragraphs', 'sentences', 'words', 'characters']),
  count: z.number().min(1).max(1000),
  format: z.enum(['plain', 'html', 'json', 'markdown']),
  theme: z.enum(['general', 'technology', 'ui', 'design', 'content', 'business', 'mixed']),
  includePunctuation: z.boolean().optional().default(true),
  preventRepetition: z.boolean().optional().default(true),
  customKeywords: z.array(z.string()).optional().default([]),
  startWithClassic: z.boolean().optional().default(false),
  minWordsPerSentence: z.number().min(3).max(20).optional().default(5),
  maxWordsPerSentence: z.number().min(5).max(30).optional().default(15),
});

/**
 * POST /api/generate
 * Generate Arabic lorem ipsum text
 */
router.post('/', async (req, res, next) => {
  try {
    // Validate request body
    const options = GenerateSchema.parse(req.body);
    
    // Generate text
    const { formatted, result } = generateArabicLoremIpsum(options);
    
    // Return response
    res.json({
      success: true,
      data: {
        text: formatted,
        metadata: result.metadata
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: 'Validation error',
        details: error.errors
      });
    }
    next(error);
  }
});

/**
 * GET /api/generate/quick
 * Quick generation with default settings
 */
router.get('/quick', (req, res) => {
  const count = parseInt(req.query.count as string) || 3;
  const type = (req.query.type as string) || 'paragraphs';
  
  const { formatted, result } = generateArabicLoremIpsum({
    type: type as any,
    count,
    format: 'plain',
    theme: 'general',
    includePunctuation: true,
    preventRepetition: true,
  });
  
  res.json({
    success: true,
    data: {
      text: formatted,
      metadata: result.metadata
    }
  });
});

export default router;
