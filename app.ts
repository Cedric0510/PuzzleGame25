import { PuzzleGame } from "./PuzzleGame.js";

window.onload = async () => {
    const puzzleGame = new PuzzleGame(30, 30, 20);
    await puzzleGame.start();
};  