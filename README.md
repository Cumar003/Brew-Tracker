# TODO:

Modify README

# Local Development Testing with Docker

This project can be run locally using Docker Compose. Make sure you have Docker Desktop installed and running on your machine.

**Note:** The first time you run `docker compose up`, it will take some time to build the images and download dependencies.

## Docker Compose Commands

Here is a summary of useful Docker Compose commands:

- `docker compose up`: Builds and starts the containers for the project.
- `docker compose down`: Stops and removes the containers, networks, and volumes created by `up`.
- `docker compose up --build`: Forces a rebuild of the images before starting the containers. Useful when you've changed code or dependencies.
- `docker compose logs <service_name>`: Displays the logs for a specific service (e.g., `docker compose logs server`, `docker compose logs client`).
- `docker compose exec <service_name> <command>`: Executes a command inside a running service container (e.g., `docker compose exec server sh` to open a shell in the server container).