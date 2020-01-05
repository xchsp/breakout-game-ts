import {Entity} from './Entity'
import {IGameOptions} from '../Game'

export class Ball extends Entity {
    public dx: number = 2
    public dy: number = -2

    constructor(
        public x: number,
        public y: number,
        public width: number,
        public height: number,
        public color: string
    ) {
        super(x,y,width,height)
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.width, 0, Math.PI * 2, false)
        ctx.fillStyle = this.color
        ctx.fill()
        ctx.closePath()
    }
    public updatePosition(): void {
        this.x += this.dx
        this.y += this.dy
    }
    public checkBoundary(gameArea: IGameOptions): void {
        if ((this.x + this.dx > gameArea.canvasWidth - this.width ) ||
          (this.x + this.dx  < this.width)){
              this.dx = -this.dx
        }
        if (this.y + this.dy < this.width) {
            this.dy = -this.dy
        }
    }
}