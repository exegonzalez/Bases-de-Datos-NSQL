FROM python:3.7-alpine

WORKDIR /api.ui
COPY api-ui/ .
ENV FLASK_APP app.py
ENV FLASK_RUN_HOST frontend
ENV FLASK_DEBUG 1
ENV FLASK_RUN_PORT 3000
EXPOSE 3000
# RUN apk add --no-cache gcc musl-dev linux-headers
