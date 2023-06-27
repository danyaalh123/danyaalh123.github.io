/**
 * Button state constructor.
 * @constructor
 */
function ButtonState() {
    this.down = false;
    this.pressed = false;
}

/**
 * Handle mouse move event.
 * @param {MouseEvent} evt - The mouse move event.
 */
function handleMouseMove(evt) {
    let canvas = document.getElementById("screen");
    let rect = canvas.getBoundingClientRect();
    let offsetX = evt.clientX - rect.left;
    let offsetY = evt.clientY - rect.top;
    Mouse.position = { x: offsetX, y: offsetY };
}

/**
 * Handle window resize event.
 */
function handleWindowResize() {
    let canvas = document.getElementById("screen");
    let rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
}

/**
 * Handle mouse down event.
 * @param {MouseEvent} evt - The mouse down event.
 */
function handleMouseDown(evt) {
    handleMouseMove(evt);

    if (evt.which === 1) {
        // Left mouse button
        if (!Mouse.left.down) Mouse.left.pressed = true;
        Mouse.left.down = true;
    } else if (evt.which === 2) {
        // Middle mouse button
        if (!Mouse.middle.down) Mouse.middle.pressed = true;
        Mouse.middle.down = true;
    } else if (evt.which === 3) {
        // Right mouse button
        if (!Mouse.right.down) Mouse.right.pressed = true;
        Mouse.right.down = true;
    }
}

/**
 * Handle mouse up event.
 * @param {MouseEvent} evt - The mouse up event.
 */
function handleMouseUp(evt) {
    handleMouseMove(evt);

    if (evt.which === 1) Mouse.left.down = false;
    else if (evt.which === 2) Mouse.middle.down = false;
    else if (evt.which === 3) Mouse.right.down = false;
}

/**
 * Mouse handler constructor.
 * @constructor
 */
function MouseHandler() {
    handleWindowResize();
    this.left = new ButtonState();
    this.middle = new ButtonState();
    this.right = new ButtonState();
    this.position = { x: 0, y: 0 };
    document.onmousemove = handleMouseMove;
    document.onmousedown = handleMouseDown;
    document.onmouseup = handleMouseUp;
}

/**
 * Reset the button states.
 */
MouseHandler.prototype.reset = function () {
    this.left.pressed = false;
    this.middle.pressed = false;
    this.right.pressed = false;
};

/**
 * Create an instance of the MouseHandler.
 * @type {MouseHandler}
 */
let Mouse = new MouseHandler();
