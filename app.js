function computerPlay(OPTIONS) {
    // Return Randomly 'Rock'/'Paper'/'Scissors'/

    // Pick a random number between 0-2
    const index = Math.floor(Math.random() * 3);
    // Assign option by index # picked randomly to a variable
    const computerOption = OPTIONS[index];
    // Return said variable
    return computerOption;
}

function playRound(playerSelection, computerSelection) {
    // Return a string that declares the winner of the roundSpan
    // "You Win/Lose! Paper beats Rock / Rock beats Scissors / Scissors beat Paper!"
    //
    let roundWinner = 'tie';

    // Go by playerSelection and compare to computer selection with switch
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

    let roundMessage = '';
    switch (roundWinner) {
        case 'player':
            roundMessage = `${capitalizeWord(playerSelection)} beats ${capitalizeWord(computerSelection)}!`;
            break;
        case 'computer':
            roundMessage = `${capitalizeWord(computerSelection)} beats ${capitalizeWord(playerSelection)}!`;
            break;
        case 'tie':
            roundMessage = "It's a Tie!";
    }
    return [roundWinner, roundMessage];
}

function capitalizeWord(word) {
    return word[0].toUpperCase() + word.slice(1).toLowerCase();
}

function updateGuiScore(playerScore, computerScore) {
    scoreboardPlayer.innerText = playerScore;
    scoreboardComputer.innerText = computerScore;
    if (playerScore > computerScore) {
        scoreboardPlayer.className = 'has-text-success';
        scoreboardComputer.className = 'has-text-danger';
    } else if (playerScore < computerScore) {
        scoreboardPlayer.className = 'has-text-danger';
        scoreboardComputer.className = 'has-text-success';
    } else {
        scoreboardPlayer.className = 'has-text-warning';
        scoreboardComputer.className = 'has-text-warning';
    }
}

function updateImages(playerSelection = null, computerSelection = null) {
    if (playerSelection || computerSelection) {
        images.forEach((image) => {
            switch (image.id) {
                case 'playerImg':
                    image.src = `/img/${playerSelection}.png`;
                    image.alt = `${playerSelection}`;
                    break;
                case 'computerImg':
                    image.src = `/img/${computerSelection}.png`;
                    image.alt = `${computerSelection}`;
                    break;
            }
        });
    } else {
        images.forEach((image) => {
            image.src = '';
            image.alt = '';
        });
    }
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
    message.style.visibility = 'hidden';
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
const images = document.querySelectorAll('.column>img');
const scoreboardPlayer = document.querySelector('#playerScore>span');
const scoreboardComputer = document.querySelector('#computerScore>span');
const message = document.querySelector('#message');
const buttons = document.querySelectorAll('.options');
const resetBtn = document.createElement('button');
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
        let [roundWinner, roundMessage] = playRound(playerSelection, computerSelection);

        updateImages(playerSelection, computerSelection);

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
        message.innerText = `${roundMessage}`;

        function gameWon() {
            let gameWinner = playerScore > computerScore ? 'You' : 'Computer';
            message.innerText = `${`Game Over! ${gameWinner} Won!`}`;
            endGame();
        }

        switch (true) {
            case roundNum < 5 && (playerScore == 3 || computerScore == 3):
            case roundNum >= 5 && playerScore != computerScore:
                gameWon();
        }
    });
});
