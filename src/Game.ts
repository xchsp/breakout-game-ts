import {Ball} from './entities/Ball'
import {Paddle} from './entities/Paddle'
import {Score} from './entities/Score'

export interface IGameOptions {
    canvasWidth: number,
    canvasHeight: number,
    canvasId: string
}

export class Game {
    private ctx: CanvasRenderingContext2D = null
    public ball: Ball = null
    public paddle: Paddle = null
    public score: Score = null
    public interval: any
    private isGameOver: boolean = false
    

    constructor(public gameOptions: IGameOptions){
        this.initGame()
    }

    private initCanvas(): void {
        const canvas: HTMLCanvasElement = document.getElementById(
            this.gameOptions.canvasId
        ) as HTMLCanvasElement
       
        canvas.width = this.gameOptions.canvasWidth
        canvas.height = this.gameOptions.canvasHeight
        this.ctx = canvas.getContext('2d')
    }

    private initBall() : void {
        const ballX = this.gameOptions.canvasWidth/2
        const ballY = this.gameOptions.canvasHeight/2 -10
        const ballRadius = 10

        this.ball = new Ball(ballX, ballY, ballRadius, 0, 'green')
    }

    private initPaddle(): void {
        const paddleWidth = 120
        const paddleHeight = 10
        const paddleX = (this.gameOptions.canvasWidth-paddleWidth)/2
        const paddleY = this.gameOptions.canvasHeight - paddleHeight

        this.paddle = new Paddle(
            paddleX, 
            paddleY, 
            paddleWidth, 
            paddleHeight,
            'green'
        )
    }

    private draw(): void {
        if (this.isGameOver) {
            clearInterval(this.interval)
            this.restateGame()
        }
        this.ctx.clearRect(
            0, 
            0,
            this.gameOptions.canvasWidth, 
            this.gameOptions.canvasHeight
        )
        this.ball.draw(this.ctx)
        this.ball.updatePosition()
        this.ball.checkCollision(this.gameOptions, this.paddle)
        this.isGameOver = this.ball.isOverTheEdge()

        this.paddle.draw(this.ctx)
        this.paddle.checkMovement(this.gameOptions)
        
        this.score.draw(this.ctx)
    }

    private restateGame(): void {
        const playAgainBtn: HTMLButtonElement =  document.querySelector('.play-again')
        playAgainBtn.style.display = 'block';
        playAgainBtn.addEventListener('click', ()=> {
            playAgainBtn.style.display = 'none';
            this.isGameOver = false
            this.ctx.clearRect(
                0, 
                0,
                this.gameOptions.canvasWidth, 
                this.gameOptions.canvasHeight
            )
            clearInterval(this.interval)
            this.initGame()
        }, false)
    }

    private initEvent(): void {
        document.addEventListener('keydown', (e)=> this.paddle.beginMovement(e))
        document.addEventListener('keyup', (e)=> this.paddle.stopMovement(e))
    }

    private initGameLoop() : void {
        this.interval = setInterval(() => this.draw(), 10)
    }

    private initGame(): void {
        this.initCanvas()
        this.initBall()
        this.initPaddle()
        this.initScore()
        this.initEvent()
        this.initGameLoop()
    }

    private initScore(): void {
        this.score = new Score(8,20,0,0,'green')
    }
}