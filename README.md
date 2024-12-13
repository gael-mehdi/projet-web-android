# Projet Web Android Backend

## Description
Ce projet est le backend pour une application web et Android développée dans le cadre du cours de Développement Web à l'ISMIN 3A. 

## Fonctionnalités
- Gestion d'une API des monuments historiques français.

## Prérequis
- [Node.js](https://nodejs.org/) (version 14 ou supérieure)

## Installation
1. Clonez le dépôt :
    ```bash
    git clone https://github.com/votre-utilisateur/projet-web-android-backend.git
    cd projet-web-android-backend
    ```

2. Installez les dépendances :
    ```bash
    npm install
    ```

3. Configurez les variables d'environnement en créant un fichier `.env` à la racine du projet :
    ```
    PORT=3000
    MONGODB_URI=mongodb://localhost:27017/votre-base-de-donnees
    JWT_SECRET=votre_secret_jwt
    ```

## Utilisation
Vous pouvez utiliser le serveur en local comme décrit ci-dessous.
1. Démarrez le serveur :
    ```bash
    npm start
    ```

2. L'API sera accessible à l'adresse `http://localhost:3000`.

## Déploiement
Le serveur est actuellement déployé sur Clever Cloud, à l'adresse suivante : [https://votre-application.cleverapps.io](https://votre-application.cleverapps.io).

## Auteurs
- Yannick Hu
- Gaël-Mehdi Le Lay