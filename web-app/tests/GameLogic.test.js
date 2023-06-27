import SpeedyShotsTest from "../GameLogic.js";
import { JSDOM } from "jsdom";

const dom = new JSDOM();
global.document = dom.window.document;

/**
 * Speedy Shots test suite.
 */
describe("SPEEDY SHOTS TESTS", function () {
  /**
   * Test case: Mocha setup is working
   */
  it("Mocha setup is working", function () {
    const result = SpeedyShotsTest.testMocha();
    if (result !== "mocha") {
      throw new Error(`Expected testMocha to return "mocha", but got ${result}`);
    }
  });

  /**
   * Test case: GameLogic is correctly initialized
   */
  it("GameLogic is correctly initialized", function () {
    SpeedyShotsTest.init();
    const gameLogic = SpeedyShotsTest.gameLogic;
    if (!gameLogic) {
      throw new Error(`GameLogic is not initialized`);
    }
  });

  /**
   * Test case: GameLogic blackBall starts at the correct position
   */
  it("GameLogic blackBall starts at the correct position", function () {
    SpeedyShotsTest.init();
    const blackBallPosition = SpeedyShotsTest.gameLogic.blackBall.position;
    if (blackBallPosition.x !== 1090 || blackBallPosition.y !== 413) {
      throw new Error(`Black ball position is incorrect`);
    }
  });

  /**
   * Test case: GameLogic whiteBall starts at the correct position
   */
  it("GameLogic whiteBall starts at the correct position", function () {
    SpeedyShotsTest.init();
    const whiteBallPosition = SpeedyShotsTest.gameLogic.whiteBall.position;
    if (whiteBallPosition.x !== 413 || whiteBallPosition.y !== 413) {
      throw new Error(`White ball position is incorrect`);
    }
  });

  /**
   * Test case: GameLogic startTimer starts the timer
   */
  it("GameLogic startTimer starts the timer", function () {
    SpeedyShotsTest.init();
    SpeedyShotsTest.gameLogic.startTimer();
    const countdown = SpeedyShotsTest.gameLogic.countdown;
    if (countdown !== 60) {
      throw new Error("Timer is not started correctly");
    }
  });

  /**
   * Test case: GameLogic ballsMoving returns true if balls are moving
   */
  it("GameLogic ballsMoving returns true if balls are moving", function () {
    SpeedyShotsTest.init();
    SpeedyShotsTest.gameLogic.whiteBall.moving = true;
    const ballsMoving = SpeedyShotsTest.gameLogic.ballsMoving();
    if (!ballsMoving) {
      throw new Error("ballsMoving should return true if balls are moving");
    }
  });

  /**
   * Test case: GameLogic ballsMoving returns false if balls are not moving
   */
  it("GameLogic ballsMoving returns false if balls are not moving", function () {
    SpeedyShotsTest.init();
    SpeedyShotsTest.gameLogic.whiteBall.moving = false;
    SpeedyShotsTest.gameLogic.blackBall.moving = false;
    const ballsMoving = SpeedyShotsTest.gameLogic.ballsMoving();
    if (ballsMoving) {
      throw new Error("ballsMoving should return false if balls are not moving");
    }
  });

  /**
   * Test case: GameLogic subtractFromTimer subtracts from the timer
   */
  it("GameLogic subtractFromTimer subtracts from the timer", function () {
    SpeedyShotsTest.init();
    SpeedyShotsTest.gameLogic.countdown = 10;
    SpeedyShotsTest.gameLogic.subtractFromTimer();
    const countdown = SpeedyShotsTest.gameLogic.countdown;
    if (countdown !== 7) {
      throw new Error("Timer is not subtracted correctly");
    }
  });

  /**
   * Test case: GameLogic score starts at 0
   */
  it("GameLogic score starts at 0", function () {
    SpeedyShotsTest.init();
    const score = SpeedyShotsTest.gameLogic.score;
    if (score !== 0) {
      throw new Error("Score is not initialized to 0");
    }
  });
});