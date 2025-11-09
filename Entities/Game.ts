import { Display } from "./Display.js";
import { Point } from "./Point.js";
import { LevelLoader } from "./LevelLoader.js";
import { Player } from "./Player.js";
import { GoldenPlate } from "./GoldenPlate.js";
import { Wall } from "./Wall.js";
import { Door } from "./Door.js";
import { ColorPlate } from "./ColorPlate.js";
import { Direction } from "../Enum/Direction.js";


export default class Game {
    protected display: Display;
    protected width: number;
    protected height: number;
    protected Elements: Point[];
    protected isOver: boolean;
    protected level: number;
    protected levelLoader: LevelLoader;
    protected player1: Player | null;
    protected player2: Player | null;
    protected goldenPlate: GoldenPlate | null;
    protected doors: Door[];
    protected colorPlates: ColorPlate[];

    constructor(display: Display, width: number, height: number) {
        this.display = display;
        this.width = width;
        this.height = height;
        this.Elements = [];
        this.isOver = false;
        this.level = 0;
        this.levelLoader = new LevelLoader();
        this.player1 = null;
        this.player2 = null;
        this.goldenPlate = null;
        this.doors = [];
        this.colorPlates = [];
    }
    public getDisplay(): Display {
        return this.display;
    }
    public getWidth(): number {
        return this.width;
    }   
    public getHeight(): number {
        return this.height;
    }   
    public getElements(): Point[] {
        return this.Elements;
    }
    public getIsOver(): boolean {
        return this.isOver;
    }
    public getLevel(): number {
        return this.level;
    }   
    public setIsOver(isOver: boolean): void {
        this.isOver = isOver;
    }
    public setLevel(level: number): void {
        this.level = level;
    }
    public addElement(element: Point): void {
        this.Elements.push(element);
    }
    
    public async loadLevel(levelNumber: number): Promise<void> {
        this.level = levelNumber;
        this.Elements = [];
        this.doors = [];
        this.colorPlates = [];
        
        const data = await this.levelLoader.loadLevel(levelNumber);
        const levelElements = this.levelLoader.parseLevel(data);
        
        for (let i = 0; i < levelElements.walls.length; i++) {
            this.addElement(levelElements.walls[i]);
        }
        
        for (let i = 0; i < levelElements.doors.length; i++) {
            this.addElement(levelElements.doors[i]);
            this.doors.push(levelElements.doors[i]);
        }
        
        for (let i = 0; i < levelElements.colorPlates.length; i++) {
            this.addElement(levelElements.colorPlates[i]);
            this.colorPlates.push(levelElements.colorPlates[i]);
        }
        
        this.addElement(levelElements.goldenPlate);
        
        for (let i = 0; i < levelElements.players.length; i++) {
            this.addElement(levelElements.players[i]);
        }
        
        this.player1 = levelElements.players[0];
        this.player2 = levelElements.players[1];
        this.goldenPlate = levelElements.goldenPlate;
    }

    public movePlayer1(direction: Direction): void {
        if (this.player1) {
            this.tryMovePlayer(this.player1, direction);
        }
    }

    public movePlayer2(direction: Direction): void {
        if (this.player2) {
            this.tryMovePlayer(this.player2, direction);
        }
    }

    private tryMovePlayer(player: Player, direction: Direction): void {
        let dx = 0;
        let dy = 0;

        switch(direction) {
            case Direction.UP:
                dy = -1;
                break;
            case Direction.DOWN:
                dy = 1;
                break;
            case Direction.LEFT:
                dx = -1;
                break;
            case Direction.RIGHT:
                dx = 1;
                break;
        }

        const newX = player.getX() + dx;
        const newY = player.getY() + dy;

        if (this.canMoveTo(player, newX, newY)) {
            player.move(dx, dy);
            this.updateDoors();
            this.checkVictory();
        }
    }

    private canMoveTo(player: Player, newX: number, newY: number): boolean {
        if (newX < 0 || newX >= this.width || newY < 0 || newY >= this.height) {
            return false;
        }

        for (const element of this.Elements) {
            if (element instanceof Wall && element.getX() === newX && element.getY() === newY) {
                return false;
            }
            if (element instanceof Door && element.getX() === newX && element.getY() === newY) {
                if (!element.getIsOpen()) {
                    return false;
                }
            }
        }

        let otherPlayer;
        if (player === this.player1) {
            otherPlayer = this.player2;
        } else {
            otherPlayer = this.player1;
        }
        
        if (otherPlayer && otherPlayer.getX() === newX && otherPlayer.getY() === newY) {
            let isGoldenPlatePosition = false;
            if (this.goldenPlate) {
                if (this.goldenPlate.getX() === newX && this.goldenPlate.getY() === newY) {
                    isGoldenPlatePosition = true;
                }
            }
            
            if (isGoldenPlatePosition) {
                return true;
            }
            return false;
        }

        return true;
    }

    private updateDoors(): void {
        for (let i = 0; i < this.doors.length; i++) {
            const door = this.doors[i];
            let shouldBeOpen = false;

            for (let j = 0; j < this.colorPlates.length; j++) {
                const plate = this.colorPlates[j];
                if (plate.getColor() === door.getColor()) {
                    let plateActivated = false;
                    
                    if (this.player1 && this.player1.getX() === plate.getX() && this.player1.getY() === plate.getY()) {
                        plateActivated = true;
                    }
                    
                    if (this.player2 && this.player2.getX() === plate.getX() && this.player2.getY() === plate.getY()) {
                        plateActivated = true;
                    }
                    
                    if (plateActivated) {
                        shouldBeOpen = true;
                        break;
                    }
                }
            }

            door.setIsOpen(shouldBeOpen);
        }
    }

    private checkVictory(): void {
        if (!this.player1 || !this.player2 || !this.goldenPlate) {
            return;
        }

        let player1OnPlate = false;
        if (this.player1.getX() === this.goldenPlate.getX() && this.player1.getY() === this.goldenPlate.getY()) {
            player1OnPlate = true;
        }
        
        let player2OnPlate = false;
        if (this.player2.getX() === this.goldenPlate.getX() && this.player2.getY() === this.goldenPlate.getY()) {
            player2OnPlate = true;
        }

        if (player1OnPlate && player2OnPlate) {
            this.isOver = true;
            this.nextLevel();
        }
    }

    private async nextLevel(): Promise<void> {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const nextLevelNumber = this.level + 1;
        
        try {
            await this.loadLevel(nextLevelNumber);
            this.isOver = false;
        } catch (error) {
            alert("🎉 Félicitations ! Vous avez terminé tous les niveaux !");
            await this.loadLevel(0);
            this.isOver = false;
        }
    }
}



