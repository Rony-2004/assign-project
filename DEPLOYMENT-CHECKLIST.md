# Production Deployment Checklist

Use this checklist to ensure your deployment is configured correctly.

## Pre-Deployment

### Code Preparation
- [ ] All code committed and pushed to GitHub
- [ ] No sensitive data (API keys, passwords) in code
- [ ] `.env` files are in `.gitignore`
- [ ] `.env.example` files are up to date
- [ ] All tests passing locally
- [ ] Build succeeds locally (`npm run build` in both frontend and backend)

### Environment Setup
- [ ] GitHub repository is public or connected to Render/Vercel
- [ ] Render account created and verified
- [ ] Vercel account created and verified
- [ ] PostgreSQL database provider chosen (Render, Neon, Supabase, etc.)

## Backend Deployment (Render)

### Database Setup
- [ ] PostgreSQL database created
- [ ] Database connection string copied
- [ ] SSL/TLS enabled on database connection
- [ ] Database accessible from Render servers

### Service Configuration
- [ ] Web service created on Render
- [ ] Repository connected
- [ ] Branch set to `master` (or your main branch)
- [ ] Root directory set to `backend`
- [ ] Runtime set to Node
- [ ] Build command: `npm install && npm run build && npm run db:migrate`
- [ ] Start command: `npm start`
- [ ] Health check path set to `/api/health`

### Environment Variables
- [ ] `NODE_ENV` = `production`
- [ ] `PORT` = `3001`
- [ ] `HOST` = `0.0.0.0`
- [ ] `DATABASE_URL` = `<your-database-connection-string>`
- [ ] `CORS_ORIGIN` = `*` (temporarily, will update after frontend)
- [ ] `JWT_SECRET` = `<random-secure-string>`
- [ ] `RATE_LIMIT_MAX` = `100`
- [ ] `RATE_LIMIT_WINDOW` = `60000`
- [ ] `LOG_LEVEL` = `info`

### Deployment Verification
- [ ] First deployment completed successfully
- [ ] Service is running (check dashboard)
- [ ] Backend URL noted down: `https://_____.onrender.com`
- [ ] Health endpoint works: `curl https://_____.onrender.com/api/health`
- [ ] Expected response: `{"status":"healthy","database":"connected",...}`

## Frontend Deployment (Vercel)

### Project Configuration
- [ ] Project imported from GitHub
- [ ] Root directory set to `frontend`
- [ ] Framework preset: Next.js (auto-detected)
- [ ] Build command: `npm run build` (default)
- [ ] Output directory: `.next` (default)
- [ ] Install command: `npm install` (default)

### Environment Variables
- [ ] `NEXT_PUBLIC_API_URL` = `https://your-backend.onrender.com/api`
  - Replace with actual Render backend URL

### Deployment Verification
- [ ] First deployment completed successfully
- [ ] Frontend URL noted down: `https://_____.vercel.app`
- [ ] Site loads in browser
- [ ] No console errors in browser DevTools

## Post-Deployment Configuration

### Update CORS Settings
- [ ] Go to Render backend service
- [ ] Update `CORS_ORIGIN` environment variable
- [ ] New value: `https://your-app.vercel.app` (your actual Vercel URL)
- [ ] Optional: Add multiple origins separated by commas if needed
- [ ] Service redeployed automatically
- [ ] Wait for redeploy to complete

### Final Testing

#### Backend Tests
- [ ] Health check: `GET /api/health` returns 200
- [ ] List ideas: `GET /api/ideas` returns 200
- [ ] CORS headers present in responses
- [ ] Rate limiting working (make 100+ requests)

#### Frontend Tests
- [ ] Landing page loads correctly
- [ ] Can navigate to Idea Board (`/app`)
- [ ] Empty state shows when no ideas exist
- [ ] Can create a new idea
- [ ] New idea appears in the list
- [ ] Can upvote an idea
- [ ] Upvote count increases immediately
- [ ] Ideas sorted by date (newest first)
- [ ] Mobile responsive design works
- [ ] No console errors

#### Integration Tests
- [ ] Frontend successfully calls backend API
- [ ] No CORS errors in browser console
- [ ] Data persists (refresh page, data still there)
- [ ] Real-time polling updates (create idea in another tab)

## Performance & Monitoring

### Performance
- [ ] Page load time < 3 seconds
- [ ] API response time < 500ms (after cold start)
- [ ] Images and assets optimized
- [ ] Lighthouse score checked (aim for 90+)

### Monitoring Setup
- [ ] Render dashboard bookmarked
- [ ] Vercel dashboard bookmarked
- [ ] Backend logs accessible
- [ ] Frontend logs accessible
- [ ] Health check URL saved for monitoring

### Optional Monitoring
- [ ] Uptime monitoring service configured (UptimeRobot, etc.)
- [ ] Error tracking service added (Sentry, etc.)
- [ ] Analytics added (Google Analytics, Plausible, etc.)

## Documentation

- [ ] `DEPLOYMENT.md` reviewed
- [ ] README.md updated with live URLs
- [ ] Environment variables documented
- [ ] Known issues documented
- [ ] Architecture diagram reviewed

## Security

- [ ] No secrets exposed in client-side code
- [ ] HTTPS enabled (automatic on Render & Vercel)
- [ ] Rate limiting verified
- [ ] Input validation working
- [ ] CORS properly configured (not using `*` in production)
- [ ] SQL injection protected (using Drizzle ORM)
- [ ] XSS protection enabled (Helmet configured)

## Backup & Recovery

- [ ] Database backup strategy in place
- [ ] Rollback procedure understood
- [ ] Previous deployment version accessible
- [ ] Critical data backed up

## Optional Enhancements

- [ ] Custom domain configured (frontend)
- [ ] Custom domain configured (backend)
- [ ] SSL certificates verified
- [ ] CDN configured for static assets
- [ ] Database connection pooling optimized
- [ ] CI/CD pipeline configured
- [ ] Staging environment created
- [ ] Load testing performed

## Maintenance Plan

- [ ] Update schedule planned
- [ ] Dependency update strategy defined
- [ ] Security patch procedure defined
- [ ] Backup restoration tested
- [ ] Incident response plan created

## Common Issues Resolution

### Backend won't start
- Check DATABASE_URL is correct
- Verify all environment variables are set
- Check build logs for errors
- Ensure migrations ran successfully

### Frontend can't connect to backend
- Verify NEXT_PUBLIC_API_URL is correct
- Check CORS settings on backend
- Ensure backend is running
- Check browser console for errors

### Database connection failed
- Verify DATABASE_URL format
- Check if SSL is required
- Ensure database is accessible from Render
- Check database provider dashboard

### CORS errors
- Update CORS_ORIGIN on backend
- Include full URL with protocol (https://)
- Don't include trailing slashes
- Allow multiple origins if needed

### Cold start issues (Render free tier)
- Expected behavior after 15min inactivity
- First request takes 30-60 seconds
- Consider paid tier for always-on service
- Implement keep-alive ping if needed

## Sign-Off

- [ ] Development team reviewed
- [ ] QA testing completed
- [ ] Performance benchmarks met
- [ ] Security checklist completed
- [ ] Documentation updated
- [ ] Stakeholders notified

---

**Deployment Date:** _______________

**Deployed By:** _______________

**Backend URL:** _______________

**Frontend URL:** _______________

**Database Provider:** _______________

**Notes:** 
_______________________________________________
_______________________________________________
_______________________________________________
