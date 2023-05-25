// Get a reference to the game canvas
var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");

// Player object
function Player(x, y, width, height, color, speed) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.color = color;
  this.speed = speed;
  this.isMovingLeft = false;
  this.isMovingRight = false;
}

Player.prototype.update = function() {
  if (this.isMovingLeft && this.x > 0) {
    this.x -= this.speed;
  } else if (this.isMovingRight && this.x < canvas.width - this.width) {
    this.x += this.speed;
  }
};

Player.prototype.draw = function() {
  context.beginPath();
  context.rect(this.x, this.y, this.width, this.height);
  context.fillStyle = this.color;
  context.fill();
  context.closePath();
};



// Ball object
function Ball(x, y, radius, color, speedX, speedY) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;
  this.speedX = speedX;
  this.speedY = speedY;
}

Ball.prototype.update = function() {
  this.x += this.speedX;
  this.y += this.speedY;

  if (this.x - this.radius < 0 || this.x + this.radius > canvas.width) {
    this.speedX = -this.speedX;
  }

  if (this.y - this.radius < 0 || this.y + this.radius > canvas.height) {
    this.speedY = -this.speedY;
  }


  // Check collision with player
  if (
    this.y + this.radius > player.y &&
    this.y - this.radius < player.y + player.height &&
    this.x + this.radius > player.x &&
    this.x - this.radius < player.x + player.width
  ) {
    this.speedY = -this.speedY;
  }
  
};

Ball.prototype.draw = function() {
  context.beginPath();
  context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
  context.fillStyle = this.color;
  context.fill();
  context.closePath();
};

// Event listeners for player movement
document.addEventListener("keydown", function(event) {
  if (event.key === "ArrowLeft") {
    player.isMovingLeft = true;
  } else if (event.key === "ArrowRight") {
    player.isMovingRight = true;
  }
});

document.addEventListener("keyup", function(event) {
  if (event.key === "ArrowLeft") {
    player.isMovingLeft = false;
  } else if (event.key === "ArrowRight") {
    player.isMovingRight = false;
  }
});

// Create player object
var player = new Player(canvas.width / 2, canvas.height - 20, 80, 10, "blue", 5);

// Create ball object
var ball = new Ball(canvas.width / 2, canvas.height / 2, 10, "red", 2, -2);

// Game loop function
function gameLoop() {
  // Clear the canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Update game objects
  player.update();
  ball.update();

  // Draw game objects
  player.draw();
  ball.draw();

  // Call the game loop function recursively
  requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();
