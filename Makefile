.PHONY: docker-up docker-down docker-build docker-logs docker-up-detach docker-exec docker-restart docker-remove

docker-up:
	sudo docker compose up $(ARGS)

docker-down:
	sudo docker compose down $(ARGS)

docker-build:
	sudo docker compose build

docker-logs:
	sudo docker compose logs -f

docker-up-detach:
	sudo docker compose up --build -d

docker-exec:
	sudo docker exec -it $(ARGS) /bin/sh

docker-restart:
	$(MAKE) docker-down
	$(MAKE) docker-up

docker-remove:
	sudo docker compose down -v
	sudo docker rmi backend_jwt_auth