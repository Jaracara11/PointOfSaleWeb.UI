# Dockerfile
FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "npx", "http-server", "dist", "--cors", "-p", "3000" ]
