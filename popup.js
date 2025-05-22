const menu = document.getElementById('menu');
const game = document.getElementById('game');
const startBtn = document.getElementById('startBtn');
const scoreBoard = document.getElementById('scoreBoard');

startBtn.addEventListener('click', () => {
    menu.style.display = 'none';
    game.style.display = 'flex';
    startSnakeGame();
});

function startSnakeGame() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const box = 20;
    const canvasSize = 280;
    let snake = [{ x: 140, y: 140 }];
    let dx = box;
    let dy = 0;
    let food = randomFood();
    let score = 0;

    document.addEventListener('keydown', changeDirection);

    function changeDirection(e) {
        const key = e.key;
        if (key === 'ArrowUp' && dy === 0) {
            dx = 0; dy = -box;
        } else if (key === 'ArrowDown' && dy === 0) {
            dx = 0; dy = box;
        } else if (key === 'ArrowLeft' && dx === 0) {
            dx = -box; dy = 0;
        } else if (key === 'ArrowRight' && dx === 0) {
            dx = box; dy = 0;
        }
    }

    function randomFood() {
        return {
            x: Math.floor(Math.random() * (canvasSize / box)) * box,
            y: Math.floor(Math.random() * (canvasSize / box)) * box,
        };
    }

    function gameLoop() {
        const head = { x: snake[0].x + dx, y: snake[0].y + dy };

        if (head.x >= canvasSize) head.x = 0;
        else if (head.x < 0) head.x = canvasSize - box;
        if (head.y >= canvasSize) head.y = 0;
        else if (head.y < 0) head.y = canvasSize - box;

        if (head.x === food.x && head.y === food.y) {
            snake.unshift(head);
            food = randomFood();
            score++;
            scoreBoard.textContent = `Score: ${score}`;
        } else {
            snake.unshift(head);
            snake.pop();
        }

        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = 'yellow';
        ctx.fillRect(food.x, food.y, box, box);

        for (let segment of snake) {
            ctx.fillStyle = 'lime';
            ctx.fillRect(segment.x, segment.y, box, box);
            ctx.strokeStyle = '#064420';
            ctx.lineWidth = 1;
            ctx.strokeRect(segment.x, segment.y, box, box);
        }

        ctx.fillStyle = 'white';
        ctx.font = '16px Arial';
        ctx.fillText(`Score: ${score}`, 10, 20);
    }

    setInterval(gameLoop, 150);
}
