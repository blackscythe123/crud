const symbols = ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊"];
let cards = [];
let flippedCards = [];
let matchedCount = 0;
let moves = 0;
let lockBoard = false;

document.addEventListener("DOMContentLoaded", function () {
    initGame();
});

function initGame() {
    const grid = document.getElementById("cardGrid");
    grid.innerHTML = "";

    cards = [...symbols, ...symbols];
    cards.sort(function () {
        return 0.5 - Math.random();
    });

    flippedCards = [];
    matchedCount = 0;
    moves = 0;
    lockBoard = false;

    document.getElementById("moves").textContent = moves;
    document.getElementById("matches").textContent = matchedCount;

    cards.forEach(function (symbol, index) {
        const card = document.createElement("div");
        card.classList.add("card");
        card.setAttribute("data-symbol", symbol);
        card.setAttribute("data-index", index);
        card.textContent = "?";

        card.addEventListener("click", handleCardClick);
        grid.appendChild(card);
    });
}

function handleCardClick(event) {
    const clickedCard = event.currentTarget;

    if (lockBoard) return;
    if (clickedCard.classList.contains("flipped") || clickedCard.classList.contains("matched")) return;

    const symbol = clickedCard.getAttribute("data-symbol");
    clickedCard.textContent = symbol;
    clickedCard.classList.add("flipped");

    flippedCards.push(clickedCard);

    if (flippedCards.length === 2) {
        moves++;
        document.getElementById("moves").textContent = moves;
        checkMatch();
    }
}

function checkMatch() {
    const card1 = flippedCards[0];
    const card2 = flippedCards[1];

    const symbol1 = card1.getAttribute("data-symbol");
    const symbol2 = card2.getAttribute("data-symbol");

    if (symbol1 === symbol2) {
        card1.classList.add("matched");
        card2.classList.add("matched");
        matchedCount++;
        document.getElementById("matches").textContent = matchedCount;
        flippedCards = [];

        if (matchedCount === symbols.length) {
            setTimeout(function () {
                alert("Congratulations! You won in " + moves + " moves! 🎉");
            }, 300);
        }
    } else {
        lockBoard = true;
        setTimeout(function () {
            card1.textContent = "?";
            card2.textContent = "?";
            card1.classList.remove("flipped");
            card2.classList.remove("flipped");
            flippedCards = [];
            lockBoard = false;
        }, 800);
    }
}
