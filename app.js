'use strict';

const playerFactory = (marker) => {
    const getMarker = () => { return marker };
    return { getMarker };
};

const gameBoard = (() => {
    let boardArray = [];

    const initializeBoard = () => {
        for (let i = 0; i < 9; i++) {
            boardArray.push('');
        }
        return boardArray;
    };

    const getBoard = () => {
        return boardArray;
    };

    const setBoard = (player, index) => {
        if (boardArray[index] == '') {
            boardArray[index] = player.getMarker();
        }
        return boardArray;
    };

    return { initializeBoard, getBoard, setBoard };
})();

const gameFlow = (() => {
    const drawGame = (gameBoard) => {
        let i = 0;
        let result;
        while (i < 9 && gameBoard[i] != '') {
            i++;
        }
        if (i == 9) {
            result = true;
        }
        else {
            result = false;
        }
        return result;
    };

    const winGameRow = (player, gameBoard) => {
        let result = false;
        if ((gameBoard[0] == player.getMarker() && gameBoard[1] == player.getMarker() && gameBoard[2] == player.getMarker())
            || (gameBoard[3] == player.getMarker() && gameBoard[4] == player.getMarker() && gameBoard[5] == player.getMarker())
            || (gameBoard[6] == player.getMarker() && gameBoard[7] == player.getMarker() && gameBoard[8] == player.getMarker())) {
            result = true;
        }
        return result;
    };

    const winGameColumn = (player, gameBoard) => {
        let result = false;
        if ((gameBoard[0] == player.getMarker() && gameBoard[3] == player.getMarker() && gameBoard[6] == player.getMarker())
            || (gameBoard[1] == player.getMarker() && gameBoard[4] == player.getMarker() && gameBoard[7] == player.getMarker())
            || (gameBoard[2] == player.getMarker() && gameBoard[5] == player.getMarker() && gameBoard[8] == player.getMarker())) {
            result = true;
        }
        return result;
    };

    const winGameDiagonal = (player, gameBoard) => {
        let result = false;
        if ((gameBoard[0] == player.getMarker() && gameBoard[4] == player.getMarker() && gameBoard[8] == player.getMarker())
            || (gameBoard[2] == player.getMarker() && gameBoard[4] == player.getMarker() && gameBoard[6] == player.getMarker())) {
            result = true;
        }
        return result;
    };

    const winGame = (player, gameBoard) => {
        return winGameRow(player, gameBoard) || winGameColumn(player, gameBoard) || winGameDiagonal(player, gameBoard);
    };

    return { drawGame, winGame };
})();

const display = (() => {
    let container = document.querySelector('.container');
    let grid = document.querySelector('.grid');
    let newGame = document.querySelector('#new-game');
    let winner = document.querySelector('.winner');

    const createGrid = () => {
        grid = document.createElement('div');
        grid.className = 'grid';
        for (let i = 0; i < 9; i++) {
            let div = document.createElement('div');
            div.dataset.index = i;
            grid.appendChild(div);
        }
        container.appendChild(grid);
    };

    const getGrid = () => {
        return grid;
    };

    const setGrid = (array) => {
        if (grid.hasChildNodes()) {
            let children = grid.childNodes;

            for (let i = 0; i < children.length; i++) {
                children[i].innerHTML = array[i];
            }
        }

    };

    const getNewGame = () => {
        return newGame;
    };

    const getWinner = () => {
        return winner;
    };

    const setWinner = (winnerGame) => {
        winner.innerHTML = winnerGame;
    };

    return { getGrid, createGrid, setGrid, getNewGame, getWinner, setWinner };
})();

const displayController = (() => {
    let counterPlayer = 0;

    const setCounterPlayer = () => {
        counterPlayer = (counterPlayer + 1) % 2;
    };

    const fillGrid = () => {
        display.createGrid();
        gameBoard.initializeBoard();
    };

    const playerTurn = (players) => {
        display.getGrid().addEventListener('click', event => {
            console.log('Enter player turn');
            if (!event.target.innerHTML) {
                let index = event.target.dataset.index;
                gameBoard.setBoard(players[counterPlayer], index);
                display.setGrid(gameBoard.getBoard());
                if (gameFlow.winGame(players[counterPlayer], gameBoard.getBoard())) {
                    console.log(`Player ${counterPlayer} won!!`);
                }
                setCounterPlayer();

            }
        });
    };


    const playNewGame = (players) => {
        let i = 0;
        while (i < 2) {
            playerTurn(players);
        }
    };
    return { fillGrid, playerTurn };
})();

let player1 = playerFactory('O');
let player2 = playerFactory('X');
let players = [player1, player2];

displayController.fillGrid();
displayController.playerTurn(players);


//displayController.playNewGame(players);