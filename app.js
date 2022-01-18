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
            roundMessage = `You Win! ${playerSelection} beats ${computerSelection}`;
            break;
        case 'computer':
            roundMessage = `You Lose! ${computerSelection} beats ${playerSelection}`;
            break;
        case 'tie':
            roundMessage = "It's a Tie!";
    }
    return [roundWinner, roundMessage];
}

function capitalizeWord(word) {
    return word[0].toUpperCase() + word.slice(1).toLowerCase();
}

function game() {
    const OPTIONS = ['rock', 'paper', 'scissors'];
    // set comupter score and player score
    let playerScore = 0;
    let computerScore = 0;
    let roundNumber = 0;
    // Loop 5 times or until one side scores 3:
    // while (roundNumber < 5 && playerScore < 3 && computerScore < 3) {
    //  computerPlay
    let computerSelection = capitalizeWord(computerPlay(OPTIONS));
    //  playRound
    const buttons = document.querySelectorAll('button');
    buttons.forEach((child) => {
        child.addEventListener('click', (e) => {
            let playerSelection = capitalizeWord(e.target.id);
            console.log(playerSelection);
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
            console.log(`Round Number ${roundNumber + 1}\n${roundMessage}`);
            let roundScore = `Score: ${playerScore} - ${computerScore}`;
            console.log(roundScore);
            roundNumber++;
        });
    });
    // break;
    // }
    let gameWinner = playerScore > computerScore ? 'You' : 'Computer';
    // disply game result to console
    console.log(`Game Over! ${gameWinner} Won!`);
    return;
}

game();
