FROM python:3.7-alpine

WORKDIR /api
COPY api/ .
ENV FLASK_APP app.py
ENV FLASK_RUN_HOST backend
ENV FLASK_DEBUG 1
ENV FLASK_RUN_PORT 5000
EXPOSE 5000
# RUN apk add --no-cache gcc musl-dev linux-headers
