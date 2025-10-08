# Vercel CLI Deployment Instructions

## Install Vercel CLI
npm install -g vercel

## Login to Vercel
vercel login

## Navigate to frontend directory
cd frontend

## Deploy to Vercel
vercel --prod

## When prompted, answer:
# Set up and deploy? Yes
# Which scope? (select your account)
# Link to existing project? No
# What's your project name? assign-project-frontend (or your choice)
# In which directory is your code? ./ (it's already in frontend)
# Want to override settings? No

## Add environment variable (if not added during setup)
vercel env add NEXT_PUBLIC_API_URL production

# When prompted, enter: https://assign-project-3xs4.onrender.com/api

## Deploy again to apply env variable
vercel --prod
