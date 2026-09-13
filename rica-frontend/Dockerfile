# Etapa 1: construcción
FROM node:20-alpine AS build
WORKDIR /app

COPY package.json .
RUN npm install

COPY . .
RUN npm run build

# Etapa 2: imagen de ejecución
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80