import { Point } from "./Point.js";
import { Player } from "./Player.js";
import { GoldenPlate } from "./GoldenPlate.js";
import { Door } from "./Door.js";
import { ColorPlate } from "./ColorPlate.js";
import { Direction } from "../enums/Direction.js";
import { Wall } from "./Wall.js";   

export class Game {
    protected width: number;
    protected height: number;
    protected Elements: Point[];
    protected level: number;
    protected player1: Player | null;
    protected player2: Player | null;
    protected goldenPlate: GoldenPlate | null;
    protected doors: Door[];
    protected colorPlates: ColorPlate[];
    protected isOver: boolean;
    protected levelLoader: any;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.Elements = [];
        this.level = 0;
        this.player1 = null;
        this.player2 = null;
        this.goldenPlate = null;
        this.doors = [];
        this.colorPlates = [];
        this.isOver = false;
        this.levelLoader = null;
    }

     public addElement(element: Point): void {
        this.Elements.push(element);
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

    public getLevel(): number {
        return this.level;
        
    }

    public getPlayer1(): Player | null {
        return this.player1;
    }

    public getPlayer2(): Player | null {
        return this.player2;
    }

    public getDoors(): Door[] {
        return this.doors;
        
    }

    public getColorPlates(): ColorPlate[] {
        return this.colorPlates;
        
    }

    public movePlayer1(playerNumber: number, direction: number): void {
           if (this.player1) {
            this.tryMovePlayer(this.player1, direction);
        }
        
    }

    public tryMovePlayer(player: Player, direction: number): void {
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
    
}

