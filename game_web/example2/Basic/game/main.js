// Get a reference to the game canvas
var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");

// Define game constants
var BOARD_SIZE = 3;
var CELL_SIZE = canvas.width / BOARD_SIZE;

// Initialize game state
var board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
var currentPlayer = 1;
var gameEnded = false;

// Add event listener for mouse click
canvas.addEventListener("click", handleClick);

// Game loop function
function gameLoop() {
  // Clear the canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Render game objects
  drawBoard();

  // Call the game loop function recursively
  requestAnimationFrame(gameLoop);
}

// Function to handle mouse click
function handleClick(event) {
  if (gameEnded) {
    return;
  }

  var rect = canvas.getBoundingClientRect();
  var mouseX = event.clientX - rect.left;
  var mouseY = event.clientY - rect.top;

  var row = Math.floor(mouseY / CELL_SIZE);
  var col = Math.floor(mouseX / CELL_SIZE);

  if (board[row][col] === 0) {
    board[row][col] = currentPlayer;
    currentPlayer = currentPlayer === 1 ? 2 : 1;
  }

  checkGameEnd();

  if (gameEnded) {
    var messageElement = document.getElementById("gameMessage");
    if (checkWinner(1)) {
      messageElement.textContent = "Player X wins!";
    } else if (checkWinner(2)) {
      messageElement.textContent = "Player O wins!";
    } else {
      messageElement.textContent = "It's a tie!";
    }
  }
}

// Function to draw the game board
function drawBoard() {
  context.strokeStyle = "#000";
  context.lineWidth = 2;

  for (var row = 0; row < BOARD_SIZE; row++) {
    for (var col = 0; col < BOARD_SIZE; col++) {
      var cellX = col * CELL_SIZE;
      var cellY = row * CELL_SIZE;

      context.strokeRect(cellX, cellY, CELL_SIZE, CELL_SIZE);

      var cellValue = board[row][col];
      if (cellValue !== 0) {
        context.font = "bold 40px Arial";
        context.textAlign = "center";
        context.textBaseline = "middle";

        if (cellValue === 1) {
          context.fillStyle = "#FF0000";
          context.fillText("X", cellX + CELL_SIZE / 2, cellY + CELL_SIZE / 2);
        } else {
          context.fillStyle = "#0000FF";
          context.fillText("O", cellX + CELL_SIZE / 2, cellY + CELL_SIZE / 2);
        }
      }
    }
  }
}

// Function to check if the game has ended
function checkGameEnd() {
  // Check rows
  for (var row = 0; row < BOARD_SIZE; row++) {
    if (
      board[row][0] !== 0 &&
      board[row][0] === board[row][1] &&
      board[row][0] === board[row][2]
    ) {
      gameEnded = true;
      return;
    }
  }

  // Check columns
  for (var col = 0; col < BOARD_SIZE; col++) {
    if (
      board[0][col] !== 0 &&
      board[0][col] === board[1][col] &&
      board[0][col] === board[2][col]
    ) {
      gameEnded = true;
      return;
    }
  }

  // Check diagonals
  if (
    board[0][0] !== 0 &&
    board[0][0] === board[1][1] &&
    board[0][0] === board[2][2]
  ) {
    gameEnded = true;
    return;
  }

  if (
    board[0][2] !== 0 &&
    board[0][2] === board[1][1] &&
    board[0][2] === board[2][0]
  ) {
    gameEnded = true;
    return;
  }

  // Check for a draw
  var isDraw = true;
  for (var row = 0; row < BOARD_SIZE; row++) {
    for (var col = 0; col < BOARD_SIZE; col++) {
      if (board[row][col] === 0) {
        isDraw = false;
        break;
      }
    }
    if (!isDraw) {
      break;
    }
  }

  if (isDraw) {
    gameEnded = true;
  }
}

// Function to check if a player has won
function checkWinner(player) {
  // Check rows
  for (var row = 0; row < BOARD_SIZE; row++) {
    if (
      board[row][0] === player &&
      board[row][0] === board[row][1] &&
      board[row][0] === board[row][2]
    ) {
      return true;
    }
  }

  // Check columns
  for (var col = 0; col < BOARD_SIZE; col++) {
    if (
      board[0][col] === player &&
      board[0][col] === board[1][col] &&
      board[0][col] === board[2][col]
    ) {
      return true;
    }
  }

  // Check diagonals
  if (
    board[0][0] === player &&
    board[0][0] === board[1][1] &&
    board[0][0] === board[2][2]
  ) {
    return true;
  }

  if (
    board[0][2] === player &&
    board[0][2] === board[1][1] &&
    board[0][2] === board[2][0]
  ) {
    return true;
  }

  return false;
}

// Start the game loop
gameLoop();