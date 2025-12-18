# Utilisation de nodejs version 22
FROM node:22-alpine
# Donner les droits à l'utilisateur node
# Emplacement projet dans la Vm
WORKDIR /app
# Utilisation unique du pacage.json pour recuper uniquement
# ce que l'on a besoin pour le npm install
COPY package*.json ./
# Utilisation de la commande NPM INSTALL
RUN npm install
# Copier le reste de tout le projet
# Copier le reste du projet
COPY --chown=root:root --chmod=755 src ./src
COPY --chown=root:root --chmod=755 public ./public
COPY --chown=root:root --chmod=755 index.html ./

# Donner les permission pour le user dans le dossier /app
RUN chown -R node:node /app
# Création et utilisation d’un utilisateur non-root
USER node
#Configuration du port
EXPOSE 5173
# Permettre d'acceder au site / sinon il tourne sur le localhost du container uniquement
# avec host et 0.0.0.0 on peux y acceder depuis le pc qui fait tourner le container
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]