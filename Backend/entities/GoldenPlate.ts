import { Plate } from "./Plate.js";
import { Color } from "../enums/Color.js";
import { Shape } from "../enums/Shape.js";   

export class GoldenPlate extends Plate {
    constructor(id:number, x: number, y: number, z_index: number, color: Color, shape: Shape) {
       super(id, x, y, z_index, color, shape);
    }
}
