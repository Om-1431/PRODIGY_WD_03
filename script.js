const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("reset");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isGameActive = true;

// Winning combinations
const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

function checkWinner() {
    for (let condition of winningConditions) {
        let [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            isGameActive = false;
            statusText.textContent = `Player ${board[a]} wins! 🎉`;
            return;
        }
    }
    
    if (!board.includes("")) {
        isGameActive = false;
        statusText.textContent = "It's a draw! 😐";
    }
}

function handleCellClick(event) {
    const index = event.target.getAttribute("data-index");

    if (board[index] || !isGameActive) return;

    board[index] = currentPlayer;
    event.target.textContent = currentPlayer;

    checkWinner();

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    if (isGameActive) {
        statusText.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    isGameActive = true;
    currentPlayer = "X";
    statusText.textContent = "Player X's turn";
    cells.forEach(cell => cell.textContent = "");
}

cells.forEach(cell => cell.addEventListener("click", handleCellClick));
resetButton.addEventListener("click", resetGame);
