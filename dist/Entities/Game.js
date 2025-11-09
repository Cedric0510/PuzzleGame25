import { LevelLoader } from "./LevelLoader.js";
import { Wall } from "./Wall.js";
import { Door } from "./Door.js";
import { Direction } from "../Enum/Direction.js";
export default class Game {
    constructor(display, width, height) {
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
    // public getDisplay(): Display {
    //     return this.display;
    // }
    // public getWidth(): number {
    //     return this.width;
    // }   
    // public getHeight(): number {
    //     return this.height;
    // }   
    getElements() {
        return this.Elements;
    }
    // public getIsOver(): boolean {
    //     return this.isOver;
    // }
    getLevel() {
        return this.level;
    }
    // public setIsOver(isOver: boolean): void {
    //     this.isOver = isOver;
    // }
    // public setLevel(level: number): void {
    //     this.level = level;
    // }
    addElement(element) {
        this.Elements.push(element);
    }
    async loadLevel(levelNumber) {
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
    movePlayer1(direction) {
        if (this.player1) {
            this.tryMovePlayer(this.player1, direction);
        }
    }
    movePlayer2(direction) {
        if (this.player2) {
            this.tryMovePlayer(this.player2, direction);
        }
    }
    tryMovePlayer(player, direction) {
        let dx = 0;
        let dy = 0;
        switch (direction) {
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
    canMoveTo(player, newX, newY) {
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
        }
        else {
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
    updateDoors() {
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
    checkVictory() {
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
    async nextLevel() {
        await new Promise(resolve => setTimeout(resolve, 500));
        const nextLevelNumber = this.level + 1;
        try {
            await this.loadLevel(nextLevelNumber);
            this.isOver = false;
        }
        catch (error) {
            alert("🎉 Félicitations ! Vous avez terminé tous les niveaux !");
            await this.loadLevel(0);
            this.isOver = false;
        }
    }
}
