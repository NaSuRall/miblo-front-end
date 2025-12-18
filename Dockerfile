# --------------------
# ÉTAPE 1 : BUILD
# --------------------
FROM node:20-alpine AS build

WORKDIR /app

# Copier les dépendances
COPY package*.json ./
RUN npm install

# Copier le code
COPY . .

# Build du front
RUN npm run build

# --------------------
# ÉTAPE 2 : NGINX
# --------------------
FROM nginx:alpine

# Copier le build dans nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Port exposé
EXPOSE 80

# Lancer nginx
CMD ["nginx", "-g", "daemon off;"]
