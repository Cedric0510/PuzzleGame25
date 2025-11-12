import { GameLogic } from './GameLogic.js';
import { LevelLoader } from './LevelLoader.js';
import { Game } from './entities/Game.js';

export class GameManager {
    private game: Game;
    private players: string[];
    private spectators: string[];
    private levelLoader: LevelLoader;
    private gameLogic: GameLogic;

    constructor() {
        this.game = new Game(30, 30);
        this.players = [];
        this.spectators = [];
        this.levelLoader = new LevelLoader();
        this.gameLogic = new GameLogic();
    }

  public connectPlayer(socket: any): void {
      this.addPlayer(socket.id);
      socket.emit('gameState', this.getGameState());
  }
    
    public addPlayer(socketId: string): void {
        this.players.push(socketId);
       
    }

    public addSpectator(socketId: string): void {
        if (this.isGameFull()) {
            this.spectators.push(socketId);
        }
    }

    public removePlayer(socketId: string): void {
        
    }

    public movePlayer(socketId: string, direction: number): void {
        
    }

    public loadLevel(levelNumber: number): void {
        
    }

    public getGameState(): any {
        
    }

    public isGameFull(): boolean {
        if (this.players.length >= 2) {
            return true;
        }
        return false;
    }

    public resetGame(): void {
        
    }
}
