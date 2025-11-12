import { Player } from "./Player.js";
import { Wall } from "./Wall.js";
import { Door } from "./Door.js";
import { ColorPlate } from "./ColorPlate.js";
import { GoldenPlate } from "./GoldenPlate.js";

export class LevelData {
    players: Player[];
    walls: Wall[];
    doors: Door[];
    colorPlates: ColorPlate[];
    goldenPlate: GoldenPlate;

    constructor() {
        this.players = [];
        this.walls = [];
        this.doors = [];
        this.colorPlates = [];
        this.goldenPlate = null as any;
    }
}
