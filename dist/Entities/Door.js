import { Point } from "./Point.js";
export class Door extends Point {
    constructor(x, y, z_index, color, shape) {
        super(x, y, z_index, color, shape);
        this.isOpen = false;
    }
    getIsOpen() {
        return this.isOpen;
    }
    setIsOpen(isOpen) {
        this.isOpen = isOpen;
    }
}
