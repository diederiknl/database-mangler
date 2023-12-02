FROM node:latest
LABEL authors="Diederik de Vries"

WORKDIR /app
COPY . .
RUN npm install
RUN npm start

EXPOSE 8081/tcp
