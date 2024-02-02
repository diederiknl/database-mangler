FROM node:latest
LABEL authors="Diederik de Vries"

WORKDIR /app
COPY . .
RUN npm install
CMD npm start

EXPOSE 8080/tcp
