function computerPlay(OPTIONS) {
    // Return Randomly 'Rock'/'Paper'/'Scissors'/

    // Pick a random number between 0-2
    const index = Math.floor(Math.random() * 3);
    // Assign option by index # picked randomly to a variable
    const computerOption = OPTIONS[index];
    // Return said variable
    // return 'rock';
    return computerOption;
}

function playRound(playerSelection, computerSelection) {
    // Return a string that declares the winner of the round

    let roundWinner = 'tie';

    // Go by playerSelection and compare to computerSelection
    switch (playerSelection) {
        case 'rock':
            switch (computerSelection) {
                case 'paper':
                    roundWinner = 'computer';
                    break;
                case 'scissors':
                    roundWinner = 'player';
                    break;
            }
            break;
        case 'paper':
            switch (computerSelection) {
                case 'rock':
                    roundWinner = 'player';
                    break;
                case 'scissors':
                    roundWinner = 'computer';
                    break;
            }
            break;
        case 'scissors':
            switch (computerSelection) {
                case 'rock':
                    roundWinner = 'computer';
                    break;
                case 'paper':
                    roundWinner = 'player';
                    break;
            }
            break;
    }

    return roundWinner;
}

function capitalizeWord(word) {
    return word[0].toUpperCase() + word.slice(1).toLowerCase();
}

function updateGuiScore(playerScore, computerScore) {
    scoreboardPlayer.innerText = playerScore;
    scoreboardComputer.innerText = computerScore;
}

function updateRoundMessage(playerSelection, computerSelection, roundWinner) {
    let selections = [playerSelection, computerSelection];
    if (selections.includes('rock') && selections.includes('paper')) {
        message.innerText = 'Paper covers Rock!';
    } else if (selections.includes('paper') && selections.includes('scissors')) {
        message.innerText = 'Scissors cut Paper!';
    } else if (selections.includes('scissors') && selections.includes('rock')) {
        message.innerText = 'Rock crushes Scissors!';
    } else {
        message.innerText = 'Tie!';
    }

    switch (roundWinner) {
        case 'player':
            message.className = 'section title is-5 has-text-centered has-text-success py-1';
            break;
        case 'computer':
            message.className = 'section title is-5 has-text-centered has-text-danger py-1';
            break;
        default:
            message.className = 'section title is-5 has-text-centered has-text-warning py-1';
    }
}

function updateImages(playerSelection = null, computerSelection = null) {
    icons.forEach((icon) => {
        if (playerSelection || computerSelection) {
            switch (icon.id) {
                case 'playerIcon':
                    icon.className = `far fa-flip-horizontal fa-hand-${playerSelection}`;
                    break;
                case 'computerIcon':
                    icon.className = `far fa-hand-${computerSelection}`;
                    break;
            }
        } else {
            icon.className = 'far';
        }
    });
}

function setResetBtn() {
    resetBtn.classList.add('button', 'is-success');
    resetBtn.innerText = 'Restart Game!';
    resetBtn.style.display = 'none';
    document.querySelector('footer').appendChild(resetBtn);
    resetBtn.addEventListener('click', resetGame);
}

function endGame() {
    buttons.forEach((button) => (button.style.display = 'none'));
    resetBtn.style.display = 'flex';
}

function resetDisplay() {
    message.innerText = 'Choose an option:';
    message.className = 'section title is-5 has-text-centered has-text-link py-1';
    roundSpan.style.visibility = 'hidden';
}

function resetGame() {
    updateImages();
    resetDisplay();
    roundSpan.innerText = '0';
    roundSpan.style.color = '';
    roundNum = 0;
    playerScore = 0;
    computerScore = 0;
    updateGuiScore(playerScore, computerScore);
    resetBtn.style.display = 'none';
    buttons.forEach((button) => (button.style.display = 'flex'));
}

function styleByRound() {
    roundSpan.style.visibility = 'visible';
    message.style.visibility = 'visible';
    if (roundNum > 5) {
        roundSpan.style.color = 'gold';
        roundSpan.innerText += ' - Tie Breaker!';
    }
}

const OPTIONS = ['rock', 'paper', 'scissors'];
const roundSpan = document.querySelector('#round>span');
const icons = document.querySelectorAll('.icon>i');
const scoreboardPlayer = document.querySelector('#playerScore>span');
const scoreboardComputer = document.querySelector('#computerScore>span');
const message = document.querySelector('#message');
const buttons = document.querySelectorAll('.options');
const resetBtn = document.createElement('button');
const textColor = new RegExp(/has-text-[a-z]+/);
setResetBtn();
resetDisplay();

let playerScore = 0;
let computerScore = 0;
let roundNum = 0;

buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
        roundNum++;
        roundSpan.innerText = roundNum;
        styleByRound();
        let playerSelection = e.target.id;
        let computerSelection = computerPlay(OPTIONS);
        let roundWinner = playRound(playerSelection, computerSelection);

        updateImages(playerSelection, computerSelection);
        updateRoundMessage(playerSelection, computerSelection, roundWinner);

        icons.forEach((icon) => {
            if (roundWinner === 'tie') {
                icon.classList.replace('fas', 'far');
                icon.parentNode.className = 'icon is-medium has-text-warning';
            } else if (icon.id === `${roundWinner}Icon`) {
                icon.classList.replace('far', 'fas');
                icon.parentNode.className = 'icon is-medium has-text-success';
            } else {
                icon.classList.replace('fas', 'far');
                icon.parentNode.className = 'icon is-medium has-text-danger';
            }
        });

        //  update score
        switch (roundWinner) {
            case 'player':
                playerScore++;
                break;
            case 'computer':
                computerScore++;
                break;
        }

        updateGuiScore(playerScore, computerScore);

        switch (true) {
            case roundNum < 5 && (playerScore == 3 || computerScore == 3):
            case roundNum >= 5 && playerScore != computerScore:
                let gameWinner;
                if (playerScore > computerScore) {
                    gameWinner = 'You';
                    message.className = 'section title is-5 has-text-centered has-text-success py-1';
                } else {
                    gameWinner = 'Computer';
                    message.className = 'section title is-5 has-text-centered has-text-danger py-1';
                }
                message.innerText = `${`${gameWinner} Won!`}`;
                endGame();
        }
    });
});
