# Deployment Guide

This guide will help you deploy the Idea Board application with the backend on Render and the frontend on Vercel.

## Prerequisites

- GitHub account (for connecting to Render and Vercel)
- Your repository pushed to GitHub
- Render account (free tier available)
- Vercel account (free tier available)

## Backend Deployment (Render)

### Option 1: Using render.yaml (Recommended)

1. **Create a PostgreSQL Database on Render**
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click "New +" → "PostgreSQL"
   - Choose a name (e.g., `idea-board-db`)
   - Select the Free plan
   - Click "Create Database"
   - Copy the **Internal Database URL** (starts with `postgresql://`)

2. **Deploy Backend Service**
   - Click "New +" → "Blueprint"
   - Connect your GitHub repository
   - Render will detect the `render.yaml` file
   - Click "Apply"
   - Go to your service settings and add environment variables:
     - `DATABASE_URL`: Paste the Internal Database URL from step 1
     - `CORS_ORIGIN`: Will be updated after deploying frontend (use `*` temporarily)

3. **Get Your Backend URL**
   - After deployment completes, copy your backend URL
   - Format: `https://your-backend-name.onrender.com`

### Option 2: Manual Setup

1. Create PostgreSQL database (same as Option 1, step 1)

2. **Create Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name**: `idea-board-backend` (or your choice)
     - **Region**: Choose closest to you
     - **Branch**: `master` (or your main branch)
     - **Root Directory**: `backend`
     - **Runtime**: Node
     - **Build Command**: `npm install && npm run build && npm run db:migrate`
     - **Start Command**: `npm start`
     - **Plan**: Free

3. **Add Environment Variables**
   - Go to "Environment" tab
   - Add all variables from `backend/.env.example`:
     ```
     NODE_ENV=production
     PORT=3001
     HOST=0.0.0.0
     DATABASE_URL=<your-database-url>
     CORS_ORIGIN=*
     JWT_SECRET=<generate-a-secure-random-string>
     RATE_LIMIT_MAX=100
     RATE_LIMIT_WINDOW=60000
     LOG_LEVEL=info
     ```

4. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Copy your backend URL

## Frontend Deployment (Vercel)

### Option 1: Using vercel.json (Recommended)

1. **Deploy to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New..." → "Project"
   - Import your GitHub repository
   - Configure:
     - **Framework Preset**: Next.js
     - **Root Directory**: `frontend`
     - Click "Edit" next to "Build and Output Settings":
       - **Build Command**: `npm run build`
       - **Output Directory**: `.next`
       - **Install Command**: `npm install`

2. **Add Environment Variable**
   - In "Environment Variables" section:
     - **Key**: `NEXT_PUBLIC_API_URL`
     - **Value**: `https://your-backend-name.onrender.com/api`
     - (Use the backend URL from Render deployment)
   - Click "Deploy"

3. **Get Your Frontend URL**
   - After deployment, copy your frontend URL
   - Format: `https://your-app-name.vercel.app`

4. **Update Backend CORS**
   - Go back to Render dashboard
   - Open your backend service
   - Go to "Environment" tab
   - Update `CORS_ORIGIN` to your Vercel URL:
     ```
     CORS_ORIGIN=https://your-app-name.vercel.app
     ```
   - Save changes (service will redeploy)

### Option 2: Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy from frontend directory**
   ```bash
   cd frontend
   vercel --prod
   ```

4. **Add environment variable during deployment**
   - When prompted, add:
     ```
     NEXT_PUBLIC_API_URL=https://your-backend-name.onrender.com/api
     ```

## Post-Deployment Steps

### 1. Test Your Deployment

**Backend Health Check:**
```bash
curl https://your-backend-name.onrender.com/api/health
```

Expected response:
```json
{
  "status": "healthy",
  "timestamp": "2024-...",
  "uptime": 123.456,
  "database": "connected"
}
```

**Frontend:**
- Open your Vercel URL in a browser
- Create a test idea
- Verify it appears in the list
- Test the upvote functionality

### 2. Update CORS Settings

Make sure your backend's `CORS_ORIGIN` includes your frontend URL:
```
CORS_ORIGIN=https://your-app-name.vercel.app,https://your-app-name-*.vercel.app
```

### 3. Set up Custom Domain (Optional)

**Vercel:**
- Go to Project Settings → Domains
- Add your custom domain
- Follow DNS configuration instructions

**Render:**
- Go to Service Settings → Custom Domains
- Add your custom domain
- Update DNS records as instructed

### 4. Monitor Your Application

**Render:**
- Check logs: Service → Logs
- Monitor metrics: Service → Metrics
- Set up alerts in Service Settings

