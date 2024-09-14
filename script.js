const squares = document.querySelectorAll('.square');
const xTurnBtn = document.getElementById('xTurn');
const oTurnBtn = document.getElementById('oTurn');
const xWinsElem = document.getElementById('xWins');
const oWinsElem = document.getElementById('oWins');
const resetBtn = document.getElementById('reset');

let xIsNext = true;
let xWins = 0;
let oWins = 0;
let board = Array(9).fill(null);

xTurnBtn.classList.add('active');

squares.forEach((square, index) => {
    square.addEventListener('click', () => handleClick(index));
});

resetBtn.addEventListener('click', resetGame);

function handleClick(index) {
    if (board[index] || checkWinner()) return;

    board[index] = xIsNext ? 'X' : 'O';
    squares[index].textContent = board[index];
    squares[index].classList.add(board[index]);

    if (checkWinner()) {
        if (xIsNext) {
            xWins++;
            xWinsElem.textContent = `X Wins: ${xWins} times`;
        } else {
            oWins++;
            oWinsElem.textContent = `O Wins: ${oWins} times`;
        }
    }

    xIsNext = !xIsNext;
    updateTurnIndicator();
}

function updateTurnIndicator() {
    if (xIsNext) {
        xTurnBtn.classList.add('active');
        oTurnBtn.classList.remove('active');
    } else {
        oTurnBtn.classList.add('active');
        xTurnBtn.classList.remove('active');
    }
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }
    return false;
}

function resetGame() {
    board = Array(9).fill(null);
    squares.forEach(square => {
        square.textContent = '';
        square.classList.remove('X', 'O');
    });
    xIsNext = true;
    updateTurnIndicator();
}
