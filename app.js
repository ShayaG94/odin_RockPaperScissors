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
    // Make playerSelection case-insensitive.
    const playerChoise = capitalizeWord(playerSelection.toLowerCase());
    const computerChoise = capitalizeWord(computerSelection);
    let roundWinner = 'tie';

    // Go by playerSelection and compare to computer selection with switch
    switch (playerChoise) {
        case 'Rock':
            switch (computerChoise) {
                case 'Paper':
                    roundWinner = 'computer';
                    break;
                case 'Scissors':
                    roundWinner = 'player';
                    break;
            }
            break;
        case 'Paper':
            switch (computerChoise) {
                case 'Rock':
                    roundWinner = 'player';
                    break;
                case 'Scissors':
                    roundWinner = 'computer';
                    break;
            }
            break;
        case 'Scissors':
            switch (computerChoise) {
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
            roundMessage = `You Win! ${playerChoise} beats ${computerChoise}`;
            break;
        case 'computer':
            roundMessage = `You Lose! ${computerChoise} beats ${playerChoise}`;
            break;
        case 'tie':
            roundMessage = "It's a Tie!";
    }
    return roundWinner, roundMessage;
}

function capitalizeWord(word) {
    return word[0].toUpperCase() + word.slice(1);
}

function game() {
    const OPTIONS = ['rock', 'paper', 'scissors'];
    // set comupter score and player score
    let playerScore = 0;
    let computerScore = 0;
    // Loop 5 times:
    while (playerScore < 3 && computerScore < 3) {
        // prompt user to select option
        //  computerPlay
        let computerOption = computerPlay(OPTIONS);
        let userOption = prompt('Rock, Paper or Scissors?').toLowerCase();

        //  playRound
        //  display round result to console
        //  update score
    }
    //
    // disply game result to console
    return;
}

game();
