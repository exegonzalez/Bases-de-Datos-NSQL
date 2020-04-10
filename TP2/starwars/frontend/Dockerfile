FROM node:latest
RUN npm install --silent
RUN npm install react-scripts@3.0.1 -g --silent

WORKDIR /api-ui
COPY api-ui/ .

EXPOSE 3000