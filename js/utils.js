'use strict'
  // location such as: {i: 2, j: 7}
  // function renderCell(location, value) {
    // Select the elCell and set the value
  //   var elCell = document.querySelector(`.cell${location.i}-${location.j}`);
  //   elCell.innerHTML = value;
  // }

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

//   function randomColor() {
//     var randomColor = Math.floor(Math.random() * 16777215).toString(16);
//     return '#' + randomColor
// }
