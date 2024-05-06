ps:
	docker ps -a

build:
	docker-compose up --build -d && make logs-api

up:
	docker-compose up -d

logs-api:
	docker logs -f docker_api_dinheiro

logs-db:
	docker logs -f docker_db_dinheiro

down:
	docker-compose down -v

migrate:
	npx sequelize-cli db:migrate --env dev

migrate-undo:
	npx sequelize-cli db:migrate:undo --env dev