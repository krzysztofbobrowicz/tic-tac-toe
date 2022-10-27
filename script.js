const createPlayer = (playerName, playerMarker) => {
  return { playerName, playerMarker };
};

// gameboard object
const gameBoard = (() => {
  // generate board array
  let gameBoardDiv = document.querySelector('#game-board');

  let board = [];
  for (let i = 0; i < 9; i++) {
    board.push('');
  }

  // create game board
  function createGameBoard() {
    board.forEach(() => {
      const square = document.createElement('div');
      square.className = 'cell';
      gameBoardDiv.appendChild(square);
    });
  }
  createGameBoard();

  // Place markers on board
  Array.from(gameBoardDiv.children).forEach((square, index) => {
    square.addEventListener('click', () => {
      if (!game.winnerDeclared) {
        square.classList.add(game.activePlayer.playerMarker);
        square.setAttribute('data', game.activePlayer.playerMarker);
        board[index] = game.activePlayer.playerMarker;
        square.style.pointerEvents = 'none';
        game.remainingSpots -= 1;
        square.innerText = game.activePlayer.playerMarker;
        game.checkWinner();

        game.changePlayer();
      }
    });
  });
  return { board, createGameBoard };
})();

// game object
const game = (() => {
  const playerOne = createPlayer('Player 1', 'X');
  const playerTwo = createPlayer('Player 2', 'O');

  let activePlayer = playerOne;
  let winnerDeclared = false;
  let remainingSpots = 9;

  function changePlayer() {
    this.activePlayer === playerOne
      ? (this.activePlayer = playerTwo)
      : (this.activePlayer = playerOne);
  }

  // check winner
  function checkWinner() {
    const winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    winningConditions.forEach(item => {
      if (
        gameBoard.board[item[0]] == this.activePlayer.playerMarker &&
        gameBoard.board[item[1]] == this.activePlayer.playerMarker &&
        gameBoard.board[item[2]] == this.activePlayer.playerMarker
      ) {
        this.winnerDeclared = !winnerDeclared;
        document.querySelector(
          '#winningMessageText'
        ).innerText = `The winner is ${this.activePlayer.playerName}`;
      }
    });

    // Declare a draw
    if (this.remainingSpots <= 0) {
      document.querySelector('#winningMessageText').innerText = `Draw.`;
    }
  }

  return {
    activePlayer,
    winnerDeclared,
    remainingSpots,
    changePlayer,
    checkWinner,
  };
})();
