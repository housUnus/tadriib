FROM python:3.14-slim

WORKDIR /app

# Install system dependencies (ffmpeg + build tools)
RUN apt-get update && apt-get install -y \
    ffmpeg \
    gcc \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Install pipenv
RUN pip install --no-cache-dir pipenv

# Disable virtualenv creation
ENV PIPENV_SYSTEM=1
ENV PIPENV_IGNORE_VIRTUALENVS=1

# Copy Pipenv files
COPY Pipfile Pipfile.lock ./

# Install dependencies globally
RUN pipenv install --deploy --ignore-pipfile

# Copy project
COPY . .

# Expose port
EXPOSE 8000

CMD ["gunicorn", "--config", "gunicorn.conf.py", "backend.wsgi:application"]
