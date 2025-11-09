import { Display } from "./Entities/Display.js";
import Game from "./Entities/Game.js";
import { InputManager } from "./Entities/InputManager.js";

export class PuzzleGame {
    private game: Game;
    private display: Display;
    private inputManager: InputManager;

    constructor(width: number, height: number, scale: number) {
        this.display = new Display(width, height, scale);
        this.game = new Game(this.display, width, height);
        this.inputManager = new InputManager(this.game);
    }

    public async start(): Promise<void> {
        await this.loadFirstLevel();
        this.startGameLoop();
    }

    private async loadFirstLevel(): Promise<void> {
        await this.game.loadLevel(0);
    }

    private startGameLoop(): void {
        this.gameLoop();
    }

    private gameLoop(): void {
        this.display.draw(this.game);
        requestAnimationFrame(() => this.gameLoop());
    }

}   