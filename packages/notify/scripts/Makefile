run-stg:
	docker-compose \
		-p stg-notify \
		-f docker-compose.yaml -f docker-compose.staging.yaml \
		up --no-deps -d --build
run-prod:
	docker-compose \
		-p prod-notify \
		-f docker-compose.yaml \
		up --no-deps -d --build
