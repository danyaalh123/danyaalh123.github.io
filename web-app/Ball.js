// Constants
const BALL_ORIGIN = { x: 25, y: 25 }; // Origin point of the ball
const BALL_DIAMETER = 45; // Diameter of the ball
const BALL_RADIUS = BALL_DIAMETER / 2; // Radius of the ball
const PUSH = 1; // Amount of push applied to the ball

/**
 * Ball class represents a ball in the game.
 * @constructor
 * @param {Object} position - The position of the ball.
 * @param {string} color - The color of the ball.
 * @param {number} id - The ID of the ball.
 */
export default function Ball(position, color, id) {
    /**
     * The position of the ball.
     * @type {Object}
     */
    this.position = { x: position.x, y: position.y };

    /**
     * The velocity of the ball.
     * @type {Object}
     */
    this.velocity = { x: 0, y: 0 };

    /**
     * Flag indicating if the ball is moving.
     * @type {boolean}
     */
    this.moving = false;

    /**
     * The color of the ball.
     * @type {string}
     */
    this.color = color;

    /**
     * Flag indicating if the ball has been potted.
     * @type {boolean}
     */
    this.potted = false;

    /**
     * The ID of the ball.
     * @type {number}
     */
    this.id = id;

    /**
     * Flag indicating if the ball has collided with another ball.
     * @type {boolean}
     */
    this.collided = false;
}

/**
 * Update the ball's state.
 * @param {number} delta - The time delta for the update.
 */
Ball.prototype.update = function (delta) {
    // Update the position based on the velocity
    this.position.x += this.velocity.x * delta;
    this.position.y += this.velocity.y * delta;

    // Apply friction to the velocity
    this.velocity.x *= 0.985;
    this.velocity.y *= 0.985;

    // Stop the ball if the velocity is below a threshold
    if (Math.abs(this.velocity.x) < 10 && Math.abs(this.velocity.y) < 10) {
        this.velocity.x = 0;
        this.velocity.y = 0;
        this.moving = false;
    }
};

/**
 * Draw the ball on the canvas.
 */
Ball.prototype.draw = function () {
    Canvas.drawImage(this.color, this.position, BALL_ORIGIN);
};

/**
 * Shoot the ball.
 * @param {number} power - The power of the shot.
 * @param {number} rotation - The rotation angle of the shot.
 */
Ball.prototype.shoot = function (power, rotation) {
    console.log("Shoot");
    // Set the velocity based on the power and rotation
    this.velocity.x = power * Math.cos(rotation);
    this.velocity.y = power * Math.sin(rotation);
    this.moving = true;
};

/**
 * Collide the ball with another ball.
 * @param {Ball} ball - The other ball to collide with.
 */
Ball.prototype.collideWithBall = function (ball) {
    // Find the normal vector between the two balls
    const nx = this.position.x - ball.position.x;
    const ny = this.position.y - ball.position.y;

    // Find the distance between the two balls
    const dist = Math.sqrt(nx * nx + ny * ny);

    // Check if the balls are overlapping
    if (dist > BALL_DIAMETER) {
        return; // No collision occurred
    }

    this.collided = true;



    // Find the minimum translation distance
    const mtdx = ((BALL_DIAMETER - dist) / dist) * nx;
    const mtdy = ((BALL_DIAMETER - dist) / dist) * ny;

    // Push-pull the balls apart
    this.position.x += mtdx / 2;
    this.position.y += mtdy / 2;
    ball.position.x -= mtdx / 2;
    ball.position.y -= mtdy / 2;

    // Find the unit normal vector
    const length = Math.sqrt(nx * nx + ny * ny);
    const unx = nx / length;
    const uny = ny / length;

    // Find the unit tangent vector
    const utx = -uny;
    const uty = unx;

    // Project the velocities onto the unit normal and unit tangent vectors
    const v1n = this.velocity.x * unx + this.velocity.y * uny;
    const v1t = this.velocity.x * utx + this.velocity.y * uty;
    const v2n = ball.velocity.x * unx + ball.velocity.y * uny;
    const v2t = ball.velocity.x * utx + ball.velocity.y * uty;

    // Find the new normal velocities
    let v1nTag = v2n;
    let v2nTag = v1n;

    // Update the velocities
    this.velocity.x = v1nTag * unx + v1t * utx;
    this.velocity.y = v1nTag * uny + v1t * uty;
    ball.velocity.x = v2nTag * unx + v2t * utx;
    ball.velocity.y = v2nTag * uny + v2t * uty;

    this.moving = true;
    ball.moving = true;

    var audio2 = document.getElementById("strike2");
    audio2.play();
};

/**
 * Collide the ball with the table.
 * @param {Table} table - The table to collide with.
 */
Ball.prototype.collideWithTable = function (table) {
    if (!this.moving) {
        return;
    }

    let collided = false;

    // Check collision with the top edge of the table
    if (this.position.y <= table.TopY + BALL_RADIUS) {
        // Check if the ball is colliding with any of the pockets
        if (
            (720 <= this.position.x && this.position.x <= 780) ||
            (table.RightX - 60 <= this.position.x && this.position.x <= table.RightX) ||
            (table.LeftX <= this.position.x && this.position.x <= table.LeftX + 60)
        ) {
            this.velocity.x = 0;
            this.velocity.y = 0;
            this.moving = false;
            this.potted = true;
            var audio = document.getElementById("pot");
            audio.play();
        } else {
            this.velocity.y = -this.velocity.y;
            this.position.y = table.TopY + BALL_RADIUS + PUSH;
        }
        collided = true;
    }

    // Check collision with the right edge of the table
    if (this.position.x >= table.RightX - BALL_RADIUS) {
        this.velocity.x = -this.velocity.x;
        this.position.x = table.RightX - BALL_RADIUS - PUSH;
        collided = true;
    }

    // Check collision with the bottom edge of the table
    if (this.position.y >= table.BottomY - BALL_RADIUS) {
        // Check if the ball is colliding with any of the pockets
        if (
            (720 <= this.position.x && this.position.x <=

                780) ||
            (table.RightX - 60 <= this.position.x && this.position.x <= table.RightX) ||
            (table.LeftX <= this.position.x && this.position.x <= table.LeftX + 60)
        ) {
            this.velocity.x = 0;
            this.velocity.y = 0;
            this.moving = false;
            this.potted = true;
            var audio = document.getElementById("pot");
            audio.play();
        } else {
            this.velocity.y = -this.velocity.y;
            this.position.y = table.BottomY - BALL_RADIUS - PUSH;
        }
        collided = true;
    }

    // Check collision with the left edge of the table
    if (this.position.x <= table.LeftX + BALL_RADIUS) {
        this.velocity.x = -this.velocity.x;
        this.position.x = table.LeftX + BALL_RADIUS + PUSH;
        collided = true;
    }

    if (collided) {
        this.velocity.x *= 0.98;
        this.velocity.y *= 0.98;
    }
};

/**
 * Reposition the ball to a new position.
 * @param {Object} position - The new position of the ball.
 */
Ball.prototype.reposition = function (position) {
    this.position.x = position.x;
    this.position.y = position.y;
    this.velocity.x = 0;
    this.velocity.y = 0;
    this.potted = false;
};

/**
 * Hide the ball.
 */
Ball.prototype.hide = function () {
    this.position.x = -100;
    this.position.y = -100;
};