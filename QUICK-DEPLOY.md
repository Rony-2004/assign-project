# Quick Deployment Guide

## 🚀 Deploy in 10 Minutes

### Step 1: Prepare Your Repository (2 min)

```bash
# Commit all changes
git add .
git commit -m "Prepare for production deployment"
git push origin master
```

### Step 2: Deploy Backend on Render (4 min)

1. **Create Database:**
   - Go to: https://dashboard.render.com/
   - Click: **New +** → **PostgreSQL**
   - Name: `idea-board-db`
   - Plan: **Free**
   - Click: **Create Database**
   - ⏱️ Wait ~1 minute for provisioning
   - Copy: **Internal Database URL**

2. **Deploy Backend:**
   - Click: **New +** → **Blueprint**
   - Select: Your GitHub repository
   - Click: **Apply**
   - Go to: Your service → **Environment**
   - Add variables:
     ```
     DATABASE_URL = <paste-internal-database-url>
     CORS_ORIGIN = *
     ```
   - ⏱️ Wait ~2-3 minutes for deployment

3. **Get Backend URL:**
   - Copy your backend URL (e.g., `https://idea-board-backend.onrender.com`)

### Step 3: Deploy Frontend on Vercel (3 min)

1. **Deploy Project:**
   - Go to: https://vercel.com/dashboard
   - Click: **Add New...** → **Project**
   - Import: Your GitHub repository
   - Configure:
     - **Root Directory:** `frontend`
     - **Framework:** Next.js ✓
   - Add Environment Variable:
     ```
     NEXT_PUBLIC_API_URL = https://your-backend.onrender.com/api
     ```
     (Replace with your actual Render URL)
   - Click: **Deploy**
   - ⏱️ Wait ~1-2 minutes

2. **Get Frontend URL:**
   - Copy your frontend URL (e.g., `https://idea-board.vercel.app`)

### Step 4: Update CORS (1 min)

1. Go back to Render dashboard
2. Open your backend service
3. Go to **Environment** tab
4. Update `CORS_ORIGIN`:
   ```
   CORS_ORIGIN = https://your-app.vercel.app
   ```
   (Replace with your actual Vercel URL)
5. Save (service auto-redeploys)

### Step 5: Test Everything ✅

**Test Backend:**
```bash
curl https://your-backend.onrender.com/api/health
```

Expected:
```json
{"status":"healthy","database":"connected"}
```

**Test Frontend:**
1. Open: `https://your-app.vercel.app`
2. Create a test idea
3. Upvote it
4. ✅ Success!

---

## 📋 URLs to Save

- **Frontend:** https://_____________________________.vercel.app
- **Backend:** https://_____________________________.onrender.com
- **Database:** Render Dashboard → PostgreSQL

---

## 🔧 Common Issues

### "Service unavailable" on first request
- **Cause:** Render free tier spins down after 15min
- **Solution:** Wait 30-60 seconds, refresh

### "CORS error" in browser console
- **Cause:** CORS_ORIGIN not updated
- **Solution:** Update in Render → Environment → CORS_ORIGIN

### "Database connection failed"
- **Cause:** Wrong DATABASE_URL
- **Solution:** Copy **Internal** Database URL from Render

### Can't create ideas
- **Cause:** Frontend can't reach backend
- **Solution:** Check NEXT_PUBLIC_API_URL in Vercel settings

---

## 💡 Pro Tips

1. **Bookmark dashboards:**
   - Render: https://dashboard.render.com/
   - Vercel: https://vercel.com/dashboard

2. **Monitor logs:**
   - Render: Service → Logs
   - Vercel: Project → Deployments → [Latest] → Function Logs

3. **Auto-deploy on push:**
   - Both platforms redeploy automatically when you push to GitHub

4. **Free tier limits:**
   - Render: 750 hours/month, spins down after 15min
   - Vercel: 100 GB bandwidth/month

5. **Keep backend alive (optional):**
   - Use a cron service to ping your backend every 14 minutes
   - Example: cron-job.org, UptimeRobot

---

## 🎉 You're Done!

Your app is now live and accessible worldwide!

**Share your app:** Send the Vercel URL to friends

**Monitor uptime:** Check Render dashboard regularly

**Update code:** Just push to GitHub - auto-deploys!

---

**Need detailed help?** See [DEPLOYMENT.md](./DEPLOYMENT.md)

**Having issues?** See [DEPLOYMENT-CHECKLIST.md](./DEPLOYMENT-CHECKLIST.md)
