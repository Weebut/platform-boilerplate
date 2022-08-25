.PHONY: build-front-dev
build-front-dev: ## Build the development docker image.
	cd frontend && docker compose -f docker-compose.dev.yaml build

.PHONY: start-front-dev
start-front-dev: ## Start the development docker container.
	cd frontend && docker compose -f docker-compose.dev.yaml up -d

.PHONY: stop-front-dev
stop-front-dev: ## Stop the development docker container.
	cd frontend && docker compose -f docker-compose.dev.yaml down -v

.PHONY: build-front-prod
build-front-prod: ## Build the staging docker image.
	cd frontend && docker compose build

.PHONY: start-front-prod
start-front-prod: ## Start the staging docker container.
	cd frontend && docker compose up -d

.PHONY: stop-front-prod
stop-front-prod: ## Stop the staging docker container.
	cd frontend && docker compose down -v


.PHONY: build-back-dev
build-back-dev: ## Build the development docker image.
	cd backend && docker compose -f docker-compose.dev.yaml build

.PHONY: start-back-dev
start-back-dev: ## Start the development docker container.
	cd backend && docker compose -f docker-compose.dev.yaml up -d

.PHONY: stop-back-dev
stop-back-dev: ## Stop the development docker container.
	cd backend && docker compose -f docker-compose.dev.yaml down -v

.PHONY: build-back-prod
build-back-prod: ## Build the staging docker image.
	cd backend && docker compose build

.PHONY: start-back-prod
start-back-prod: ## Start the staging docker container.
	cd backend && docker compose up -d

.PHONY: stop-back-prod
stop-back-prod: ## Stop the staging docker container.
	cd backend && docker compose down -v
