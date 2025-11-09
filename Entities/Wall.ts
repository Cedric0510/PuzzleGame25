import { Point } from "./Point.js";
import { Color } from "../Enum/Color.js";
import { Shape } from "../Enum/Shape.js";   

export class Wall extends Point {
  constructor(x: number, y: number, z_index: number, color: Color, shape: Shape) {
       super(x, y, z_index, color, shape);
    }
}