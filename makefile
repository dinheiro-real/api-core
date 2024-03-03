SERVICE=app

ps:
	docker ps -a

build:
	docker-compose up --build -d && make logs-api

up:
	docker-compose up -d

logs-api:
	docker logs -f docker_api

logs-db:
	docker logs -f docker_database

down:
	docker-compose down -v

migrate:
	docker-compose run --rm $(SERVICE) database/migrations/migrate.js migrate

undo_last_migration:
	docker-compose run --rm $(SERVICE) database/migrations/migrate.js undo_last_migration