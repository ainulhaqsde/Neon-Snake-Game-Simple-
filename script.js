const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreEl = document.getElementById("score");
const gameOverScreen = document.getElementById("gameOver");
const finalScoreEl = document.getElementById("finalScore");

let snake, food, dx, dy, score, gameLoop, speed;

function initGame() {
  snake = [{x: 200, y: 200}];
  dx = 20;
  dy = 0;
  score = 0;
  food = {
    x: Math.floor(Math.random() * (canvas.width / 20)) * 20,
    y: Math.floor(Math.random() * (canvas.height / 20)) * 20
  };
  scoreEl.textContent = "Score: " + score;
  gameOverScreen.style.display = "none";
}

function drawSnake() {
  ctx.fillStyle = "#0f0";
  ctx.shadowColor = "#0f0";
  ctx.shadowBlur = 15;
  snake.forEach(part => {
    ctx.beginPath();
    ctx.arc(part.x + 10, part.y + 10, 10, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.shadowBlur = 0;
}

function drawFood() {
  ctx.fillStyle = "red";
  ctx.shadowColor = "red";
  ctx.shadowBlur = 20;
  ctx.beginPath();
  ctx.arc(food.x + 10, food.y + 10, 10, 0, Math.PI*2);
  ctx.fill();
  ctx.shadowBlur = 0;
}

function moveSnake() {
  const head = {x: snake[0].x + dx, y: snake[0].y + dy};
  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score++;
    scoreEl.textContent = "Score: " + score;
    food = {
      x: Math.floor(Math.random() * (canvas.width / 20)) * 20,
      y: Math.floor(Math.random() * (canvas.height / 20)) * 20
    };
  } else {
    snake.pop();
  }
}

function checkCollision() {
  const head = snake[0];
  if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
    endGame();
  }
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      endGame();
    }
  }
}

function gameTick() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  drawFood();
  moveSnake();
  drawSnake();
  checkCollision();
}

function startGame(s) {
  speed = s;
  initGame();
  clearInterval(gameLoop);
  gameLoop = setInterval(gameTick, 1000 / speed);
}

function pauseGame() {
  clearInterval(gameLoop);
}

function resumeGame() {
  clearInterval(gameLoop);
  gameLoop = setInterval(gameTick, 1000 / speed);
}

function endGame() {
  clearInterval(gameLoop);
  finalScoreEl.textContent = "Score: " + score;
  gameOverScreen.style.display = "block";
}

function restartGame() {
  startGame(speed);
}

document.addEventListener("keydown", e => {
  if (e.key === "ArrowUp" && dy === 0) {dx = 0; dy = -20;}
  if (e.key === "ArrowDown" && dy === 0) {dx = 0; dy = 20;}
  if (e.key === "ArrowLeft" && dx === 0) {dx = -20; dy = 0;}
  if (e.key === "ArrowRight" && dx === 0) {dx = 20; dy = 0;}
});
