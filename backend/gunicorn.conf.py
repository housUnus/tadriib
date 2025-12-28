# gunicorn_config.py
import multiprocessing

bind = "0.0.0.0:8000"
module = "aurigaone.wsgi:application"

workers = multiprocessing.cpu_count() * 2 + 1
worker_connections = 1000
threads = 4

accesslog = "-"        # stdout
errorlog = "-"         # stderr
loglevel = "info"

capture_output = True
enable_stdio_inheritance = True
