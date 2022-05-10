import { Brick } from "~/sprites/Brick";
import { Paddle } from "~/sprites/Paddle";
import { Ball } from "~/sprites/Ball";
import { CanvasView } from "./view/CanvasView";

import PADDLE_IMAGE from "./images/paddle.png";
import BALL_IMAGE from "./images/ball.png";

import {
  PADDLE_SPEED,
  PADDLE_WIDTH,
  PADDLE_HEIGHT,
  PADDLE_STARTX,
  BALL_SPEED,
  BALL_SIZE,
  BALL_STARTX,
  BALL_STARTY
} from "./setup";

import { createBricks } from './helpers';

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
  // ball: Ball
) => {
  view.clear();
  view.drawBricks(bricks);
  view.drawSprite(paddle);

  // Move Paddle
  if(paddle.paddleInsideLimits(view)) {
    paddle.movePaddle();
  }

  requestAnimationFrame(() => gameLoop(view, bricks, paddle));
}

const startGame = (view: CanvasView) => {
  score = 0;
  // view.drawInfo('');
  // view.drawScore(0);

  const bricks = createBricks();

  const paddle = new Paddle(
    PADDLE_WIDTH,
    PADDLE_HEIGHT,
    PADDLE_SPEED,
    {x: PADDLE_STARTX, y: view.canvas.height - PADDLE_HEIGHT - 5},
    PADDLE_IMAGE
  );

  gameLoop(view, bricks, paddle);
}

const view = new CanvasView("#playField");
view.initStartButton(startGame);
