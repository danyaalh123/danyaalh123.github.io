// assetLoader.js

let objects = {};
let assetsStillLoading = 0;

/**
 * Assets loading loop to check if assets are still loading.
 * @param {function} callback - The callback function to execute when assets finish loading.
 */
function assetsLoadingLoop(callback) {
    if (assetsStillLoading) {
        requestAnimationFrame(() => assetsLoadingLoop(callback));
    } else {
        callback();
    }
}

/**
 * Loads the assets.
 * @param {function} callback - The callback function to execute when assets finish loading.
 */
function loadAssets(callback) {
    /**
     * Loads an object image.
     * @param {string} fileName - The file name of the object image.
     * @returns {object} The loaded object image.
     */
    function loadObject(fileName) {
        assetsStillLoading++;
        let objectImage = new Image();
        objectImage.src = "./assets/" + fileName;
        objectImage.onload = () => {
            assetsStillLoading--;
        };
        return objectImage;
    }

    objects.background = loadObject('Table.png');
    objects.cue = loadObject('Cue.png');
    objects.whiteBall = loadObject('WhiteBall.png');
    objects.blackBall = loadObject('ColourBall.png');

    assetsLoadingLoop(callback);
}

/**
 * Loads test assets.
 * @param {function} callback - The callback function to execute.
 */
function loadTest(callback) {
    objects.background = ('Table.png');
    objects.cue = ('Cue.png');
    objects.whiteBall = ('WhiteBall.png');
    objects.blackBall = ('ColourBall.png');
}

export default {
    objects: objects,
    assetsStillLoading: assetsStillLoading,
    loadAssets: loadAssets,
    loadTest: loadTest,
    assetsLoadingLoop: assetsLoadingLoop
};