
FROM python:3.9-slim-buster



WORKDIR /app



COPY requirements.txt .

RUN pip install -r requirements.txt



COPY backend .



CMD ["gunicorn", "--bind", "0.0.0.0:8000", "app:app", "--workers", "4", "--timeout", "120"]

