import { Display } from "./Entities/Display.js";
import Game from "./Entities/Game.js";
import { InputManager } from "./Entities/InputManager.js";
export class PuzzleGame {
    constructor(width, height, scale) {
        this.display = new Display(width, height, scale);
        this.game = new Game(this.display, width, height);
        this.inputManager = new InputManager(this.game);
    }
    async start() {
        await this.loadFirstLevel();
        this.startGameLoop();
    }
    async loadFirstLevel() {
        await this.game.loadLevel(0);
    }
    startGameLoop() {
        this.gameLoop();
    }
    gameLoop() {
        this.display.draw(this.game);
        requestAnimationFrame(() => this.gameLoop());
    }
}
