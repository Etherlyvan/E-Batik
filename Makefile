# Makefile
.PHONY: build dev up down logs clean restart health

# Production
build:
	docker-compose build --no-cache

up:
	docker-compose up -d

down:
	docker-compose down

restart:
	docker-compose restart

# Development
dev:
	docker-compose -f docker-compose.dev.yml up

dev-build:
	docker-compose -f docker-compose.dev.yml build

dev-down:
	docker-compose -f docker-compose.dev.yml down

# Logs
logs:
	docker-compose logs -f

logs-app:
	docker-compose logs -f app

logs-nginx:
	docker-compose logs -f nginx

logs-redis:
	docker-compose logs -f redis

# Database operations
db-push:
	docker-compose exec app npx prisma db push

db-seed:
	docker-compose exec app npm run seed

db-studio:
	docker-compose exec app npx prisma studio

# Nginx operations
nginx-reload:
	docker-compose exec nginx nginx -s reload

nginx-test:
	docker-compose exec nginx nginx -t

# Clean up
clean:
	docker-compose down -v
	docker system prune -f
	docker volume prune -f

clean-cache:
	docker-compose exec nginx rm -rf /var/cache/nginx/*

# Health check
health:
	@echo "Checking app health..."
	@curl -f http://localhost/health || echo "App health check failed"
	@echo "\nChecking nginx..."
	@docker-compose exec nginx nginx -t || echo "Nginx config test failed"

# Install dependencies
install:
	docker-compose exec app npm install

# Generate Prisma client
generate:
	docker-compose exec app npx prisma generate

# SSL setup (for production)
ssl-setup:
	mkdir -p nginx/ssl
	# Add your SSL certificate generation commands here

# Backup
backup:
	docker-compose exec redis redis-cli BGSAVE

# Monitor
monitor:
	docker stats

# Shell access
shell-app:
	docker-compose exec app sh

shell-nginx:
	docker-compose exec nginx sh