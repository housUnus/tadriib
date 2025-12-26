FROM python:3.11-slim

WORKDIR /app

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

CMD ["gunicorn", "backend.wsgi:application", "--bind", "0.0.0.0:8000"]
