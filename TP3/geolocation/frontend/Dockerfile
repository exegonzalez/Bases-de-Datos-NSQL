FROM node:latest
RUN npm install --silent
RUN npm install react-scripts@3.0.1 -g --silent

WORKDIR /geoapi-ui
COPY geoapi-ui/ .

EXPOSE 3000