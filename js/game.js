'use strict'
const MINE = '💣';
// A Matrix containing cell objects: Each cell:
// { minesAroundCount: 4, isShown: true, isMine: false, isMarked: true }

var gBoard;
// This is an object by which the board size is set
//  (in this case: 4x4 board and how many mines to put)
var gLevel = {
    SIZE: 4,
    MINES: 2
}
//This is an object in which you can keep and update the current game state:
//isOn: Boolean, when true we let the user play
//shownCount: How many cells are shown
//markedCount: How many cells are marked (with a flag)
// secsPassed: How many seconds passed
var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}


function initGame() {
    gBoard = buildBoard(gLevel.SIZE)
    renderBoard(gBoard)
}

function buildBoard(size) {
    var board = [];
    for (var i = 0; i < size; i++) {
        board.push([]);
        for (var j = 0; j < size; j++) {
            board[i][j] = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false,
                bombElement: null
            }
        }
    }
    minesSpawn(board)
    minesNegsCount(board)
    return board
}

function renderBoard(board) {
    var strHTML = '';
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < board.length; j++) {
            var cells = board[i][j];
            strHTML += `<td class="cell" onclick="cellClicked(this, ${i}, ${j})">`
            if (cells.isMine === true) strHTML += MINE
            strHTML += '</td>'
        }
        strHTML += '</tr>';
    }
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML;
}


function countBombs(iIdx, jIdx, mat) {
    var minesAroundCount = 0;
    for (var i = iIdx - 1; i <= iIdx + 1; i++) {
        if (i < 0 || i >= mat.length) continue;
        for (var j = jIdx - 1; j <= jIdx + 1; j++) {
            if (i === iIdx && j === jIdx) continue;
            if (j < 0 || j >= mat[i].length) continue;
            if (mat[i][j].bombElement === MINE) minesAroundCount++;
        }
    }
    return minesAroundCount
}

function minesNegsCount(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board.length; j++) {
            var currCell = board[i][j];
            var num = countBombs(i, j, board);
            currCell.minesAroundCount = num
        }
    }
    return num
}

function cellClicked(elCell, i, j) {
    var cell = gBoard[i][j];
    if (!cell.isShown) {
        elCell.innerText = cell.minesAroundCount;
        cell.isShown = true;
    }
}

function minesSpawn(board) {
    var counter = gLevel.MINES;
    while (counter !== 0) {
        var idxI = getRandomInt(0, board.length)
        var idxJ = getRandomInt(0, board.length)
        var rdmCell = board[idxI][idxJ]
        if (!rdmCell.isMine) {
            rdmCell.bombElement = MINE;
            rdmCell.isMine = true;

            counter--;
        }
    }
}

function cellMarked(elCell) {

}

function checkGameOver() {

}

function expandShown(board, elCell, i, j) {

}
