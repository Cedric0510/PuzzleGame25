# Backend Puzzle Game

## Installation

```bash
npm install
```

## Démarrage

```bash
npm start
```

## Architecture

- `server.js` - Point d'entrée du serveur WebSocket
- `GameManager.js` - Gère l'état de la partie unique
- `GameLogic.js` - Logique du jeu (sera implémentée plus tard)
- `LevelLoader.js` - Chargement des niveaux JSON
- `levels/` - Fichiers JSON des niveaux

## Événements WebSocket

### Client → Serveur
- `join-game` - Rejoindre la partie
- `move-player` - Déplacer son joueur
- `disconnect` - Déconnexion

### Serveur → Client
- `you-are-player` - Attribution du numéro de joueur
- `you-are-spectator` - Mode spectateur
- `game-start` - Démarrage de la partie
- `game-state` - État complet du jeu
- `player-moved` - Mouvement d'un joueur
- `doors-updated` - Changement d'état des portes
- `level-complete` - Niveau terminé
- `player-disconnected` - Déconnexion d'un joueur
- `error` - Erreur

## TODO

- [ ] Implémenter la logique dans GameManager
- [ ] Implémenter la logique dans GameLogic
- [ ] Implémenter le chargement des niveaux
- [ ] Copier les fichiers JSON des niveaux
- [ ] Tester la connexion WebSocket
