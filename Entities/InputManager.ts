import { Direction } from "../Enum/Direction.js";
import Game from "./Game.js";

export class InputManager {
    private game: Game;

    constructor(game: Game) {
        this.game = game;
        this.setupKeyboardListeners();
    }

    private setupKeyboardListeners(): void {
        document.addEventListener('keydown', (event: KeyboardEvent) => {
            switch(event.key.toLowerCase()) {
                case 'z':
                    this.game.movePlayer1(Direction.UP);
                    break;
                case 's':
                    this.game.movePlayer1(Direction.DOWN);
                    break;
                case 'q':
                    this.game.movePlayer1(Direction.LEFT);
                    break;
                case 'd':
                    this.game.movePlayer1(Direction.RIGHT);
                    break;
                case 'arrowup':
                    this.game.movePlayer2(Direction.UP);
                    break;
                case 'arrowdown':
                    this.game.movePlayer2(Direction.DOWN);
                    break;
                case 'arrowleft':
                    this.game.movePlayer2(Direction.LEFT);
                    break;
                case 'arrowright':
                    this.game.movePlayer2(Direction.RIGHT);
                    break;
            }
        });
    }
}
