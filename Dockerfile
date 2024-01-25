# Dockerfile
FROM node:20.11.0-alpine3.18

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "npx", "serve", "-s", "dist", "-l", "3000" ]