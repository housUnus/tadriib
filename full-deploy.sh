#!/bin/bash
set -e  # Stop on errors

echo "==> Pulling latest code"
git pull
# chmod +x deploy.sh

echo "==> Building images"
docker compose build

echo "==> Running database migrations"
docker compose run --rm backend python manage.py migrate

echo "==> Collecting static files"
docker compose run --rm backend python manage.py collectstatic --noinput

echo "==> Updating containers"
docker compose up -d --remove-orphans

echo "==> Deployment completed successfully!"