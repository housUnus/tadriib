# gunicorn_config.py
import multiprocessing

bind = "0.0.0.0:8000"
module = "aurigaone.wsgi:application"

workers = multiprocessing.cpu_count() * 2 + 1
worker_connections = 1000
threads = 4

# certfile = "/etc/letsencrypt/live/ruwadacademy.com/fullchain.pem"
# keyfile = "/etc/letsencrypt/live/ruwadacademy.com/privkey.pem"