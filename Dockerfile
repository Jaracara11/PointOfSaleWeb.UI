# Dockerfile
FROM node:20.11.0-alpine3.18

WORKDIR /app

COPY package*.json ./

# Install sudo
RUN apk --no-cache add sudo

# Install dependencies
RUN npm install --production && \
    npm i typescript && \
    npm run build

COPY . .

EXPOSE 3000

CMD [ "npx", "serve", "-s", "dist", "-l", "3000" ]