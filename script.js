

function createPlayer(playerName, playerToken) {
    const name = playerName;
    const token = playerToken;

    const getToken = () => token;
    return { name, token, getToken };
}

function playTicTacToe() {
    //Create gameBoard factory
    const gameBoard = (function () {
        
      /* A turn variable keeps track of how many turns have passed
      so that we can start checking the win condition after 5 
      turns have passed */
      let turn = 0;

      //A 2D array will be used as the squares of a tic-tac-toe game
      const board = [
          ["", "", ""],
          ["", "", ""],
          ["", "", ""]
      ];
      const placePiece = (locationX, locationY) => board[locationX][locationY] = getActivePlayer().token; 

      const addTurn = () => {turn += 1}
      const getTurn = () => turn;
      const getBoard = () => board;

      return { board, placePiece, addTurn, getTurn, getBoard };

    })();
    const players = [createPlayer("playerOne", "X"), createPlayer("playerTwo", "O")];

    let activePlayer = players[0];

    let winner = "";

    const setWinner = (theWinner) => {
      winner = theWinner;
    }
    const getWinner = () => winner;

    const switchPlayerTurn = () => {
      activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };
    const getActivePlayer = () => activePlayer;

    const playRound = (x, y) => {
      gameBoard.addTurn();
      let locX = x
      let locY = y

      gameBoard.placePiece(x, y);
      switchPlayerTurn();

      console.log(gameBoard);
      console.log(`The turn is: ${gameBoard.getTurn()}`)
      if (gameBoard.getTurn() > 5) {
        checkWin();
      }
      
    }

    const checkWin = () => {
      let startTokenHorizontal = "";
      let startTokenVertical = "";
      let boardChecked = gameBoard.getBoard();
      if (
        (boardChecked[0][0] == boardChecked[1][1] && 
         boardChecked[0][0] == boardChecked[2][2]) || 
        (boardChecked[0][2] == boardChecked[1][1] && 
         boardChecked[0][2] == boardChecked[2][0])
      ) {
        return console.log("Game over! We have a winner")
      }
      for (let i = 0; i < 3; i++) {
        let trueHorizontal = false;
        let trueVertical = false;
        for (let j = 0; j < 3; j++) {
          //check if first in row has 3 consecutive tokens the same
          if (j == 0) {
            startTokenHorizontal = boardChecked[i][j];
            startTokenVertical = boardChecked[j][i];
            trueHorizontal = true;
            trueVertical = true;
            continue;
          }
          if (startTokenHorizontal == boardChecked[i][j] && startTokenHorizontal != "") {
            console.log(`${startTokenHorizontal} is equal to ${boardChecked[i][j]}`)
            
          } else {
            //console.log(`${startTokenHorizontal} is NOT equal to ${boardChecked[i][j]}`)
            trueHorizontal = false;
            
          } 
          console.log(j)

          if (startTokenVertical == boardChecked[j][i] && startTokenVertical != "") {
            console.log(`${startTokenVertical} is equal to ${boardChecked[j][i]}`)
          } else {
            trueVertical = false;
          }
          
        }
        if (trueHorizontal == true) {
          setWinner(startTokenHorizontal);
          console.log(`We have a winner! ${getWinner()}`)
          break;
        } else if (trueVertical == true) {
          setWinner(startTokenVertical);
          console.log(`We have a winner! ${getWinner()}`);
          break;
        }
      }
      
    }

    const displayController = (function () {
      let body = document.querySelector("body");
      let grid = document.createElement("div");
    
      let aBoard = gameBoard.getBoard();
    
      grid.setAttribute("class", "grid-container")
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          let gridElement = document.createElement("div");
          gridElement.setAttribute("id", `${i}${j}`);
          gridElement.textContent = "";
          gridElement.addEventListener("click", () => {
            let id = gridElement.id;
            let x = Number(id[0]);
            let y = Number(id[1]);
            playRound(x, y);
            if (getWinner()) {
              let winner = document.createElement("p");
              winner.textContent = `Winner winner! ${getWinner()}  gets a chicken dinner!`;
              body.append(winner)
            }
            gridElement.textContent = aBoard[x][y];
          })
      
          grid.appendChild(gridElement);
        }
      }

      let playButton = document.createElement("button");
      playButton.textContent = "Play game!"
      playButton.addEventListener("click", () => {
        window.location.reload();
      })


      body.appendChild(grid);
      body.appendChild(playButton);

    })();

  //return { getWinner, setWinner };
}
const playGame = playTicTacToe(); 





