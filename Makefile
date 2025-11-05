# Makefile
.PHONY: build dev up down logs clean

# Build and run production
build:
	docker-compose build

up:
	docker-compose up -d

down:
	docker-compose down

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

# Database operations
db-push:
	docker-compose exec app npx prisma db push

db-seed:
	docker-compose exec app npm run seed

db-studio:
	docker-compose exec app npx prisma studio

# Clean up
clean:
	docker-compose down -v
	docker system prune -f
	docker volume prune -f

# Health check
health:
	curl -f http://localhost/health || exit 1

# Install dependencies
install:
	docker-compose exec app npm install

# Generate Prisma client
generate:
	docker-compose exec app npx prisma generate