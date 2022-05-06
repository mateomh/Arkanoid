import { Brick } from "~/sprites/Brick";
import { Paddle } from "~/sprites/Paddle";
import { Ball } from "~/sprites/Ball";
import { CanvasView } from "./view/CanvasView"

import PADDLE_IMAGE from "./images/paddle.png"
import BALL_IMAGE from "./images/ball.png"

import {
  PADDLE_SPEED,
  PADDLE_WIDTH,
  PADDLE_HEIGHT,
  PADDLE_STARTX,
  BALL_SPEED,
  BALL_SIZE,
  BALL_STARTX,
  BALL_STARTY
} from "./setup"

let gameOver = false
let score = 0

const setGameOver = (view: CanvasView) => {
  view.drawInfo("GAME OVER!!!");
  gameOver = true;
}

const setGameWin = (view: CanvasView) => {
  view.drawInfo("YOU WON!!!!!!");
  gameOver = true;
}

const gameLoop = (
  view: CanvasView,
  bricks: Brick[],
  paddle: Paddle,
  ball: Ball
) => {

}

const startGame = (view: CanvasView) => {

}

const view = new CanvasView("#playField");
view.initStartButton(startGame);
