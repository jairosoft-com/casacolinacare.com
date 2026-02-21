# Deployment Guide: Vercel + Docker

## 🚀 **Option 1: Vercel Deployment (Fastest)**

### **Why Vercel?**

- ✅ Built by Next.js creators (optimal performance)
- ✅ Zero configuration deployment
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Preview deployments for PRs
- ✅ Free tier (generous limits)

---

### **Vercel Deployment Steps**

#### **Method 1: GitHub Integration (Recommended)**

1. **Push your code to GitHub**

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/your-repo.git
git push -u origin main
```

1. **Connect to Vercel**

- Go to [vercel.com](https://vercel.com)
- Sign in with GitHub
- Click "Add New Project"
- Import your GitHub repository
- Vercel auto-detects Next.js settings
- Click "Deploy"

1. **Configure Environment Variables** (if needed)

- In Vercel dashboard → Settings → Environment Variables
- Add:

  ```text
  NEXT_PUBLIC_API_BASE_URL=https://api.example.com
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
  CLERK_SECRET_KEY=sk_...
  ```

1. **Done! 🎉**

- Your app is live at `https://your-project.vercel.app`
- Auto-deploys on every push to main
- Preview URLs for PRs

---

#### **Method 2: Vercel CLI**

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Follow prompts:
# - Link to existing project? No
# - Project name: nextjs-starter
# - Directory: ./
# - Override settings? No

# Production deployment
vercel --prod
```

---

### **Vercel Configuration File** (Optional)

Create `vercel.json` for advanced configuration:

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["iad1"],
  "env": {
    "NEXT_PUBLIC_API_BASE_URL": "@api-base-url"
  },
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "no-store, must-revalidate"
        }
      ]
    }
  ]
}
```

---

## 🐳 **Option 2: Docker Deployment**

### **Why Docker?**

- ✅ Self-hosted deployment
- ✅ Consistent environments
- ✅ Works on any cloud (AWS, GCP, Azure, DigitalOcean)
- ✅ Local development parity
- ✅ Full control

---

### **Docker Setup**

#### **1. Create Dockerfile**

```dockerfile
# Dockerfile
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set environment variables for build
ENV NEXT_TELEMETRY_DISABLED 1

# Build the application
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Set correct permissions
RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

#### **2. Create .dockerignore**

```text
# .dockerignore
node_modules
.next
.git
.gitignore
README.md
.env*.local
npm-debug.log
.DS_Store
*.pem
.vscode
.idea
```

#### **3. Update next.config.ts**

Add standalone output:

```typescript
// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'standalone', // ← Add this for Docker
  eslint: {
    dirs: ['src', 'tests'],
  },
  experimental: {},
};

export default nextConfig;
```

#### **4. Create docker-compose.yml**

```yaml
# docker-compose.yml
services:
  nextjs-app:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - '3000:3000'
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_API_BASE_URL=${NEXT_PUBLIC_API_BASE_URL}
      - NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=${NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      - CLERK_SECRET_KEY=${CLERK_SECRET_KEY}
    restart: unless-stopped
    networks:
      - app-network

networks:
  app-network:
    driver: bridge
```

#### **5. Create .env.production**

```bash
# .env.production
NEXT_PUBLIC_API_BASE_URL=https://api.example.com
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...
```

#### **6. Build and Run**

```bash
# Build the Docker image
docker build -t nextjs-starter .

# Run the container
docker run -p 3000:3000 --env-file .env.production nextjs-starter

# Or use docker-compose
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

---

## 📊 **Comparison: Vercel vs Docker**

| Feature             | Vercel         | Docker                  |
| ------------------- | -------------- | ----------------------- |
| **Setup Time**      | 5 minutes      | 30 minutes              |
| **Cost (Hobby)**    | Free           | $5-20/month (VPS)       |
| **Automatic HTTPS** | ✅ Yes         | ⚠️ Manual (nginx/Caddy) |
| **CDN**             | ✅ Global      | ❌ No (unless added)    |
| **Auto-scaling**    | ✅ Yes         | ⚠️ Manual               |
| **Preview Deploys** | ✅ Yes         | ❌ No                   |
| **Control**         | ⚠️ Limited     | ✅ Full                 |
| **Vendor Lock-in**  | ⚠️ Yes         | ❌ No                   |
| **Best For**        | Startups, MVPs | Enterprise, self-hosted |

---

## 🎯 **Recommended Approach**

### **For Your Project:**

1. **Start with Vercel** ✅
   - Deploy immediately
   - Get feedback fast
   - No infrastructure management
   - Free for hobby projects

2. **Keep Docker Ready** ✅
   - For future migration if needed
   - For local production testing
   - For enterprise requirements later

### **Hybrid Approach (Best of Both Worlds)**

```bash
# Development
npm run dev

# Staging (Vercel preview)
git push origin feature-branch
# → Auto-deployed to preview URL

# Production Option 1 (Vercel)
git push origin main
# → Auto-deployed to production

# Production Option 2 (Docker/Self-hosted)
docker-compose up -d
```

---

## 🚀 **Quick Start Commands**

### **Vercel Deployment**

```bash
# One-time setup
npm install -g vercel
vercel login

# Deploy to production
vercel --prod
```

### **Docker Deployment**

```bash
# Build
docker build -t nextjs-starter .

# Run
docker run -p 3000:3000 --env-file .env.production nextjs-starter

# Or with docker-compose
docker-compose up -d
```

---

## 📝 **Post-Deployment Checklist**

### **Vercel**

- [ ] Domain configured (optional)
- [ ] Environment variables set
- [ ] Preview deployments working
- [ ] Automatic deployments on push
- [ ] Analytics enabled (optional)

### **Docker**

- [ ] Container running
- [ ] Health checks passing
- [ ] Logs accessible
- [ ] Backup strategy in place
- [ ] SSL certificate configured (if self-hosted)
- [ ] Reverse proxy configured (nginx/Caddy)

---

## 🔧 **Troubleshooting**

### **Vercel Issues**

**Build fails:**

```bash
# Check build logs in Vercel dashboard
# Ensure all dependencies are in package.json
# Check environment variables
```

**Environment variables not working:**

```bash
# Redeploy after adding env vars
vercel --prod --force
```

### **Docker Issues**

**Container won't start:**

```bash
# Check logs
docker logs <container-id>

# Rebuild without cache
docker build --no-cache -t nextjs-starter .
```

**Port already in use:**

```bash
# Change port in docker-compose.yml
ports:
  - "3001:3000"  # External:Internal
```

---

## 🎉 **Summary**

**Quick Start (Recommended):**

1. Deploy to Vercel now (5 minutes)
2. Keep Docker config for later
3. Migrate to Docker when needed (enterprise/self-hosted)

**Files Created:**

- ✅ `Dockerfile`
- ✅ `.dockerignore`
- ✅ `docker-compose.yml`
- ✅ `.env.production`
- ✅ `vercel.json` (optional)

**Next Steps:**

1. Push to GitHub
2. Connect to Vercel
3. Add environment variables
4. Deploy! 🚀
