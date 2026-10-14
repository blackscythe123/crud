const boardSize = 5;
let boardState = [];
let marked = [];
let isWon = false;

document.addEventListener("DOMContentLoaded", function () {
    startNewGame();
});

function startNewGame() {
    isWon = false;
    document.getElementById("winBanner").textContent = "";
    document.getElementById("linesCompleted").textContent = "0";

    for (let i = 0; i < 5; i++) {
        document.getElementById("letter-" + i).classList.remove("active");
    }

    const numbers = [];
    for (let i = 1; i <= 25; i++) {
        numbers.push(i);
    }

    numbers.sort(function () {
        return 0.5 - Math.random();
    });

    boardState = numbers;
    marked = new Array(25).fill(false);

    const grid = document.getElementById("bingoGrid");
    grid.innerHTML = "";

    for (let i = 0; i < 25; i++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.textContent = boardState[i];
        cell.setAttribute("data-index", i);
        cell.addEventListener("click", function () {
            toggleCell(i, cell);
        });
        grid.appendChild(cell);
    }
}

function toggleCell(index, cell) {
    if (isWon) return;

    marked[index] = !marked[index];
    if (marked[index]) {
        cell.classList.add("marked");
    } else {
        cell.classList.remove("marked");
    }

    checkBingo();
}

function checkBingo() {
    let completedLines = 0;

    for (let row = 0; row < 5; row++) {
        let fullRow = true;
        for (let col = 0; col < 5; col++) {
            if (!marked[row * 5 + col]) {
                fullRow = false;
                break;
            }
        }
        if (fullRow) completedLines++;
    }

    for (let col = 0; col < 5; col++) {
        let fullCol = true;
        for (let row = 0; row < 5; row++) {
            if (!marked[row * 5 + col]) {
                fullCol = false;
                break;
            }
        }
        if (fullCol) completedLines++;
    }

    let mainDiagonal = true;
    for (let i = 0; i < 5; i++) {
        if (!marked[i * 5 + i]) {
            mainDiagonal = false;
            break;
        }
    }
    if (mainDiagonal) completedLines++;

    let antiDiagonal = true;
    for (let i = 0; i < 5; i++) {
        if (!marked[i * 5 + (4 - i)]) {
            antiDiagonal = false;
            break;
        }
    }
    if (antiDiagonal) completedLines++;

    const displayLines = Math.min(completedLines, 5);
    document.getElementById("linesCompleted").textContent = displayLines;

    for (let i = 0; i < 5; i++) {
        const letterEl = document.getElementById("letter-" + i);
        if (i < displayLines) {
            letterEl.classList.add("active");
        } else {
            letterEl.classList.remove("active");
        }
    }

    if (displayLines >= 5 && !isWon) {
        isWon = true;
        document.getElementById("winBanner").textContent = "🎉 BINGO! You won! 🎉";
    }
}
