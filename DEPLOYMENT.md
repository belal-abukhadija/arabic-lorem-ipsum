# Deployment Guide

This guide covers deploying the Arabic Lorem Ipsum Generator to various platforms.

## Table of Contents
1. [Frontend Deployment](#frontend-deployment)
2. [API Deployment](#api-deployment)
3. [Full Stack Deployment](#full-stack-deployment)
4. [Environment Configuration](#environment-configuration)
5. [Monitoring and Maintenance](#monitoring-and-maintenance)

---

## Frontend Deployment

### Option 1: Vercel (Recommended)

**Advantages**: Zero configuration, automatic deployments, global CDN, free tier

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   cd text_gen
   vercel
   ```

3. **Production Deployment**
   ```bash
   vercel --prod
   ```

4. **Environment Variables** (in Vercel Dashboard)
   - `VITE_API_URL`: Your API endpoint

### Option 2: Netlify

1. **Install Netlify CLI**
   ```bash
   npm i -g netlify-cli
   ```

2. **Build**
   ```bash
   npm run build
   ```

3. **Deploy**
   ```bash
   netlify deploy --prod --dir=dist
   ```

4. **Netlify Configuration** (`netlify.toml`)
   ```toml
   [build]
     command = "npm run build"
     publish = "dist"
   
   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

### Option 3: Static Hosting (AWS S3, GitHub Pages, etc.)

1. **Build**
   ```bash
   npm run build
   ```

2. **Upload `dist/` folder** to your hosting provider

3. **Configure for SPA**
   - Ensure all routes redirect to `index.html`
   - Enable HTTPS
   - Set proper CORS headers

---

## API Deployment

### Option 1: Heroku

1. **Create `Procfile` in `api/` directory**
   ```
   web: node dist/index.js
   ```

2. **Deploy**
   ```bash
   cd api
   heroku create your-app-name
   heroku config:set NODE_ENV=production
   heroku config:set JWT_SECRET=your-secret-key
   git push heroku main
   ```

3. **Scale**
   ```bash
   heroku ps:scale web=1
   ```

### Option 2: Railway

1. **Install Railway CLI**
   ```bash
   npm i -g @railway/cli
   ```

2. **Initialize and Deploy**
   ```bash
   cd api
   railway login
   railway init
   railway up
   ```

3. **Set Environment Variables**
   ```bash
   railway variables set PORT=3001
   railway variables set NODE_ENV=production
   ```

### Option 3: Docker + Cloud Run (GCP)

1. **Create `Dockerfile` in `api/` directory**
   ```dockerfile
   FROM node:18-alpine
   
   WORKDIR /app
   
   COPY package*.json ./
   RUN npm ci --only=production
   
   COPY . .
   RUN npm run build
   
   EXPOSE 3001
   
   CMD ["node", "dist/index.js"]
   ```

2. **Build and Push**
   ```bash
   cd api
   gcloud builds submit --tag gcr.io/PROJECT_ID/arabic-lorem-api
   ```

3. **Deploy to Cloud Run**
   ```bash
   gcloud run deploy arabic-lorem-api \
     --image gcr.io/PROJECT_ID/arabic-lorem-api \
     --platform managed \
     --region us-central1 \
     --allow-unauthenticated
   ```

### Option 4: AWS Lambda (Serverless)

1. **Install Serverless Framework**
   ```bash
   npm i -g serverless
   ```

2. **Create `serverless.yml` in `api/` directory**
   ```yaml
   service: arabic-lorem-api
   
   provider:
     name: aws
     runtime: nodejs18.x
     region: us-east-1
   
   functions:
     api:
       handler: dist/lambda.handler
       events:
         - http:
             path: /{proxy+}
             method: ANY
   ```

3. **Create Lambda Handler** (`api/src/lambda.ts`)
   ```typescript
   import serverless from 'serverless-http';
   import app from './index.js';
   
   export const handler = serverless(app);
   ```

4. **Deploy**
   ```bash
   cd api
   serverless deploy
   ```

---

## Full Stack Deployment

### Option 1: Vercel (Frontend) + Railway (Backend)

**Frontend (Vercel)**
```bash
cd text_gen
vercel --prod
```

**Backend (Railway)**
```bash
cd api
railway up
```

**Connect Them**
- Set `VITE_API_URL` in Vercel to Railway API URL
- Set `CORS_ORIGIN` in Railway to Vercel frontend URL

### Option 2: Single Deployment with Vite Proxy

1. **Configure Vite Proxy** (`vite.config.ts`)
   ```typescript
   export default defineConfig({
     server: {
       proxy: {
         '/api': {
           target: 'http://localhost:3001',
           changeOrigin: true
         }
       }
     }
   });
   ```

2. **Deploy Both** to same server using reverse proxy (Nginx, Apache)

---

## Environment Configuration

### Frontend (.env.production)
```env
VITE_API_URL=https://api.yourdomain.com
```

### Backend (Production)
```env
NODE_ENV=production
PORT=3001
JWT_SECRET=your-very-secure-secret-key-min-32-chars
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
CORS_ORIGIN=https://yourdomain.com
```

### Security Checklist
- [ ] Change JWT_SECRET to strong random value
- [ ] Enable HTTPS everywhere
- [ ] Set proper CORS origins
- [ ] Use environment variables for secrets
- [ ] Enable rate limiting
- [ ] Set up monitoring
- [ ] Configure proper logging

---

## Monitoring and Maintenance

### Health Checks

**API Health Endpoint**
```
GET https://api.yourdomain.com/health
```

**Frontend Check**
- Monitor uptime with services like UptimeRobot
- Set up alerts for downtime

### Logging

**Backend Logging**
```typescript
// Add Winston or Pino for production logging
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});
```

### Performance Monitoring

**Recommended Tools**
- **Frontend**: Vercel Analytics, Google Analytics
- **Backend**: New Relic, DataDog, CloudWatch
- **Errors**: Sentry

### Backup Strategy

**Database** (when implemented)
- Automated daily backups
- Point-in-time recovery
- Offsite backup storage

**Configuration**
- Version control all config files
- Document environment variables
- Keep deployment scripts in repo

---

## Scaling Considerations

### Frontend
- Already on global CDN (Vercel/Netlify)
- No scaling needed - handled automatically

### Backend

**Horizontal Scaling**
```bash
# Heroku
heroku ps:scale web=3

# Docker/Kubernetes
kubectl scale deployment arabic-lorem-api --replicas=5
```

**Load Balancing**
- Use cloud provider load balancer
- Configure health checks
- Enable auto-scaling

**Caching**
- Add Redis for API response caching
- Cache commonly used presets
- CDN for static API documentation

---

## Troubleshooting

### Common Issues

**CORS Errors**
- Check `CORS_ORIGIN` environment variable
- Ensure protocol (http/https) matches

**Rate Limiting Too Aggressive**
- Adjust `RATE_LIMIT_MAX_REQUESTS`
- Implement API key system for higher limits

**Build Failures**
- Clear node_modules and reinstall
- Check Node.js version compatibility
- Verify all environment variables set

### Support

For deployment issues:
1. Check application logs
2. Verify environment variables
3. Test health endpoints
4. Review platform-specific documentation

---

## Cost Estimates

### Free Tier (Hobby/Development)
- Frontend: Vercel/Netlify (Free)
- Backend: Railway/Heroku (Free with limitations)
- **Total**: $0/month

### Production (Low Traffic)
- Frontend: Vercel Pro ($20/month)
- Backend: Railway ($5-10/month)
- Database: Supabase ($25/month if needed)
- **Total**: ~$50/month

### Production (High Traffic)
- Frontend: Vercel Enterprise (Custom)
- Backend: AWS/GCP with auto-scaling
- Database: Managed PostgreSQL
- Monitoring: DataDog/New Relic
- **Total**: $200-500/month

---

## Next Steps

After successful deployment:
1. Set up monitoring and alerts
2. Configure automated backups
3. Implement CI/CD pipeline
4. Add custom domain
5. Enable HTTPS
6. Set up error tracking
7. Configure analytics
8. Test under load
9. Document runbooks
10. Plan scaling strategy
