import { Plate } from "./Plate.js";
import { Color } from "../Enum/Color.js";
import { Shape } from "../Enum/Shape.js";   

export class GoldenPlate extends Plate {
    constructor(id:number, x: number, y: number, z_index: number, color: Color, shape: Shape) {
       super(id, x, y, z_index, color, shape);
    }
    // public finished(): boolean {
    //     return true;
    // }
}
