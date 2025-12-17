# Utilisation de nodejs version 22
FROM node:22-alpine
# Emplacement projet dans la Vm
WORKDIR /app
# Utilisation unique du pacage.json pour recuper uniquement
# ce que l'on a besoin pour le npm install
COPY package*.json ./
# Utilisation de la commande NPM INSTALL
RUN npm install
# Copier le reste de tout le projet
COPY . .
#Configuration du port
EXPOSE 5173
# Permettre d'acceder au site / sinon il tourne sur le localhost du container uniquement
# avec host et 0.0.0.0 on peux y acceder depuis le pc qui fait tourner le container
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]