import { Drawer } from "../Drawer.js";
import { Door } from "./Door.js";
import { Shape } from "../Enum/Shape.js";
export class Display {
    constructor(width, heigth, scale) {
        this.drawer = new Drawer(width, heigth, scale);
    }
    refreshScore(new_score) {
        let score = document.getElementById("score");
        if (score != null)
            score.innerHTML = new_score.toString();
    }
    draw_object(obj) {
        if (obj instanceof Door && obj.getIsOpen()) {
            return;
        }
        const color = obj.getColor();
        switch (obj.getShape()) {
            case Shape.CIRCLE:
                this.drawer.drawCircle(obj.getX(), obj.getY(), color);
                break;
            case Shape.SQUARE:
                this.drawer.drawRectangle(obj.getX(), obj.getY(), color);
                break;
        }
    }
    draw(game) {
        this.drawer.clear();
        this.refreshScore(game.getLevel());
        const elements = game.getElements();
        const sortedElements = elements.sort((a, b) => a.getZIndex() - b.getZIndex());
        for (let i = 0; i < sortedElements.length; i++) {
            this.draw_object(sortedElements[i]);
        }
    }
}
