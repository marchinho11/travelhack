start:
	docker-compose up -d

stop:
	docker-compose down

build:
	docker-compose build

clean:
	find . -type f -name "*py[co]" -delete
	docker-compose -f docker-compose.yaml down
	docker-compose -f docker-compose.yaml rm -s -v -f

format:
	pre-commit run -a

jupyter:
	poetry run jupyter notebook

restart:
	docker-compose down
	docker-compose up -d
