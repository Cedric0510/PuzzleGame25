import { Color } from "../enums/Color.js";
import { Shape } from "../enums/Shape.js";

export class Point {
    protected x: number;
    protected y: number;
    protected z_index: number;
    protected color: Color;
    protected shape: Shape;

    constructor(x: number, y: number, z_index: number, color: Color, shape: Shape) {
        this.x = x;
        this.y = y;
        this.z_index = z_index;
        this.color = color;
        this.shape = shape;
    }

    public getX(): number {
        return this.x;
    }

    public getY(): number {
        return this.y;
    }

    public setX(x: number): void {
        this.x = x;
    }

    public setY(y: number): void {
        this.y = y;
    }

    public setZIndex(z_index: number): void {
        this.z_index = z_index;
    }

    public setColor(color: Color): void {
        this.color = color;
    }   

    public setShape(shape: Shape): void {
        this.shape = shape;
    }   

    public getShape(): Shape {  
        return this.shape;
    }

    public getZIndex(): number {
        return this.z_index;
    }

    public getColor(): Color {
        return this.color;
    }
}
