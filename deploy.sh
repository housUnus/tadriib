#!/bin/bash
set -e

git pull
docker compose build

# Wait for DB to be ready
echo "==> Waiting for database..."
docker compose run --rm backend sh -c '
  until nc -z db 5432; do
    echo "Waiting for db..."
    sleep 1
  done
'

# Run migrations and collect static files
docker compose run --rm backend python manage.py migrate
docker compose run --rm backend python manage.py collectstatic --noinput

# Restart containers
docker compose up -d --remove-orphans

echo "==> Deployment completed!"
