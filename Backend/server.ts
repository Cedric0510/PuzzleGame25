import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { GameManager } from './GameManager.js';

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const PORT = 3000;

const gameManager = new GameManager();

io.on('connection', (socket) => {
    console.log('Un client s\'est connecté:', socket.id);

    socket.on('join-game', () => {
        
    });

    socket.on('move-player', (data) => {
        
    });

    socket.on('disconnect', () => {
        console.log('Un client s\'est déconnecté:', socket.id);
    });
});

server.listen(PORT, () => {
    console.log(`Serveur WebSocket démarré sur le port ${PORT}`);
});