**Vercel:**
- Check deployment logs: Deployments → Select deployment → View Function Logs
- Monitor analytics: Analytics tab
- Check real-time logs: `vercel logs`

## Environment Variables Reference

### Backend (Render)

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `production` |
| `PORT` | Server port | `3001` |
| `HOST` | Server host | `0.0.0.0` |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host/db` |
| `CORS_ORIGIN` | Allowed frontend origins | `https://app.vercel.app` |
| `JWT_SECRET` | Secret for JWT tokens | `<random-string>` |
| `RATE_LIMIT_MAX` | Max requests per window | `100` |
| `RATE_LIMIT_WINDOW` | Rate limit window (ms) | `60000` |
| `LOG_LEVEL` | Logging level | `info` |

### Frontend (Vercel)

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | `https://backend.onrender.com/api` |

## Troubleshooting

### Backend Issues

**Database Connection Failed:**
- Verify `DATABASE_URL` is correct
- Check if database is running
- Ensure SSL is enabled in connection string if required

**CORS Errors:**
- Verify `CORS_ORIGIN` includes your frontend URL
- Check for trailing slashes (should not have them)
- Try using wildcard temporarily: `*`

**Build Failures:**
- Check build logs in Render dashboard
- Ensure all dependencies are in `package.json`
- Verify TypeScript compiles locally: `npm run build`

**Service Won't Start:**
- Check `Start Command` is correct: `npm start`
- Verify `dist/server.js` exists after build
- Check environment variables are set

### Frontend Issues

**API Calls Failing:**
- Verify `NEXT_PUBLIC_API_URL` is correct
- Check browser console for CORS errors
- Test backend endpoint directly

**Build Failures:**
- Check build logs in Vercel dashboard
- Ensure `NODE_VERSION` is compatible (use .nvmrc if needed)
- Verify build works locally: `npm run build`

**Environment Variable Not Working:**
- Ensure variable name starts with `NEXT_PUBLIC_`
- Redeploy after adding environment variables
- Check spelling and casing

### Free Tier Limitations

**Render Free Tier:**
- Services spin down after 15 minutes of inactivity
- First request after spin-down may take 30-60 seconds
- Limited to 750 hours per month (will stop at end of month)

**Vercel Free Tier:**
- 100 GB bandwidth per month
- 6000 build minutes per month
- Serverless function execution limited to 10 seconds

## Continuous Deployment

Both Render and Vercel automatically redeploy when you push to your connected branch:

1. Make changes to your code
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Your changes"
   git push origin master
   ```
3. Render and Vercel will automatically detect changes and redeploy

## Rollback

### Render:
- Go to Service → Events
- Click "Rollback" on a previous successful deployment

### Vercel:
- Go to Deployments
- Click on a previous deployment
- Click "Promote to Production"

## Production Best Practices

1. **Use PostgreSQL from a reliable provider:**
   - Render PostgreSQL (free tier available)
   - Neon (free tier with excellent performance)
   - Supabase (free tier)
   - Railway (paid but reliable)

2. **Set up monitoring:**
   - Use Render's built-in logging and metrics
   - Consider adding Sentry for error tracking
   - Set up uptime monitoring (UptimeRobot, Pingdom)

3. **Implement proper secrets management:**
   - Never commit `.env` files
   - Use strong random strings for secrets
   - Rotate secrets periodically

4. **Set up a staging environment:**
   - Create separate services for staging
   - Use different database instances
   - Test changes before deploying to production

5. **Enable HTTPS everywhere:**
   - Both Render and Vercel provide free SSL
   - Ensure `CORS_ORIGIN` uses `https://`

## Cost Optimization

**Free Tier Strategy:**
- Use Render free tier for backend (with limitations)
- Use Vercel free tier for frontend
- Use Neon or Supabase free tier for PostgreSQL
- Total: $0/month

**Recommended Paid Setup** (if traffic grows):
- Render: $7/month for always-on service
- Neon: $19/month for higher limits
- Vercel: Free tier usually sufficient
- Total: ~$26/month

## Support Resources

- **Render Docs**: https://render.com/docs
- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Fastify Docs**: https://fastify.dev/

## Quick Commands Reference

### Local Development
```bash
# Backend
cd backend
npm install
npm run dev

# Frontend
cd frontend
npm install
npm run dev
```

### Build & Test
```bash
# Backend
cd backend
npm run build
npm run db:migrate
npm start

# Frontend
cd frontend
npm run build
npm start
```

### View Logs
```bash
# Render (requires Render CLI)
render logs <service-name>

# Vercel
vercel logs <deployment-url>
```

---

**Need Help?** Check the troubleshooting section above or refer to the official documentation for each platform.
