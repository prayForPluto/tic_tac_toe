//Create gameBoard factory
const gameBoard = (function () {
    
    //A 2D array will be used as the squares of a tic-tac-toe game
    const board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];
    const placePiece = (player, locationX, locationY) => board[locationX][locationY] = player.getToken(); 

    return { board, placePiece };

})();

function createPlayer(playerName, playerToken) {
    const name = playerName;
    const token = playerToken;

    const getToken = () => token;
    return { name, token, getToken };
}

function playTicTacToe() {
    const players = [createPlayer("playerOne", "X"), createPlayer("playerTwo", "O")];
    
    const checkWin = (function() {
        for (let i = 0; i <= 4; i++) {
            console.log("here")
        }
    })();

    gameBoard.placePiece(players[0], 0, 0)   


    console.log(gameBoard); 
}

const playGame = playTicTacToe();