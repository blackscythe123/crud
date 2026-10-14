let playerScore = 0;
let computerScore = 0;
let tieScore = 0;

const choices = ["Rock", "Paper", "Scissors"];

function playGame(playerChoice) {
    const randomIndex = Math.floor(Math.random() * choices.length);
    const computerChoice = choices[randomIndex];

    document.getElementById("playerChoice").textContent = playerChoice;
    document.getElementById("computerChoice").textContent = computerChoice;

    let result = "";

    if (playerChoice === computerChoice) {
        result = "It's a Tie!";
        tieScore++;
        document.getElementById("tieScore").textContent = tieScore;
    } else if (
        (playerChoice === "Rock" && computerChoice === "Scissors") ||
        (playerChoice === "Paper" && computerChoice === "Rock") ||
        (playerChoice === "Scissors" && computerChoice === "Paper")
    ) {
        result = "You Win! 🎉";
        playerScore++;
        document.getElementById("playerScore").textContent = playerScore;
    } else {
        result = "Computer Wins! 💻";
        computerScore++;
        document.getElementById("computerScore").textContent = computerScore;
    }

    document.getElementById("roundResult").textContent = result;
}

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    tieScore = 0;

    document.getElementById("playerScore").textContent = "0";
    document.getElementById("computerScore").textContent = "0";
    document.getElementById("tieScore").textContent = "0";

    document.getElementById("playerChoice").textContent = "-";
    document.getElementById("computerChoice").textContent = "-";
    document.getElementById("roundResult").textContent = "Choose an option to start!";
}
