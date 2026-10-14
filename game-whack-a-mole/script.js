let score = 0;
let timeLeft = 30;
let gameInterval = null;
let moleTimeout = null;
let lastHole = null;
let isPlaying = false;

function startGame() {
    if (isPlaying) return;

    isPlaying = true;
    score = 0;
    timeLeft = 30;

    document.getElementById("score").textContent = score;
    document.getElementById("timeLeft").textContent = timeLeft;
    document.getElementById("startBtn").disabled = true;

    peepMole();

    gameInterval = setInterval(function () {
        timeLeft--;
        document.getElementById("timeLeft").textContent = timeLeft;

        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

function getRandomHole() {
    const holes = document.querySelectorAll(".hole");
    const randomIndex = Math.floor(Math.random() * holes.length);
    const selectedHole = holes[randomIndex];

    if (selectedHole === lastHole) {
        return getRandomHole();
    }

    lastHole = selectedHole;
    return selectedHole;
}

function peepMole() {
    if (!isPlaying) return;

    const hole = getRandomHole();
    hole.classList.add("up");

    const stayTime = Math.floor(Math.random() * 500) + 600;

    moleTimeout = setTimeout(function () {
        hole.classList.remove("up");
        if (isPlaying) {
            peepMole();
        }
    }, stayTime);
}

function whackMole(moleElement) {
    const hole = moleElement.parentElement;
    if (!isPlaying || !hole.classList.contains("up")) return;

    score++;
    document.getElementById("score").textContent = score;
    hole.classList.remove("up");

    clearTimeout(moleTimeout);
    setTimeout(peepMole, 200);
}

function endGame() {
    isPlaying = false;
    clearInterval(gameInterval);
    clearTimeout(moleTimeout);

    document.querySelectorAll(".hole").forEach(function (hole) {
        hole.classList.remove("up");
    });

    document.getElementById("startBtn").disabled = false;
    alert("Game Over! Your final score is: " + score);
}
