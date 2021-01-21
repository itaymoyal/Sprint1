'use strict'
const MINE = '💣';
const FLAG = '🚩';
// A Matrix containing cell objects: Each cell:
// { minesAroundCount: 4, isShown: true, isMine: false, isMarked: true }
var gLives; // Getting bugs,Can't fix it in 25 minutes so reversed back to without lives for now.
var gBoard;
// This is an object by which the board size is set
//  (in this case: 4x4 board and how many mines to put)
var gLevel = {
    SIZE: 4,
    MINES: 2
}
var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}
var timer;
var timeCounter = 0

function initGame() {
    gGame.isOn = true
    gGame.shownCount = 0
    gGame.markedCount = 0
    var elRestart = document.querySelector('.restart')
    elRestart.innerHTML = '🤖'
    gBoard = buildBoard(gLevel.SIZE)
    renderBoard(gBoard)
    clearInterval(timer)
    timeCounter = 0
    totalSeconds = 0
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
            strHTML += `<td class="cell"  onclick="cellClicked(this, ${i},
                 ${j})" oncontextmenu="cellMarked(this, ${i}, ${j});return false;">`
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
    if (!gGame.isOn) return;
    timeCounter++
    if (timeCounter === 1) {
        timer = setInterval(setTime, 1000)
    }
    var cell = gBoard[i][j];
    if (cell.isMarked) return;
    if (cell.isShown) return;
    if (cell.bombElement !== MINE && cell.bombElement !== cell.isShown) {
        gGame.shownCount++
        // console.log('gGame.shownCount-',gGame.shownCount)
        cell.isShown = true;
        elCell.innerText = cell.minesAroundCount;
        checkGameOver(i,j)
    } if (cell.bombElement === MINE) {
        elCell.innerText = cell.bombElement;
        gGame.isOn = false
        checkGameOver(i,j)
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

function cellMarked(elCell, i, j) {
    if (!gGame.isOn) return;
    var currCell = gBoard[i][j]
    // if(currCell.minesAroundCount) return;
    if (currCell.isShown) return
    elCell.addEventListener('contextmenu', function (ev) {
        ev.preventDefault();
    }, false)
    if (!currCell.isMarked) {
        currCell.isMarked = true
        elCell.innerText = FLAG
    } else {
        currCell.isMarked = false
        elCell.innerText = ''
    } if (currCell.isMine && currCell.isMarked) {
        gGame.markedCount++
        // console.log(gGame.markedCount);
    } else if (currCell.isMine && !currCell.isMarked) {
        gGame.markedCount--
        // console.log(gGame.markedCount);
    }
}

function checkGameOver(i,j) {
    var elRestart = document.querySelector('.restart')
    var cells = gBoard[i][j]
    var cells = (gLevel.SIZE ** 2 - gLevel.MINES)
    if (gGame.shownCount === cells && gGame.markedCount === gLevel.MINES) {
        elRestart.innerHTML = '🥳'
        gGame.isOn = false
        clearInterval(timer)
    }else if (!gGame.isOn) {
        elRestart.innerHTML = '😞'
        gGame.isOn = false
        clearInterval(timer)
    }
}

function levelUp1(){
    gLevel = {
        SIZE: 4,
        MINES: 2
    }
    initGame()
    return gLevel
}

function levelUp2(){
    gLevel = {
        SIZE: 8,
        MINES: 12,
    }
    initGame()
    return gLevel
}

function levelUp3(){
    gLevel = {
        SIZE: 12,
        MINES: 30,
    }
    initGame()
    return gLevel
}



// function levelUp() {
//     var elLevel2 = document.querySelector('.button2')
//     switch (gLevel) {   
//         case level1:
//             gLevel.SIZE = 4
//             gLevel.MINES = 2
//             break;
//         case level2:
//             gLevel.SIZE = 8
//             gLevel.MINES = 12
//             break;
//         case level3:
//             gLevel.SIZE = 12
//             gLevel.MINES = 30
//             break;
//     }
//     elLevel2.innerHTML = level2
// }






function expandShown(board, elCell, i, j) {

}


    // function revealMines (){
    //     for (var i = 0; i < gBoard.length; i++){
    //         var elCell = document.querySelector(`cell-${i}+${j}`)
    //         for (var j = 0; j <gBoard[0].length; j++){
    //             var cell = gBoard[i][j]
    //             if (cell.isMine){
    //                 cell.isShown = true
    //                 elCell.innerText = cell.bomb
    //             }
    //         }
    //     }
    // }