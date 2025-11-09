import { Point } from "../Entities/Point.js";
import { Shape } from "../Enum/Shape.js";  
import { Color } from "../Enum/Color.js";


export class Plate extends Point   {
    id:number;

   constructor(id: number, x: number, y: number, z_index: number, color: Color, shape: Shape) {
       super(x, y, z_index, color, shape);
       this.id = id;
   }
   
//    public activated(): void {
//   }    
}
