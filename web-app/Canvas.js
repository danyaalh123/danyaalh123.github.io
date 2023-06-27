/**
 * Canvas2D object for managing 2D rendering on a canvas element.
 * @constructor
 */
function Canvas2D() {
    /**
     * The canvas element.
     * @type {HTMLCanvasElement}
     * @private
     */
    this._canvas = document.getElementById("screen");

    /**
     * The 2D rendering context of the canvas.
     * @type {CanvasRenderingContext2D}
     * @private
     */
    this._canvasContext = this._canvas.getContext("2d");
}

/**
 * Clears the entire canvas.
 */
Canvas2D.prototype.clear = function () {
    this._canvasContext.clearRect(0, 0, this._canvas.width, this._canvas.height);
};

/**
 * Draws an image on the canvas.
 * @param {HTMLImageElement} image - The image to draw.
 * @param {Object} position - The position to draw the image at.
 * @param {Object} origin - The origin point of the image.
 * @param {Number} [rotation=0] - The rotation angle of the image.
 */
Canvas2D.prototype.drawImage = function (image, position, origin, rotation = 0) {
    if (!position) {
        position = { x: 0, y: 0 };
    }
    if (!origin) {
        origin = { x: 0, y: 0 };
    }
    this._canvasContext.save();
    this._canvasContext.translate(position.x, position.y);
    this._canvasContext.rotate(rotation);
    this._canvasContext.drawImage(image, -origin.x, -origin.y);
    this._canvasContext.restore();
};

/**
 * The Canvas object for 2D rendering.
 * @type {Canvas2D}
 */
let Canvas = new Canvas2D();