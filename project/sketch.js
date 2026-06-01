let snake;
let rez = 20;
let food;
let w;
let h;

let gameOver = false;
let score = 0;
let gameStarted = false;

let startButton;

let scoreText;
let controlsText;

function setup() {

  // Game canvas only
  createCanvas(400, 400);

  w = floor(width / rez);
  h = floor(height / rez);

  frameRate(10);

  // Score UI
  scoreText = createP("Score: 0");
  scoreText.style("font-size", "24px");
  scoreText.style("color", "white");

  // Controls UI
  controlsText = createP("Controls: Arrow Keys to Move");
  controlsText.style("font-size", "16px");
  controlsText.style("color", "white");

  // Start button
  startButton = createButton("Start Game");

  startButton.mousePressed(() => {
    startGame();
    gameStarted = true;
    startButton.hide();
  });
}

function startGame() {
  snake = new Snake();

  score = 0;
  gameOver = false;

  foodLocation();

  loop();
}

let foodColor;

function foodLocation() {
  let x = floor(random(w));
  let y = floor(random(h));

  food = createVector(x, y);

  // Random RGB color
  foodColor = color(
    random(50, 255),
    random(50, 255),
    random(50, 255)
  );
}

function keyPressed() {

  // Restart game
  if (gameOver && key === 'r') {
    startGame();
    return;
  }

  // Prevent reversing direction
  if (keyCode === UP_ARROW && snake.ydir !== 1) {
    snake.setDir(0, -1);

  } else if (keyCode === DOWN_ARROW && snake.ydir !== -1) {
    snake.setDir(0, 1);

  } else if (keyCode === LEFT_ARROW && snake.xdir !== 1) {
    snake.setDir(-1, 0);

  } else if (keyCode === RIGHT_ARROW && snake.xdir !== -1) {
    snake.setDir(1, 0);
  }
}

function draw() {

  background(20);

  // Update score text
  scoreText.html("Score: " + score);

  // Waiting screen
  if (!gameStarted) {

    fill(255);

    textAlign(CENTER);
    textSize(32);

    text("SNAKE GAME", width / 2, height / 2 - 40);

    textSize(18);
    text("Press Start to Play", width / 2, height / 2);

    return;
  }

  push();

  scale(rez);

  if (!gameOver) {

    if (snake.eat(food)) {
      foodLocation();
      score++;
    }

    snake.update();

    if (snake.endGame()) {
      gameOver = true;
      noLoop();
    }

    snake.show();

    // Food
    noStroke();
    fill(foodColor);
    rect(food.x, food.y, 1, 1, 0.3);
  }

  pop();

  if (gameOver) {

    fill(255, 0, 0);

    textAlign(CENTER);
    textSize(40);

    text("GAME OVER", width / 2, height / 2);

    textSize(20);

    fill(255);
    text("Press R to Restart", width / 2, height / 2 + 40);
  }
}

function drawControls() {

  fill(255);
  textSize(14);
  textAlign(LEFT);

  text("Controls:", 10, 60);
  text("↑ = Up", 10, 80);
  text("↓ = Down", 10, 100);
  text("← = Left", 10, 120);
  text("→ = Right", 10, 140);
}
