import SpeedyShots from './GameLogic.js';
import AssetLoader from "./Assets.js";

/**
 * Start the game by loading the assets and initializing the game logic.
 */
function startGame() {
    AssetLoader.loadAssets(() => {
        SpeedyShots.start();
    });
}

startGame();