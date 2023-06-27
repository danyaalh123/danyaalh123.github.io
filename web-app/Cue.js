import AssetLoader from "./Assets.js";

/**
 * Cue object represents the cue used to strike the balls.
 * @constructor
 * @param {object} position - The initial position of the cue.
 * @param {function} onShoot - The callback function for shooting the cue.
 */
export default function Cue(position, onShoot) {
    /**
     * The position of the cue.
     * @type {object}
     */
    this.position = { x: position.x, y: position.y };

    /**
     * The rotation angle of the cue.
     * @type {number}
     */
    this.rotation = 0;

    /**
     * The origin point of the cue sprite.
     * @type {object}
     */
    this.origin = { x: 970, y: 11 };

    /**
     * The power of the cue shot.
     * @type {number}
     */
    this.power = 0;

    /**
     * The callback function for shooting the cue.
     * @type {function}
     */
    this.onShoot = onShoot;

    /**
     * Flag indicating if the cue has been shot.
     * @type {boolean}
     */
    this.shot = false;
}

/**
 * Updates the cue's state.
 */
Cue.prototype.update = function () {
    if (Mouse.left.down && !this.shot) {
        this.increasePower();
    } else if (this.power > 0) {
        var audio = document.getElementById("strike");
        audio.play();
        this.shoot();
    }
    this.updateRotation();
};

/**
 * Draws the cue on the canvas.
 */
Cue.prototype.draw = function () {
    Canvas.drawImage(AssetLoader.objects.cue, this.position, this.origin, this.rotation);
};

/**
 * Updates the rotation angle of the cue based on the mouse position.
 */
Cue.prototype.updateRotation = function () {
    let opposite = Mouse.position.y - this.position.y;
    let adjacent = Mouse.position.x - this.position.x;
    this.rotation = Math.atan2(opposite, adjacent);
};

/**
 * Increases the power of the cue shot.
 */
Cue.prototype.increasePower = function () {
    const MAX_POWER = 6000;
    if (this.power > MAX_POWER) {
        return;
    }
    this.power += 120;
    this.origin.x += 5;
};

/**
 * Shoots the cue.
 */
Cue.prototype.shoot = function () {
    this.onShoot(this.power, this.rotation);
    this.power = 0;
    this.origin = { x: 950, y: 11 };
    this.shot = true;
};

/**
 * Repositions the cue.
 * @param {object} position - The new position of the cue.
 */
Cue.prototype.reposition = function (position) {
    this.position.x = position.x;
    this.position.y = position.y;
    this.origin = { x: 970, y: 11 };
    this.shot = false;
};