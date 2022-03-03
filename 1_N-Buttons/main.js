import getElement from "./modules/getElement.js";

getElement("#startGame").addEventListener("click", (event) => {
  event.preventDefault();
  startGame();
});

getElement("#button-form").addEventListener("submit", (event) => {
  event.preventDefault();
  startGame();
});

function startGame() {
  let n = getElement("#nrOfButtons").value;
  let validInput = false;
  //Check if the user input is valid. If its not exit the function.
  if (n > 0 && isNumber(n)) {
    validInput = true;
    getElement("#button-form").style.visibility = "hidden";
  } else {
    return 0;
  }
  //Choose a random winning button
  let winningButton = Math.round(Math.random() * (n - 1));
  console.log("Correct number = " + winningButton);
  //Create and append the buttons
  for (let i = 0; i < n; i++) {
    let button = document.createElement("BUTTON");
    button.id = i;
    button.classList.add("game-button");
    button.setAttribute("type", "button");
    button.addEventListener("click", () => {
      evalChosenButton(button.id, winningButton);
    });
    button.innerHTML = "Button " + i;
    getElement("#buttons").insertAdjacentElement("beforeend", button);
  }
}

function isNumber(str) {
  for (let i = 0; i < str.length; i++) {
    if (str[i] < "0" || str[i] > "9") {
      return false;
    }
  }
  return true;
}

function evalChosenButton(button, winningButton) {
  let message = getElement("#endMessage");
  if (button == winningButton) {
    message.innerHTML = "You Won!";
  } else {
    message.innerHTML = "You Lost";
  }
}
