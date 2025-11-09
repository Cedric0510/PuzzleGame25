import { Direction } from "../Enum/Direction.js";
export class InputManager {
    constructor(game) {
        this.game = game;
        this.setupKeyboardListeners();
    }
    setupKeyboardListeners() {
        document.addEventListener('keydown', (event) => {
            switch (event.key.toLowerCase()) {
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
