import { Point } from "../Entities/Point.js";
export class Player extends Point {
    constructor(x, y, z_index, color, shape) {
        super(x, y, z_index, color, shape);
    }
    move(dx, dy) {
        this.setX(this.getX() + dx);
        this.setY(this.getY() + dy);
    }
}
