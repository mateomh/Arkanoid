import { Brick } from "~/sprites/Brick";
import { Paddle } from "~/sprites/Paddle";
import { Ball } from "~/sprites/Ball";

export class CanvasView {
  clear: Function;
  initStartButton: Function;
  drawScore: Function;
  drawInfo: Function;
  drawSprite: Function;
  drawBricks: Function;
  canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D | null;
  private scoreDisplay: HTMLObjectElement | null;
  private start: HTMLObjectElement | null;
  private info: HTMLObjectElement | null;

  constructor(canvasName: string) {
    this.canvas = document.querySelector(canvasName) as HTMLCanvasElement;
    this.context = this.canvas.getContext('2d');
    this.scoreDisplay = document.querySelector('#score');
    this.start = document.querySelector('#start');
    this.info = document.querySelector('#info');

    this.clear = (): void => {
      this.context?.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    this.initStartButton = (startFunction: (view: CanvasView) => void): void => {
      this.start?.addEventListener('click', () => startFunction)
    }

    this.drawScore = (score: number): void => {
      if(this.scoreDisplay) {
        this.scoreDisplay.innerHTML = score.toString();
      }
    }

    this.drawInfo = (text: string): void => {

    }

    this.drawSprite = (sprite: Brick): void => {
      if(!sprite) return;

      this.context?.drawImage(
        sprite.image,
        sprite.pos.x,
        sprite.pos.y,
        sprite.width,
        sprite.height
      );
    }

    this.drawBricks = (bricks: Brick[]): void => {
      bricks.forEach(brick => {
        this.drawSprite(brick)
      });
    }
  }
}