import { Point } from "./Point.js";
import { Shape } from "../enums/Shape.js";  
import { Color } from "../enums/Color.js";


export class Plate extends Point   {
    id:number;

   constructor(id: number, x: number, y: number, z_index: number, color: Color, shape: Shape) {
       super(x, y, z_index, color, shape);
       this.id = id;
   }
}
