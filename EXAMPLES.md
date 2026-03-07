# Examples and Use Cases

This document provides practical examples of using the Arabic Lorem Ipsum Generator in various scenarios.

## Table of Contents
1. [Web Interface Examples](#web-interface-examples)
2. [API Examples](#api-examples)
3. [Integration Examples](#integration-examples)
4. [Real-World Use Cases](#real-world-use-cases)

---

## Web Interface Examples

### Example 1: Generate Blog Post Placeholder

**Settings:**
- Type: Paragraphs
- Count: 5
- Format: HTML
- Theme: General
- Include Punctuation: Yes
- Prevent Repetition: Yes

**Use Case:** Fill a blog post template with realistic Arabic content.

---

### Example 2: UI Component Labels

**Settings:**
- Type: Words
- Count: 50
- Format: Plain
- Theme: UI
- Custom Keywords: "زر، قائمة، نافذة"

**Use Case:** Generate placeholder labels for UI mockups.

---

### Example 3: Product Descriptions

**Settings:**
- Type: Sentences
- Count: 10
- Format: Markdown
- Theme: Business
- Min Words: 8
- Max Words: 15

**Use Case:** Create placeholder product descriptions.

---

## API Examples

### Example 1: Basic Text Generation

```javascript
// Generate 3 paragraphs of general Arabic text
const response = await fetch('http://localhost:3001/api/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    type: 'paragraphs',
    count: 3,
    format: 'plain',
    theme: 'general',
    includePunctuation: true,
    preventRepetition: true
  })
});

const result = await response.json();
console.log(result.data.text);
console.log('Word count:', result.data.metadata.wordCount);
```

**Output:**
```
{
  "success": true,
  "data": {
    "text": "النظام يعمل على تطوير البرنامج بشكل فعال...",
    "metadata": {
      "wordCount": 145,
      "characterCount": 892,
      "sentenceCount": 12,
      "paragraphCount": 3,
      "theme": "general",
      "format": "plain"
    }
  }
}
```

---

### Example 2: Technology Blog Content

```javascript
// Generate tech-focused content with custom keywords
const response = await fetch('http://localhost:3001/api/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    type: 'paragraphs',
    count: 4,
    format: 'html',
    theme: 'technology',
    includePunctuation: true,
    preventRepetition: true,
    customKeywords: ['API', 'السحابة', 'البيانات', 'التشفير'],
    minWordsPerSentence: 8,
    maxWordsPerSentence: 15
  })
});

const result = await response.json();
```

**Use Case:** Fill a technology blog template with relevant placeholder text.

---

### Example 3: UI Mockup Data

```javascript
// Generate JSON data for UI components
const response = await fetch('http://localhost:3001/api/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    type: 'sentences',
    count: 10,
    format: 'json',
    theme: 'ui',
    includePunctuation: true,
    customKeywords: ['المستخدم', 'الواجهة', 'التصميم']
  })
});

const result = await response.json();
const data = JSON.parse(result.data.text);
```

---

### Example 4: Quick Generation

```javascript
// Quick generation with defaults
const response = await fetch(
  'http://localhost:3001/api/generate/quick?count=5&type=sentences'
);

const result = await response.json();
console.log(result.data.text);
```

---

### Example 5: Save and Use Presets

```javascript
// Save a preset
const savePreset = await fetch('http://localhost:3001/api/presets', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Tech Blog Template',
    description: 'Settings for technology blog posts',
    options: {
      type: 'paragraphs',
      count: 5,
      format: 'html',
      theme: 'technology',
      includePunctuation: true,
      preventRepetition: true,
      customKeywords: ['API', 'التطبيق'],
      minWordsPerSentence: 8,
      maxWordsPerSentence: 15
    }
  })
});

const preset = await savePreset.json();
console.log('Preset ID:', preset.data.id);

// List all presets
const presets = await fetch('http://localhost:3001/api/presets');
const allPresets = await presets.json();
console.log(allPresets.data);

// Use a saved preset (retrieve and apply)
const getPreset = await fetch(`http://localhost:3001/api/presets/${preset.data.id}`);
const savedPreset = await getPreset.json();

// Generate using preset settings
const generate = await fetch('http://localhost:3001/api/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(savedPreset.data.options)
});
```

---

## Integration Examples

### Example 1: React Component

```typescript
import React, { useState } from 'react';
import { generateArabicLoremIpsum } from './lib/textGenerator';

function TextPlaceholder() {
  const [text, setText] = useState('');

  const generateText = () => {
    const { formatted } = generateArabicLoremIpsum({
      type: 'sentences',
      count: 5,
      format: 'plain',
      theme: 'general',
      includePunctuation: true,
      preventRepetition: true
    });
    setText(formatted);
  };

  return (
    <div>
      <button onClick={generateText}>Generate</button>
      <p dir="rtl" className="arabic-text">{text}</p>
    </div>
  );
}
```

---

### Example 2: Next.js API Route

```typescript
// pages/api/lorem.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { generateArabicLoremIpsum } from '@/lib/textGenerator';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { formatted, result } = generateArabicLoremIpsum(req.body);

  res.status(200).json({
    text: formatted,
    metadata: result.metadata
  });
}
```

---

### Example 3: Express Middleware

```typescript
import express from 'express';
import { generateArabicLoremIpsum } from './textGenerator';

const app = express();

app.use('/placeholder', (req, res, next) => {
  const { formatted } = generateArabicLoremIpsum({
    type: 'sentences',
    count: 3,
    format: 'plain',
    theme: 'general',
    includePunctuation: true,
    preventRepetition: true
  });

  req.placeholder = formatted;
  next();
});
```

---

### Example 4: Vue 3 Composable

```typescript
// composables/useArabicLorem.ts
import { ref } from 'vue';
import { generateArabicLoremIpsum } from '@/lib/textGenerator';

export function useArabicLorem() {
  const text = ref('');
  const loading = ref(false);

  const generate = async (options) => {
    loading.value = true;
    const { formatted } = generateArabicLoremIpsum(options);
    text.value = formatted;
    loading.value = false;
  };

  return { text, loading, generate };
}
```

---

### Example 5: CLI Tool

```javascript
#!/usr/bin/env node
// bin/arabic-lorem.js

const { generateArabicLoremIpsum } = require('../dist/lib/textGenerator');

const args = process.argv.slice(2);
const count = parseInt(args[0]) || 3;
const type = args[1] || 'paragraphs';

const { formatted } = generateArabicLoremIpsum({
  type,
  count,
  format: 'plain',
  theme: 'general',
  includePunctuation: true,
  preventRepetition: true
});

console.log(formatted);
```

**Usage:**
```bash
node bin/arabic-lorem.js 5 sentences
```

---

## Real-World Use Cases

### Use Case 1: E-Commerce Product Catalog

**Scenario:** Fill 100 product cards with Arabic placeholder descriptions.

```javascript
const products = [];

for (let i = 0; i < 100; i++) {
  const { formatted } = generateArabicLoremIpsum({
    type: 'sentences',
    count: 3,
    format: 'plain',
    theme: 'business',
    includePunctuation: true,
    preventRepetition: true,
    customKeywords: ['منتج', 'جودة', 'سعر'],
    minWordsPerSentence: 6,
    maxWordsPerSentence: 12
  });

  products.push({
    id: i + 1,
    name: `Product ${i + 1}`,
    description: formatted
  });
}
```

---

### Use Case 2: News Website Template

**Scenario:** Generate placeholder articles for a news website.

```javascript
async function generateNewsArticles(count) {
  const articles = [];

  for (let i = 0; i < count; i++) {
    // Generate headline
    const headline = await fetch('http://localhost:3001/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'sentences',
        count: 1,
        format: 'plain',
        theme: 'general',
        minWordsPerSentence: 5,
        maxWordsPerSentence: 8
      })
    });

    // Generate article body
    const body = await fetch('http://localhost:3001/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'paragraphs',
        count: 5,
        format: 'html',
        theme: 'general',
        includePunctuation: true
      })
    });

    const headlineData = await headline.json();
    const bodyData = await body.json();

    articles.push({
      id: i + 1,
      headline: headlineData.data.text,
      body: bodyData.data.text,
      author: 'مؤلف مجهول',
      date: new Date().toISOString()
    });
  }

  return articles;
}
```

---

### Use Case 3: Mobile App UI Testing

**Scenario:** Generate test data for mobile app screens.

```typescript
interface UserProfile {
  name: string;
  bio: string;
  status: string;
}

