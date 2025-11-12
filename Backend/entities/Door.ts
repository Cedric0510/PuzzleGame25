import { Point } from "./Point.js";
import { Color } from "../enums/Color.js";
import { Shape } from "../enums/Shape.js";   

export class Door extends Point {
    private isOpen: boolean;

    constructor(x: number, y: number, z_index: number, color: Color, shape: Shape) {
        super(x, y, z_index, color, shape);
        this.isOpen = false;
    }

    public getIsOpen(): boolean {
        return this.isOpen;
    }

    public setIsOpen(isOpen: boolean): void {
        this.isOpen = isOpen;
    }
}
