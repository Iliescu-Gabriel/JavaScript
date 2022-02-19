import getElement from "./modules/getElement.js";

let turn = "X";
let gameOver = false;

// //Initialize the board on load
window.onload = function () {
  let boardElement = document.querySelector("#board");
  for (let y = 0; y < 3; y++) {
    //Columns
    for (let x = 0; x < 3; x++) {
      //Rows
      //Create button
      let button = document.createElement("button");
      button.id = "button" + y + x;
      button.setAttribute("type", "button");
      button.onclick = () => {
        markButton("#" + button.id);
      };
      //Style button
      button.style.width = "40px";
      button.style.height = "40px";
      button.style.fontSize = "30px";
      button.innerHTML = "_";
      //Append button
      boardElement.append(button);
    }
    //New line
    boardElement.append(document.createElement("div"));
  }
};

// //This function triggers when the user clicks a button
function markButton(buttonId) {
  if (gameOver) return;
  console.log("here");
  //If the button does not contain a value and check whose turn is it
  // then add the proper text to it
  let button = getElement(buttonId);
  if (button.innerHTML == "_") {
    if (turn == "X") {
      button.innerHTML = "X";
      turn = "0";
    } else {
      button.innerHTML = "0";
      turn = "X";
    }
  }
  checkGameStatus();
}

function checkGameStatus() {
  if (!checkUnmarkedBtns()) {
    gameOver = true;
    getElement("#winner").innerHTML = "Draw!";
  }
  if (checkConsMarked()) {
    gameOver = true;
    if (turn == "0") getElement("#winner").innerHTML = "The winer is: X";
    else getElement("#winner").innerHTML = "The winer is: 0";
  }
}

//Check to see if there are unmarked buttons on the board.
function checkUnmarkedBtns() {
  for (let y = 0; y < 3; y++) {
    //Columns
    for (let x = 0; x < 3; x++) {
      //Rows
      if (getElement("#button" + y + x).innerHTML == "_") return true;
    }
  }
  return false;
}

// //Check if 3 consecutive cells on all directions have the same value
function checkConsMarked() {
  for (let i = 0; i < 3; i++) {
    //Rows check
    if (
      getElement("#button" + i + "0").innerHTML != "_" &&
      getElement("#button" + i + "0").innerHTML ==
        getElement("#button" + i + "1").innerHTML &&
      getElement("#button" + i + "1").innerHTML ==
        getElement("#button" + i + "2").innerHTML
    )
      return true;
    //Columns check
    if (
      getElement("#button0" + i).innerHTML != "_" &&
      getElement("#button0" + i).innerHTML ==
        getElement("#button1" + i).innerHTML &&
      getElement("#button1" + i).innerHTML ==
        getElement("#button2" + i).innerHTML
    )
      return true;
  }
  //Main diagonal check
  if (
    getElement("#button00").innerHTML != "_" &&
    getElement("#button00").innerHTML == getElement("#button11").innerHTML &&
    getElement("#button11").innerHTML == getElement("#button22").innerHTML
  )
    return true;
  //Secondary diagonal check
  if (
    getElement("#button20").innerHTML != "_" &&
    getElement("#button20").innerHTML == getElement("#button11").innerHTML &&
    getElement("#button11").innerHTML == getElement("#button02").innerHTML
  )
    return true;
  return false;
}
