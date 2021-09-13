let playerSeq = [];
let compSeq = [];
let level = 0;

const startButton = document.querySelector(".message-button");
const info = document.querySelector(".main-info");
const heading = document.querySelector(".main-heading");
const tileContainer = document.querySelector(".main-container");

function resetGame(text) {
    alert(text);
    compSeq = [];
    playerSeq = [];
    level = 0;
    startButton.classList.remove('hidden');
    heading.textContent = 'Simon Game';
    info.classList.add('hidden');
    tileContainer.classList.add('unclickable');
}

function humanTurn() {
    tileContainer.classList.remove("unclickable");
    info.textContent= `${level} click${level > 1 ? 's' : ''} remaining`;
}

function activateTile(color) {
    const tile = document.querySelector(`[data-color="${color}"]`);
    const sound = document.querySelector(`[data-sound="${color}"]`);

    tile.classList.add('activated');
    sound.play();
    console.log("hello");
    setTimeout(() => {
        tile.classList.remove('activated');
    }, 300);
}

function playRound(nextcompSeq) {
    nextcompSeq.forEach((color, index) => {
        setTimeout(() => {
            activateTile(color);
        }, (index + 1) * 600);
    });
}

function nextStep() {
    const tiles = ['red', 'green', 'blue', 'yellow'];
    const random = tiles[Math.floor(Math.random() * tiles.length)];

    return random;
}

function newRound() {
    level += 1;

    tileContainer.classList.add('unclickable');
    info.textContent = 'Listen carefully!';
    heading.textContent = `Level ${level} of 20`;

    const nextSequence = [...compSeq];
    nextSequence.push(nextStep());
    playRound(nextSequence);

    compSeq = [...nextSequence];

    setTimeout(() => {
        humanTurn();
    }, level * 600 + 1000);
}


function startGame() {
    startButton.classList.add("hidden");
    info.classList.remove("hidden");
    info.textContent="Listen Carefully!";
    newRound();
}



function clickTile(color) {
    playerSeq.push(color);
    const index = playerSeq.length - 1;
    let clickRemain = compSeq.length - playerSeq.length;

    const sound = document.querySelector(`[data-sound='${color}']`);
    sound.play();

    if (playerSeq[index] !== compSeq[index]) {
        resetGame('(╯‵□′)╯︵┴─┴ Game over, you pressed the wrong tile');
        return;
    }

    if (playerSeq.length === compSeq.length) {
        if (playerSeq.length === 2) {
            resetGame(' ~( ˘▾˘~) Congrats! You completed all the levels');
            return
        }

        playerSeq = [];
        info.textContent = 'Hurray! Next Level!';
        setTimeout(() => {
            newRound();
        }, 1000);
        return;
    }
    info.textContent = `${clickRemain} click${clickRemain > 1 ? 's' : ''} remaining`;
}

startButton.addEventListener("click", startGame);
tileContainer.addEventListener("click", event => {
    const { color } = event.target.dataset;
    if (color) clickTile(color);
})