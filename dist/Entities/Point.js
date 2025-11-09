export class Point {
    constructor(x, y, z_index, color, shape) {
        this.x = x;
        this.y = y;
        this.z_index = z_index;
        this.color = color;
        this.shape = shape;
    }
    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }
    setX(x) {
        this.x = x;
    }
    setY(y) {
        this.y = y;
    }
    setZIndex(z_index) {
        this.z_index = z_index;
    }
    setColor(color) {
        this.color = color;
    }
    setShape(shape) {
        this.shape = shape;
    }
    getShape() {
        return this.shape;
    }
    getColor() {
        return this.color;
    }
    getZIndex() {
        return this.z_index;
    }
}
