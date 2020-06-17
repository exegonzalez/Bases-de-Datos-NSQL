FROM node:latest
RUN npm install --silent
RUN npm install react-scripts@3.0.1 -g --silent

WORKDIR /frontend/galactic-blockchain-ui
COPY . ./frontend/galactic-blockchain-ui

EXPOSE 3000