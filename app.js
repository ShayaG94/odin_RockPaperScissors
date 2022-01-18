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
    // Return a string that declares the winner of the round
    // "You Win/Lose! Paper beats Rock / Rock beats Scissors / Scissors beat Paper!"
    //
    let roundWinner = 'tie';

    // Go by playerSelection and compare to computer selection with switch
    switch (playerSelection) {
        case 'Rock':
            switch (computerSelection) {
                case 'Paper':
                    roundWinner = 'computer';
                    break;
                case 'Scissors':
                    roundWinner = 'player';
                    break;
            }
            break;
        case 'Paper':
            switch (computerSelection) {
                case 'Rock':
                    roundWinner = 'player';
                    break;
                case 'Scissors':
                    roundWinner = 'computer';
                    break;
            }
            break;
        case 'Scissors':
            switch (computerSelection) {
                case 'Rock':
                    roundWinner = 'computer';
                    break;
                case 'Paper':
                    roundWinner = 'player';
                    break;
            }
            break;
    }

    let roundMessage = '';
    switch (roundWinner) {
        case 'player':
            roundMessage = `${playerSelection} beats ${computerSelection}!`;
            break;
        case 'computer':
            roundMessage = `${computerSelection} beats ${playerSelection}!`;
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

const OPTIONS = ['rock', 'paper', 'scissors'];
const round = document.querySelector('#round>span');
const scoreboardPlayer = document.querySelector('#playerScore>span');
const scoreboardComputer = document.querySelector('#computerScore>span');
const message = document.querySelector('#message');
const buttons = document.querySelectorAll('.options');

let playerScore = 0;
let computerScore = 0;

round.style.visibility = 'hidden';
message.style.visibility = 'hidden';

buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
        round.innerText++;
        round.style.visibility = 'visible';
        let playerSelection = capitalizeWord(e.target.id);
        let computerSelection = capitalizeWord(computerPlay(OPTIONS));
        let [roundWinner, roundMessage] = playRound(playerSelection, computerSelection);
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

        if (playerScore < 3 && computerScore < 3 && round.innerText < 5) {
            message.innerText = `${roundMessage}`;
            message.style.visibility = 'visible';
        } else {
            buttons.forEach((button) => button.setAttribute('disabled', 'true'));
            let gameWinner = playerScore > computerScore ? 'You' : 'Computer';
            message.innerText = `${`Game Over! ${gameWinner} Won!`}`;
        }
    });
});
