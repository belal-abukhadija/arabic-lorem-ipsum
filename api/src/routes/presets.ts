import express from 'express';
import { z } from 'zod';

const router = express.Router();

// In-memory storage for presets (in production, use a database)
const presets = new Map<string, any>();

// Validation schema
const PresetSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().optional(),
  options: z.object({
    type: z.enum(['paragraphs', 'sentences', 'words', 'characters']),
    count: z.number().min(1).max(1000),
    format: z.enum(['plain', 'html', 'json', 'markdown']),
    theme: z.enum(['general', 'technology', 'ui', 'design', 'content', 'business', 'mixed']),
    includePunctuation: z.boolean().optional(),
    preventRepetition: z.boolean().optional(),
    customKeywords: z.array(z.string()).optional(),
    startWithClassic: z.boolean().optional(),
    minWordsPerSentence: z.number().optional(),
    maxWordsPerSentence: z.number().optional(),
  })
});

/**
 * GET /api/presets
 * Get all presets
 */
router.get('/', (req, res) => {
  const allPresets = Array.from(presets.entries()).map(([id, preset]) => ({
    id,
    ...preset
  }));
  
  res.json({
    success: true,
    data: allPresets,
    count: allPresets.length
  });
});

/**
 * POST /api/presets
 * Create a new preset
 */
router.post('/', (req, res) => {
  try {
    const preset = PresetSchema.parse(req.body);
    const id = `preset_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const newPreset = {
      ...preset,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    presets.set(id, newPreset);
    
    res.status(201).json({
      success: true,
      data: {
        id,
        ...newPreset
      }
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: 'Validation error',
        details: error.errors
      });
    }
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

/**
 * GET /api/presets/:id
 * Get a specific preset
 */
router.get('/:id', (req, res) => {
  const preset = presets.get(req.params.id);
  
  if (!preset) {
    return res.status(404).json({
      success: false,
      error: 'Preset not found'
    });
  }
  
  res.json({
    success: true,
    data: {
      id: req.params.id,
      ...preset
    }
  });
});

/**
 * DELETE /api/presets/:id
 * Delete a preset
 */
router.delete('/:id', (req, res) => {
  const deleted = presets.delete(req.params.id);
  
  if (!deleted) {
    return res.status(404).json({
      success: false,
      error: 'Preset not found'
    });
  }
  
  res.json({
    success: true,
    message: 'Preset deleted successfully'
  });
});

export default router;
