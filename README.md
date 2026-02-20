# Here are your Instructions

Linux Deployment Instructions
Here's how to deploy your Earl's Landscaping app on a Linux server:

Prerequisites
Ubuntu 20.04+ server
Node.js 18+, Python 3.10+, MongoDB installed
Domain name (optional)
1. Clone & Setup
# Clone your repo
git clone <your-repo-url>
cd your-app

# Backend setup
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Frontend setup
cd ../frontend
yarn install
yarn build
2. Configure Environment
# Backend .env
MONGO_URL="mongodb://localhost:27017"
DB_NAME="earls_landscaping"
RESEND_API_KEY="re_your_key"
JWT_SECRET="your-secret-key"

# Frontend .env
REACT_APP_BACKEND_URL="https://yourdomain.com"
3. Run with PM2 (Process Manager)
# Install PM2
npm install -g pm2

# Start backend
cd backend
pm2 start "uvicorn server:app --host 0.0.0.0 --port 8001" --name backend

# Serve frontend (use nginx or serve)
npm install -g serve
cd ../frontend
pm2 start "serve -s build -l 3000" --name frontend
4. Nginx Reverse Proxy
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
    }

    location /api {
        proxy_pass http://localhost:8001;
    }
}
5. SSL (Let's Encrypt)
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
