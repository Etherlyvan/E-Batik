#!/bin/bash
# deploy.sh - Fixed version

set -e  # Exit on error

echo "🚀 Starting deployment to VPS..."

# Variables
VPS_IP="31.97.66.47"
VPS_USER="root"
APP_DIR="/var/www/E-Batik"

# Check if package-lock.json exists
if [ ! -f "package-lock.json" ]; then
    echo "⚠️  package-lock.json not found. Generating..."
    npm install
fi

# Create deployment package
echo "📦 Creating deployment package..."
tar -czf deploy.tar.gz \
  --exclude=node_modules \
  --exclude=.next \
  --exclude=.git \
  --exclude=deploy.tar.gz \
  --exclude=certbot \
  .

# Check if tar was successful
if [ ! -f "deploy.tar.gz" ]; then
    echo "❌ Failed to create deployment package"
    exit 1
fi

echo "📤 Uploading to VPS ($(du -h deploy.tar.gz | cut -f1))..."
scp deploy.tar.gz $VPS_USER@$VPS_IP:/tmp/deploy.tar.gz

# Execute deployment on VPS
echo "🔧 Executing deployment on VPS..."
ssh $VPS_USER@$VPS_IP << 'ENDSSH'
  set -e
  
  echo "📂 Preparing directory..."
  mkdir -p /var/www/E-Batik
  cd /var/www/E-Batik
  
  echo "📦 Extracting files..."
  tar -xzf /tmp/deploy.tar.gz
  rm /tmp/deploy.tar.gz
  
  echo "🧹 Cleaning up old containers..."
  # Force remove old containers and networks
  docker-compose down --remove-orphans || true
  docker network prune -f || true
  
  echo "🏗️  Building and starting containers..."
  docker-compose up -d --build --force-recreate
  
  echo "⏳ Waiting for services to start..."
  sleep 10
  
  echo "📊 Checking container status..."
  docker-compose ps
  
  echo "✅ Deployment completed!"
ENDSSH

# Cleanup local file
rm deploy.tar.gz

echo ""
echo "🎉 Deployment finished successfully!"
echo ""
echo "📝 Next steps:"
echo "   1. Check logs: ssh $VPS_USER@$VPS_IP 'cd $APP_DIR && docker-compose logs -f'"
echo "   2. Visit: http://$VPS_IP:3000"
echo ""