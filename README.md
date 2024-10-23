# HolliD Web – Interface web pour la planification des vacances

## Description

**HolliD Web** est une interface utilisateur développée en **React.js** pour la planification de vacances. Elle permet aux utilisateurs d'interagir avec l'API HolliD pour gérer les participants, planifier les activités, consulter les prévisions météo et définir des destinations. Le design utilise **TailwindCSS** pour une interface moderne et responsive.

## Fonctionnalités

- **Interface intuitive** : Interface utilisateur simple pour gérer les voyages et participants.
- **Recherche de destinations** : Permet de rechercher et sélectionner des destinations via l'API Google Places.
- **Suivi des activités** : Affichage des activités prévues pour chaque voyage.
- **Prévisions météorologiques** : Affichage des prévisions météo directement dans l'interface.

## Technologies utilisées

- **React.js** : Framework pour construire l'interface utilisateur.
- **TailwindCSS** : Framework CSS utilitaire pour créer des interfaces modernes et responsives.
- **Cypress** : Utilisé pour les tests end-to-end.
- **API HolliD** : Interactions avec l'API REST pour la gestion des données.

## Installation

1. Clonez le repository :
    ```bash
    git clone https://github.com/tonusername/holidWeb.git
    cd holidWeb
    ```

2. Installez les dépendances :
    ```bash
    npm install
    ```

3. Créez un fichier `.env` pour y ajouter les clés d'API nécessaires (Google Places, OpenWeather).

4. Démarrez l'application :
    ```bash
    npm start
    ```

5. L'application sera disponible sur `http://localhost:3000`.

## Tests

Pour exécuter les tests end-to-end avec **Cypress**, utilisez la commande suivante :

```bash
npm run cypress:open
