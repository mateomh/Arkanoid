import { CanvasView } from '~/view/CanvasView';
import { Vector } from '../types';

export class Paddle {
  private paddleImage: HTMLImageElement = new Image();
  private moveLeft: boolean;
  private moveRight: boolean;

  constructor(
    private paddleWidth: number,
    private paddleHeight: number,
    private speed: number,
    private position: Vector,
    image: string
  ) {
    this.speed = speed;
    this.paddleWidth = paddleWidth;
    this.paddleHeight = paddleHeight;
    this.position = position;
    this.moveLeft = false;
    this.moveRight = false;
    this.paddleImage.src = image;

    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('keyup', this.handleKeyUp);
  }

  // Getters
  get width(): number {
    return this.paddleWidth;
  }

  get height(): number {
    return this.paddleHeight;
  }

  get pos(): Vector {
    return this.position;
  }

  get image(): HTMLImageElement {
    return this.paddleImage;
  }

  get isMovingLeft(): boolean {
    return this.moveLeft;
  }

  get isMovingRight(): boolean {
    return this.moveRight;
  }

  // METHODS

  movePaddle(): void {
    if(this.moveLeft) this.pos.x -= this.speed;
    if(this.moveRight) this.pos.x += this.speed;
  }

  handleKeyUp = (e: KeyboardEvent) : void => {
    if(e.code === "ArrowLeft" || e.key === "ArrowLeft") this.moveLeft = false;
    if(e.code === "ArrowRight" || e.key === "ArrowRight") this.moveRight = false;
  }

  handleKeyDown = (e: KeyboardEvent) : void => {
    if(e.code === "ArrowLeft" || e.key === "ArrowLeft") this.moveLeft = true;
    if(e.code === "ArrowRight" || e.key === "ArrowRight") this.moveRight = true;
  }

  paddleInsideLimits = (view: CanvasView) : boolean => {
    return (this.isMovingLeft && this.position.x > 0) || (this.isMovingRight && this.position.x < view.canvas.width - this.width);
  }
}