/*
** The Gameboard represents the state of the board
** Each equare holds a Cell (defined later)
** and we expose a dropToken method to be able to add Cells to squares


function Gameboard() {
    const rows = 6;
    const columns = 7;
    const board = [];
  
    // Create a 2d array that will represent the state of the game board
    // For this 2d array, row 0 will represent the top row and
    // column 0 will represent the left-most column.
    // This nested-loop technique is a simple and common way to create a 2d array.
    for (let i = 0; i < rows; i++) {
      board[i] = [];
      for (let j = 0; j < columns; j++) {
        board[i].push(Cell());
      }
    }
  
    // This will be the method of getting the entire board that our
    // UI will eventually need to render it.
    const getBoard = () => board;
  
    // In order to drop a token, we need to find what the lowest point of the
    // selected column is, *then* change that cell's value to the player number
    const dropToken = (column, player) => {
      // Our board's outermost array represents the row,
      // so we need to loop through the rows, starting at row 0,
      // find all the rows that don't have a token, then take the
      // last one, which will represent the bottom-most empty cell
      const availableCells = board.filter((row) => row[column].getValue() === 0).map(row => row[column]);
  
      // If no cells make it through the filter, 
      // the move is invalid. Stop execution.
      if (!availableCells.length) return;
  
      // Otherwise, I have a valid cell, the last one in the filtered array
      const lowestRow = availableCells.length - 1;
      board[lowestRow][column].addToken(player);
    };
  
    // This method will be used to print our board to the console.
    // It is helpful to see what the board looks like after each turn as we play,
    // but we won't need it after we build our UI
    const printBoard = () => {
      const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
      console.log(boardWithCellValues);
    };
  
    // Here, we provide an interface for the rest of our
    // application to interact with the board
    return { getBoard, dropToken, printBoard };
  }
  
  
  ** A Cell represents one "square" on the board and can have one of
  ** 0: no token is in the square,
  ** 1: Player One's token,
  ** 2: Player 2's token
  
  
  function Cell() {
    let value = 0;
  
    // Accept a player's token to change the value of the cell
    const addToken = (player) => {
      value = player;
    };
  
    // How we will retrieve the current value of this cell through closure
    const getValue = () => value;
  
    return {
      addToken,
      getValue
    };
  }
  
   
  ** The GameController will be responsible for controlling the 
  ** flow and state of the game's turns, as well as whether
  ** anybody has won the game
  
  function GameController(
    playerOneName = "Player One",
    playerTwoName = "Player Two"
  ) {
    const board = Gameboard();
  
    const players = [
      {
        name: playerOneName,
        token: 1
      },
      {
        name: playerTwoName,
        token: 2
      }
    ];
  
    let activePlayer = players[0];
  
    const switchPlayerTurn = () => {
      activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };
    const getActivePlayer = () => activePlayer;
  
    const printNewRound = () => {
      board.printBoard();
      console.log(`${getActivePlayer().name}'s turn.`);
    };
  
    const playRound = (column) => {
      // Drop a token for the current player
      console.log(
        `Dropping ${getActivePlayer().name}'s token into column ${column}...`
      );
      board.dropToken(column, getActivePlayer().token);
  
      //  This is where we would check for a winner and handle that logic,
      //    such as a win message. 
  
      // Switch player turn
      switchPlayerTurn();
      printNewRound();
    };
  
    // Initial play game message
    printNewRound();
  
    // For the console version, we will only use playRound, but we will need
    // getActivePlayer for the UI version, so I'm revealing it now
    return {
      playRound,
      getActivePlayer
    };
  }
  
  const game = GameController(); */