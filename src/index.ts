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
import { Collision } from './Collision';

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
  ball: Ball,
  collision: Collision
) => {
  view.clear();
  view.drawBricks(bricks);
  view.drawSprite(paddle);
  view.drawSprite(ball);

  // Move Ball
  ball.moveBall();

  // Move Paddle
  if(paddle.paddleInsideLimits(view)) {
    paddle.movePaddle();
  }

  collision.checkBallCollision(ball, paddle, view);
  const collidingBrick = collision.isCollidingBricks(ball, bricks);

  if(collidingBrick) {
    score += 1;
  }

  // Game over section
  if(ball.pos.y > view.canvas.height) gameOver = true;
  if(bricks.length === 0) return setGameWin(view);
  if(gameOver) return setGameOver(view);

  requestAnimationFrame(() => gameLoop(view, bricks, paddle, ball, collision));
}

const startGame = (view: CanvasView) => {
  score = 0;
  view.drawInfo('');
  view.drawScore(0);

  const bricks = createBricks();

  const paddle = new Paddle(
    PADDLE_WIDTH,
    PADDLE_HEIGHT,
    PADDLE_SPEED,
    {x: PADDLE_STARTX, y: view.canvas.height - PADDLE_HEIGHT - 5},
    PADDLE_IMAGE
  );

  const ball = new Ball(
    BALL_SIZE,
    {x: BALL_STARTX, y: BALL_STARTY},
    BALL_SPEED,
    BALL_IMAGE
  );

  const collision = new Collision();

  gameLoop(view, bricks, paddle, ball, collision);
}

const view = new CanvasView("#playField");
view.initStartButton(startGame);
