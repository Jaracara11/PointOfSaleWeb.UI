# Dockerfile
FROM node:20.11.0-alpine3.18 as builder

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 for Nginx
EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
