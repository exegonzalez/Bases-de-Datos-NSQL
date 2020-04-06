FROM python:3.7-alpine

WORKDIR /api
COPY api/ .
ENV FLASK_APP app.py
ENV FLASK_RUN_HOST 0.0.0.0
ENV FLASK_DEBUG 1
# RUN apk add --no-cache gcc musl-dev linux-headers
