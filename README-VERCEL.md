# Earl's Landscaping - Vercel Deployment Guide

## Environment Variables

Set these in Vercel Dashboard → Project Settings → Environment Variables:

### Required
```
MONGO_URL=mongodb+srv://user:password@cluster.mongodb.net/earls
DB_NAME=earls_prod
JWT_SECRET=your-super-secret-jwt-key-min-32-characters
```

### Admin Credentials
```
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD=your_secure_password
```

### Optional (Email Notifications)
```
RESEND_API_KEY=re_xxxxxxxxxxxxxx
SENDER_EMAIL=info@earlslandscaping.ca
CORS_ORIGINS=https://earlscrmprod.vercel.app,http://localhost:3000
```

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/` | GET | API health check |
| `/api/status` | GET/POST | Status checks |
| `/api/leads` | POST | Submit new lead |
| `/api/promo-banner` | GET | Get promo banner |
| `/api/auth/login` | POST | Admin login |
| `/api/auth/verify` | GET | Verify token |
| `/api/admin/leads` | GET | List all leads (auth) |
| `/api/admin/analytics` | GET | Dashboard analytics (auth) |

## Admin Login

1. Go to `/admin/login`
2. Enter credentials from env vars
3. Access dashboard at `/admin`

## Frontend Structure

- `frontend/` - React app
- `backend/` - FastAPI Python
- `vercel.json` - Deployment config

## Troubleshooting 404 Errors

If API returns 404:
1. Check Functions tab in Vercel dashboard
2. Confirm Python runtime is recognized
3. Test direct function URL if available
4. Split frontend/backend to separate projects if needed
