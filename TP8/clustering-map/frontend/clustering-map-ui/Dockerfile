FROM node:latest
RUN npm install --silent
RUN npm install react-scripts@3.0.1 -g --silent

WORKDIR /frontend/clustering-map-ui
COPY . ./frontend/clustering-map-ui

EXPOSE 3000