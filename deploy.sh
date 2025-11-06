#!/bin/bash
# deploy.sh - Script untuk deploy ke VPS

echo "🚀 Starting deployment to VPS..."

# Variables
VPS_IP="31.97.66.47"
VPS_USER="root"
APP_DIR="/var/www/E-Batik"

# Create deployment package
echo "📦 Creating deployment package..."
tar -czf deploy.tar.gz \
  --exclude=node_modules \
  --exclude=.next \
  --exclude=.git \
  --exclude=deploy.tar.gz \
  .

# Upload to VPS
echo "📤 Uploading to VPS..."
scp deploy.tar.gz $VPS_USER@$VPS_IP:/tmp/

# Execute deployment on VPS
echo "🔧 Executing deployment on VPS..."
ssh $VPS_USER@$VPS_IP << 'EOF'
  # Create app directory
  mkdir -p /var/www/E-Batik
  cd /var/www/E-Batik
  
  # Extract files
  tar -xzf /tmp/deploy.tar.gz
  rm /tmp/deploy.tar.gz
  
  # Stop existing containers
  docker-compose down
  
  # Build and start
  docker-compose up -d --build
  
  echo "✅ Deployment completed!"
EOF

# Cleanup
rm deploy.tar.gz

echo "🎉 Deployment finished!"