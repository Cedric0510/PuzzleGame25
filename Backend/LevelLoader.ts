import * as fs from 'fs/promises';
import * as path from 'path';
import { Player } from './entities/Player.js';
import { Wall } from './entities/Wall.js';
import { Door } from './entities/Door.js';
import { ColorPlate } from './entities/ColorPlate.js';
import { GoldenPlate } from './entities/GoldenPlate.js';
import { LevelData } from './entities/LevelData.js';
import { Color } from './enums/Color.js';
import { Shape } from './enums/Shape.js';

export class LevelLoader {
    private levelsPath: string;

    constructor() {
        this.levelsPath = path.join(__dirname, 'levels');
    }

    public async loadLevel(levelNumber: number): Promise<any> {
        const response = await fetch(`./Levels/level${levelNumber}.json`);
        const data = await response.json();
        return data;
    }

      public parseLevel(data: any): LevelData {
        const levelData = new LevelData();

        for (let i = 0; i < data.PlayersStart.length; i++) {
            const pos = data.PlayersStart[i];
            const x = pos[0];
            const y = pos[1];
            let color;
            if (i === 0) {
                color = Color.RED;
            } else {
                color = Color.BLUE;
            }
            const shape = Shape.CIRCLE;
            levelData.players.push(new Player(x, y, 1, color, shape));
        }

        for (let i = 0; i < data.Walls.length; i++) {
            const pos = data.Walls[i];
            const x = pos[0];
            const y = pos[1];
            levelData.walls.push(new Wall(x, y, 0, Color.BLACK, Shape.SQUARE));
        }

        for (let i = 0; i < data.Doors.length; i++) {
            const doorData = data.Doors[i];
            const x = doorData[0];
            const y = doorData[1];
            const colorIndex = doorData[2];
            const doorColor = this.getColorByIndex(colorIndex);
            levelData.doors.push(new Door(x, y, 0, doorColor, Shape.SQUARE));
        }

        for (let i = 0; i < data.PressurePlates.length; i++) {
            const plateData = data.PressurePlates[i];
            const x = plateData[0];
            const y = plateData[1];
            const colorIndex = plateData[2];
            const plateColor = this.getColorByIndex(colorIndex);
            levelData.colorPlates.push(new ColorPlate(colorIndex, x, y, 0, plateColor, Shape.SQUARE));
        }

        const endPos = data.EndPlates;
        const x = endPos[0];
        const y = endPos[1];
        levelData.goldenPlate = new GoldenPlate(0, x, y, 0, Color.GOLD, Shape.SQUARE);

        return levelData;
    }

    private getColorByIndex(index: number): Color {
        switch(index) {
            case 0: return Color.RED;
            case 1: return Color.GREEN;
            case 2: return Color.BLUE;
            default: return Color.GRAY;
        }
    }
}
