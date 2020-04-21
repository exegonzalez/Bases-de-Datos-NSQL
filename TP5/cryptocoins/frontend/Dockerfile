FROM node:latest
RUN npm install --silent
RUN npm install react-scripts@3.0.1 -g --silent

WORKDIR /cryptocoins-ui
COPY cryptocoins-ui/ .

EXPOSE 3000