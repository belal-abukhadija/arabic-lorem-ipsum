# API Documentation

## Base URL
```
http://localhost:3001/api
```

## Authentication
Currently, the API is open. Authentication will be added in future versions for premium features.

## Rate Limiting
- **Window**: 15 minutes
- **Max Requests**: 100 per IP address
- **Headers**: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`

## Endpoints

### 1. Generate Text

Generate Arabic lorem ipsum text with full customization.

**Endpoint:** `POST /api/generate`

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "type": "paragraphs" | "sentences" | "words" | "characters",
  "count": number,                    // 1-1000
  "format": "plain" | "html" | "json" | "markdown",
  "theme": "general" | "technology" | "ui" | "design" | "business" | "mixed",
  "includePunctuation": boolean,      // Optional, default: true
  "preventRepetition": boolean,       // Optional, default: true
  "customKeywords": string[],         // Optional, default: []
  "startWithClassic": boolean,        // Optional, default: false
  "minWordsPerSentence": number,      // Optional, default: 5
  "maxWordsPerSentence": number       // Optional, default: 15
}
```

**Example Request:**
```bash
curl -X POST http://localhost:3001/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "type": "paragraphs",
    "count": 3,
    "format": "html",
    "theme": "technology",
    "includePunctuation": true,
    "preventRepetition": true,
    "customKeywords": ["API", "السحابة"]
  }'
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "text": "Generated text content...",
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

**Error Response (400 Bad Request):**
```json
{
  "success": false,
  "error": "Validation error",
  "details": [
    {
      "path": ["count"],
      "message": "Number must be greater than or equal to 1"
    }
  ]
}
```

---

### 2. Quick Generate

Quick text generation with default settings.

**Endpoint:** `GET /api/generate/quick`

**Query Parameters:**
- `count` (optional): Number of items to generate (default: 3)
- `type` (optional): Type of generation (default: "paragraphs")

**Example Request:**
```bash
curl http://localhost:3001/api/generate/quick?count=5&type=sentences
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "text": "Generated text...",
    "metadata": {
      "wordCount": 65,
      "characterCount": 389,
      "sentenceCount": 5,
      "paragraphCount": 1,
      "theme": "general",
      "format": "plain"
    }
  }
}
```

---

### 3. List Presets

Get all saved presets.

**Endpoint:** `GET /api/presets`

**Example Request:**
```bash
curl http://localhost:3001/api/presets
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "preset_1705401234567_abc123",
      "name": "Tech Blog Posts",
      "description": "Settings for technology blog placeholder text",
      "options": {
        "type": "paragraphs",
        "count": 5,
        "format": "html",
        "theme": "technology",
        "includePunctuation": true,
        "preventRepetition": true
      },
      "createdAt": "2026-01-16T10:00:00.000Z",
      "updatedAt": "2026-01-16T10:00:00.000Z"
    }
  ],
  "count": 1
}
```

---

### 4. Create Preset

Save a new preset configuration.

**Endpoint:** `POST /api/presets`

**Request Body:**
```json
{
  "name": "My Preset",
  "description": "Optional description",
  "options": {
    "type": "paragraphs",
    "count": 3,
    "format": "plain",
    "theme": "general",
    "includePunctuation": true,
    "preventRepetition": true,
    "customKeywords": [],
    "startWithClassic": false,
    "minWordsPerSentence": 5,
    "maxWordsPerSentence": 15
  }
}
```

**Success Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": "preset_1705401234567_abc123",
    "name": "My Preset",
    "description": "Optional description",
    "options": { /* ... */ },
    "createdAt": "2026-01-16T10:30:00.000Z",
    "updatedAt": "2026-01-16T10:30:00.000Z"
  }
}
```

---

### 5. Get Preset

Retrieve a specific preset by ID.

**Endpoint:** `GET /api/presets/:id`

**Example Request:**
```bash
curl http://localhost:3001/api/presets/preset_1705401234567_abc123
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "preset_1705401234567_abc123",
    "name": "Tech Blog Posts",
    "options": { /* ... */ },
    "createdAt": "2026-01-16T10:00:00.000Z",
    "updatedAt": "2026-01-16T10:00:00.000Z"
  }
}
```

**Error Response (404 Not Found):**
```json
{
  "success": false,
  "error": "Preset not found"
}
```

---

### 6. Delete Preset

Delete a preset by ID.

**Endpoint:** `DELETE /api/presets/:id`

**Example Request:**
```bash
curl -X DELETE http://localhost:3001/api/presets/preset_1705401234567_abc123
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Preset deleted successfully"
}
```

---

### 7. Health Check

Check API server status.

**Endpoint:** `GET /health`

**Example Request:**
```bash
curl http://localhost:3001/health
```

**Success Response (200 OK):**
```json
{
  "status": "ok",
  "timestamp": "2026-01-16T10:30:00.000Z",
  "uptime": 3600.5
}
```

---

## Error Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created (for POST requests) |
| 400 | Bad Request - Invalid input |
| 404 | Not Found - Resource doesn't exist |
| 429 | Too Many Requests - Rate limit exceeded |
| 500 | Internal Server Error |

## Response Format

All API responses follow this structure:

**Success:**
```json
{
  "success": true,
  "data": { /* response data */ },
  "timestamp": "ISO 8601 timestamp"
}
```

**Error:**
```json
{
  "success": false,
  "error": "Error message",
  "details": "Additional error information (optional)"
}
```

## Code Examples

### JavaScript/TypeScript

```typescript
async function generateArabicText() {
  const response = await fetch('http://localhost:3001/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      type: 'paragraphs',
      count: 3,
      format: 'html',
      theme: 'technology',
      includePunctuation: true,
      preventRepetition: true
    })
  });
  
  const data = await response.json();
  console.log(data.data.text);
}
```

### Python

```python
import requests

url = "http://localhost:3001/api/generate"
payload = {
    "type": "paragraphs",
    "count": 3,
    "format": "plain",
    "theme": "general",
    "includePunctuation": True,
    "preventRepetition": True
}

response = requests.post(url, json=payload)
data = response.json()
print(data['data']['text'])
```

### cURL

```bash
curl -X POST http://localhost:3001/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "type": "sentences",
    "count": 5,
    "format": "plain",
    "theme": "ui",
    "includePunctuation": true
  }'
```

## Best Practices

1. **Respect Rate Limits**: Monitor `X-RateLimit-*` headers
2. **Handle Errors**: Always check `success` field in responses
3. **Validate Input**: Follow schema requirements to avoid 400 errors
4. **Cache Results**: Cache generated text when appropriate
5. **Use Appropriate Themes**: Choose themes matching your use case

## Support

For API issues or questions:
- GitHub Issues: [Link to repository]
- Email: api-support@example.com
- Documentation: http://localhost:3001/api
