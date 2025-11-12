import { Point } from "./Point.js";
import { Color } from "../enums/Color.js";
import { Shape } from "../enums/Shape.js";

export class Player extends Point {

   constructor(x: number, y: number, z_index: number, color: Color, shape: Shape) {
       super(x, y, z_index, color, shape);
   }

   public move(dx: number, dy: number): void {
       
   }
}
