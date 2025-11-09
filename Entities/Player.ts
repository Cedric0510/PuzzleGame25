import { Point } from "../Entities/Point.js";
import { Color } from "../Enum/Color.js";
import { Shape } from "../Enum/Shape.js";

export class Player extends Point {

   constructor(x: number, y: number, z_index: number, color: Color, shape: Shape) {
       super(x, y, z_index, color, shape);
   }

   public move(dx: number, dy: number): void {
       this.setX(this.getX() + dx);
       this.setY(this.getY() + dy);
   }
}