async function generateUserProfiles(count: number): Promise<UserProfile[]> {
  const profiles: UserProfile[] = [];

  for (let i = 0; i < count; i++) {
    // Generate name (2-3 words)
    const nameRes = await fetch('http://localhost:3001/api/generate/quick?count=2&type=words');
    const nameData = await nameRes.json();

    // Generate bio (3 sentences)
    const bioRes = await fetch('http://localhost:3001/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'sentences',
        count: 3,
        format: 'plain',
        theme: 'general'
      })
    });
    const bioData = await bioRes.json();

    // Generate status (1 sentence)
    const statusRes = await fetch('http://localhost:3001/api/generate/quick?count=1&type=sentences');
    const statusData = await statusRes.json();

    profiles.push({
      name: nameData.data.text.trim(),
      bio: bioData.data.text,
      status: statusData.data.text
    });
  }

  return profiles;
}
```

---

### Use Case 4: Email Template Testing

**Scenario:** Fill email templates with Arabic content for testing.

```javascript
const emailTemplate = {
  subject: '',
  greeting: '',
  body: '',
  closing: '',
  signature: ''
};

async function fillEmailTemplate() {
  // Subject
  const subject = await fetch('http://localhost:3001/api/generate/quick?count=1&type=sentences');
  emailTemplate.subject = (await subject.json()).data.text;

  // Greeting
  emailTemplate.greeting = 'السلام عليكم،';

  // Body
  const body = await fetch('http://localhost:3001/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type: 'paragraphs',
      count: 2,
      format: 'plain',
      theme: 'business',
      includePunctuation: true
    })
  });
  emailTemplate.body = (await body.json()).data.text;

  // Closing
  emailTemplate.closing = 'مع أطيب التحيات،';

  return emailTemplate;
}
```

---

### Use Case 5: Design System Documentation

**Scenario:** Generate placeholder text for typography showcases.

```javascript
const typographySamples = {
  h1: '', h2: '', h3: '', h4: '', h5: '', h6: '',
  paragraph: '',
  blockquote: '',
  list: []
};

