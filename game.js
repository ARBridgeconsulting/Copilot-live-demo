// Snake Game Logic

class SnakeGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.context = this.canvas.getContext('2d');
        this.canvas.width = 400;
        this.canvas.height = 400;
        this.snake = [{x: 10, y: 10}];
        this.direction = {x: 0, y: 0};
        this.food = this.generateFood();
        this.score = 0;
        this.isGameOver = false;
    }

    generateFood() {
        const x = Math.floor(Math.random() * (this.canvas.width / 10)) * 10;
        const y = Math.floor(Math.random() * (this.canvas.height / 10)) * 10;
        return {x, y};
    }

    changeDirection(event) {
        switch(event.key) {
            case 'ArrowUp':
                if (this.direction.y === 0) {
                    this.direction = {x: 0, y: -10};
                }
                break;
            case 'ArrowDown':
                if (this.direction.y === 0) {
                    this.direction = {x: 0, y: 10};
                }
                break;
            case 'ArrowLeft':
                if (this.direction.x === 0) {
                    this.direction = {x: -10, y: 0};
                }
                break;
            case 'ArrowRight':
                if (this.direction.x === 0) {
                    this.direction = {x: 10, y: 0};
                }
                break;
        }
    }

    updateGame() {
        if (this.isGameOver) return;
        const head = {
            x: this.snake[0].x + this.direction.x,
            y: this.snake[0].y + this.direction.y
        };

        // Check for collisions with walls
        if (head.x < 0 || head.x >= this.canvas.width || head.y < 0 || head.y >= this.canvas.height || 
            this.snake.some(segment => segment.x === head.x && segment.y === head.y)) {
            this.isGameOver = true;
            alert('Game Over! Your score: ' + this.score);
            return;
        }

        this.snake.unshift(head);

        // Check for food collision
        if (head.x === this.food.x && head.y === this.food.y) {
            this.score += 10;
            this.food = this.generateFood();
        } else {
            this.snake.pop();
        }

        this.drawGame();
    }

    drawGame() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw snake
        this.snake.forEach(segment => {
            this.context.fillStyle = 'green';
            this.context.fillRect(segment.x, segment.y, 10, 10);
        });

        // Draw food
        this.context.fillStyle = 'red';
        this.context.fillRect(this.food.x, this.food.y, 10, 10);
    }

    start() {
        document.addEventListener('keydown', (event) => this.changeDirection(event));
        setInterval(() => this.updateGame(), 100);
    }
}

const game = new SnakeGame();
game.start();