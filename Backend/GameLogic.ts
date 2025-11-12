import { Player } from "./entities/Player.js";
import { Wall } from "./entities/Wall.js";
import { Door } from "./entities/Door.js";

export class GameLogic {
    constructor() {
        
    }


    public getDirectionOffset(direction: number): { dx: number; dy: number } {
        switch (direction) {
            case 0: // Up
                return { dx: 0, dy: -1 };   
            case 1: // Down
                return { dx: 0, dy: 1 };
            case 2: // Left
                return { dx: -1, dy: 0 };
            case 3: // Right
                return { dx: 1, dy: 0 };
            default:
                return { dx: 0, dy: 0 };
        }
        
    }
}