async function generateTypographySamples() {
  // Headings (short sentences)
  for (let level = 1; level <= 6; level++) {
    const res = await fetch('http://localhost:3001/api/generate/quick?count=1&type=sentences');
    const data = await res.json();
    typographySamples[`h${level}`] = data.data.text;
  }

  // Paragraph
  const paraRes = await fetch('http://localhost:3001/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type: 'sentences',
      count: 5,
      format: 'plain',
      theme: 'design'
    })
  });
  typographySamples.paragraph = (await paraRes.json()).data.text;

  // Blockquote
  const quoteRes = await fetch('http://localhost:3001/api/generate/quick?count=2&type=sentences');
  typographySamples.blockquote = (await quoteRes.json()).data.text;

  // List items
  for (let i = 0; i < 5; i++) {
    const itemRes = await fetch('http://localhost:3001/api/generate/quick?count=1&type=sentences');
    typographySamples.list.push((await itemRes.json()).data.text);
  }

  return typographySamples;
}
```

---

## Performance Tips

### Tip 1: Batch Requests

```javascript
// Instead of multiple sequential requests
// Use Promise.all for parallel requests

const [headlines, bodies, summaries] = await Promise.all([
  fetch('http://localhost:3001/api/generate', { /* headline config */ }),
  fetch('http://localhost:3001/api/generate', { /* body config */ }),
  fetch('http://localhost:3001/api/generate', { /* summary config */ })
]);
```

---

### Tip 2: Cache Results

```javascript
const cache = new Map();

async function getCachedText(key, options) {
  if (cache.has(key)) {
    return cache.get(key);
  }

  const response = await fetch('http://localhost:3001/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(options)
  });

  const result = await response.json();
  cache.set(key, result.data.text);

  return result.data.text;
}
```

---

### Tip 3: Use Quick Endpoint for Simple Cases

```javascript
// For simple, default generation, use the quick endpoint
const response = await fetch('http://localhost:3001/api/generate/quick?count=3');
// Faster than POST with full options
```

---

## Error Handling Examples

```javascript
async function safeGenerate(options) {
  try {
    const response = await fetch('http://localhost:3001/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(options)
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error);
    }

    return result.data;
  } catch (error) {
    console.error('Generation failed:', error);
    // Fallback to client-side generation or default text
    return { text: 'النص الافتراضي', metadata: {} };
  }
}
```

---

**More examples and use cases coming soon!** 🚀
