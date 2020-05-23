FROM python:latest

WORKDIR /backend/api
COPY . ./backend/api
ENV FLASK_APP /backend/api/src/app.py
ENV FLASK_RUN_HOST api
ENV FLASK_DEBUG 1
ENV FLASK_RUN_PORT 5000
EXPOSE 5000
# RUN apk add --no-cache gcc musl-dev linux-headers
