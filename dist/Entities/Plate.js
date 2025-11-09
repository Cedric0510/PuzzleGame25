import { Point } from "../Entities/Point.js";
export class Plate extends Point {
    constructor(id, x, y, z_index, color, shape) {
        super(x, y, z_index, color, shape);
        this.id = id;
    }
}
