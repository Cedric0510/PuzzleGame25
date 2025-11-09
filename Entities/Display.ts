import { Drawer } from "../Drawer.js";
import Game from "./Game.js";
import { Point } from "./Point.js";
import { Door } from "./Door.js";
import { Shape } from "../Enum/Shape.js";


export class Display {

    protected drawer : Drawer;


    constructor(width:number,heigth:number,scale:number){
        this.drawer = new Drawer(width,heigth,scale);
    }

    protected refreshScore(new_score:number):void {
        let score: HTMLElement | null = document.getElementById("score");
        if (score != null) score.innerHTML = new_score.toString();
    }

    public draw_object(obj: Point): void {
        if (obj instanceof Door && obj.getIsOpen()) {
            return;
        }

        const color = obj.getColor();

        switch(obj.getShape()){
            case Shape.CIRCLE:
                this.drawer.drawCircle(obj.getX(), obj.getY(), color);
                break;
            case Shape.SQUARE:
                this.drawer.drawRectangle(obj.getX(), obj.getY(), color);
                break;
        }
    }

    public draw(game:Game):void{

        this.drawer.clear();

        this.refreshScore(game.getLevel())

        const elements = game.getElements();
        const sortedElements = elements.sort((a, b) => a.getZIndex() - b.getZIndex());

        for (let i = 0; i < sortedElements.length; i++) {
            this.draw_object(sortedElements[i]);
        }
    }
}