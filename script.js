let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-button");
let newGameBtn = document.querySelector("#new-game-button");
let winnerMessage = document.querySelector("#winner-message");

let turn0 = true; // Player O's turn
let gameActive = true; // To track if the game is still active

const winPattern = [
  // Winning patterns
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Function to reset the game board
const resetGame = () => {
  boxes.forEach((box) => {
    box.textContent = "";
    box.disabled = false;
  });
  winnerMessage.textContent = ""; // Clear the winner message
  winnerMessage.classList.add("hidden"); // Hide the winner message
  turn0 = true; // Reset turn
  gameActive = true; // Reactivate the game
};

// Function to check for a winner
const checkWin = () => {
  for (let pattern of winPattern) {
    if (
      boxes[pattern[0]].textContent === boxes[pattern[1]].textContent &&
      boxes[pattern[1]].textContent === boxes[pattern[2]].textContent &&
      boxes[pattern[0]].textContent !== ""
    ) {
      let winner = boxes[pattern[0]].textContent;
      winnerMessage.textContent = `${winner} wins!`;
      winnerMessage.classList.remove("hidden"); // Show the winner message
      gameActive = false; // Deactivate the game
      disableBoard(); // Disable the board
      return;
    }
  }

  // Check for a draw
  if (Array.from(boxes).every((box) => box.textContent !== "")) {
    winnerMessage.textContent = "It's a draw!";
    winnerMessage.classList.remove("hidden"); // Show the draw message
    gameActive = false; // Deactivate the game
  }
};

// Function to disable the board when the game ends
const disableBoard = () => {
  boxes.forEach((box) => (box.disabled = true));
};

// Add click event listeners to all boxes
boxes.forEach((box) => {
  box.addEventListener("click", function () {
    if (gameActive && box.textContent === "") {
      if (turn0) {
        box.textContent = "O";
      } else {
        box.textContent = "X";
      }
      box.disabled = true; // Disable the box after it's clicked
      turn0 = !turn0; // Switch turns
      checkWin(); // Check for a winner or draw
    }
  });
});

// Add click event listeners for reset and new game buttons
resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", () => {
  resetGame(); // Reset the board
  turn0 = true; // Ensure Player O starts first
});
