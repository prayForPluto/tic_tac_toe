//Create gameBoard factory
function gameBoard(playerOne, playerTwo) {
    
    //A 2D array will be used as the squares of a tic-tac-toe game
    let gameBoard = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];
    return { gameBoard };

}

function createPlayer(playerName) {
    const name = playerName;

    return { name };
}

function playTicTacToe(gameboard, playerOne, playerTwo) {
    let gameBoard = gameboard
    gameBoard(playerOne, playerTwo)
}