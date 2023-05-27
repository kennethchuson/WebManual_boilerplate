document.addEventListener("DOMContentLoaded", function() {
  const maze = document.querySelector(".maze");
  const cells = [];

  // Define the maze structure
  const mazeStructure = [
    [1, 1, 1, 1, 0, 1],
    [0, 0, 0, 1, 0, 1],
    [1, 1, 0, 1, 1, 1],
    [1, 1, 0, 0, 0, 1],
    [1, 1, 1, 0, 1, 1],
    [1, 1, 1, 0, 0, 0]
  ];

  // Create maze cells
  for (let i = 0; i < mazeStructure.length; i++) {
    for (let j = 0; j < mazeStructure[i].length; j++) {
      const cell = document.createElement("div");
      cell.classList.add("maze-cell");
      if (mazeStructure[i][j] === 1) {
        cell.classList.add("wall");
      }
      if (i === 0 && j === 0) {
        cell.classList.add("start");
      }
      if (i === mazeStructure.length - 1 && j === mazeStructure[i].length - 1) {
        cell.classList.add("end");
      }
      maze.appendChild(cell);
      cells.push(cell);
    }
  }

  let ratPosition = 0;
  let isAnimating = false;

  // Move the rat
  function moveRat(event) {
    if (isAnimating) return;
    
    const key = event.key;
    let newPosition = ratPosition;

    if (key === "ArrowUp" && ratPosition >= mazeStructure[0].length) {
      newPosition = ratPosition - mazeStructure[0].length;
    } else if (key === "ArrowDown" && ratPosition < cells.length - mazeStructure[0].length) {
      newPosition = ratPosition + mazeStructure[0].length;
    } else if (key === "ArrowLeft" && ratPosition % mazeStructure[0].length !== 0) {
      newPosition = ratPosition - 1;
    } else if (key === "ArrowRight" && (ratPosition + 1) % mazeStructure[0].length !== 0) {
      newPosition = ratPosition + 1;
    }

    if (!cells[newPosition].classList.contains("wall")) {
      isAnimating = true;
      cells[ratPosition].classList.remove("rat");
      cells[newPosition].classList.add("rat");
      ratPosition = newPosition;

      setTimeout(() => {
        if (cells[ratPosition].classList.contains("end")) {
          alert("Congratulations! You reached the end of the maze.");
          window.location.reload();
        }
        isAnimating = false;
      }, 200);
    }
  }

  // Add event listener for arrow key presses
  document.addEventListener("keydown", moveRat);
});