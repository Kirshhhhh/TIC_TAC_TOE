document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const resetButton = document.getElementById('resetButton');
    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];

    
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.addEventListener('click', () => handleCellClick(i));
        board.appendChild(cell);
    }

    
    function handleCellClick(index) {
        if (gameBoard[index] === '' && !isGameOver()) {
            gameBoard[index] = currentPlayer;
            renderBoard();
            switchPlayer();
        }
    }

    
    function switchPlayer() {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    
    function renderBoard() {
        const cells = document.querySelectorAll('.cell');
        cells.forEach((cell, index) => {
            cell.textContent = gameBoard[index];
        });
        checkWinner();
    }

    
    function checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], 
            [0, 3, 6], [1, 4, 7], [2, 5, 8], 
            [0, 4, 8], [2, 4, 6]             
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                announceWinner(gameBoard[a]);
                return;
            }
        }

        if (!gameBoard.includes('')) {
            announceTie();
        }
    }

    
    function announceWinner(winner) {
        alert(`${winner} is the winner!`);
        resetGame();
    }


    function announceTie() {
        alert("It's a tie!");
        resetGame();
    }

    
    function isGameOver() {
        return gameBoard.every(cell => cell !== '');
    }


    function resetGame() {
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = 'X';
        renderBoard();
    }

    
    resetButton.addEventListener('click', resetGame);

    
    renderBoard();
});
