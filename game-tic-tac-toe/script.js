let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

document.addEventListener("DOMContentLoaded", function () {
    const cells = document.querySelectorAll(".cell");
    cells.forEach(function (cell) {
        cell.addEventListener("click", handleCellClick);
    });
});

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedIndex = parseInt(clickedCell.getAttribute("data-index"), 10);

    if (board[clickedIndex] !== "" || !gameActive) {
        return;
    }

    board[clickedIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    checkResult();
}

function checkResult() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        const a = board[winCondition[0]];
        const b = board[winCondition[1]];
        const c = board[winCondition[2]];

        if (a === "" || b === "" || c === "") {
            continue;
        }

        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        document.getElementById("status").textContent = "Player " + currentPlayer + " Wins! 🎉";
        gameActive = false;
        return;
    }

    const roundDraw = !board.includes("");
    if (roundDraw) {
        document.getElementById("status").textContent = "Game Draw! 🤝";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    document.getElementById("status").textContent = "Player " + currentPlayer + "'s Turn";
}

function restartGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";
    document.getElementById("status").textContent = "Player X's Turn";

    document.querySelectorAll(".cell").forEach(function (cell) {
        cell.textContent = "";
    });
}
