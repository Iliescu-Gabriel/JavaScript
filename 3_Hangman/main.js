import getElement from "./modules/getElement.js";
//Global variables :(
let lettersUsed = new Set();
let gameOver = false;

const wordFormElement = getElement("#word-form");
const messageElement = getElement("#message");
const userInputElement = getElement("#userInput");
const livesElement = getElement("#lives");
const wordElement = getElement("#word");
const currentWordElement = getElement("#currentWord");

//Prevent the word form from refreshing the page when pressing enter
userInputElement.addEventListener("click", startGame);

wordFormElement.addEventListener("submit", function (event) {
  event.preventDefault();
  startGame();
});

function startGame() {
  //Reset the message text
  messageElement.innerHTML = "";
  let currentWord = "";
  let wordToGuess = wordElement.value;
  //Word has to have more than 2 letters
  if (wordToGuess.length < 3 || !onlyLetters(wordToGuess)) {
    messageElement.innerHTML =
      "Please enter a word with more than 3 characters";
    return;
  }
  //Check if the user input is not null and contains only letters. Otherwise exit the function.
  if (wordToGuess.length <= 0 && !onlyLetters(wordToGuess)) {
    messageElement.text("Please enter a word!");
    return 0;
  }
  //Update the current word to contain an underline for every character of the word that needs to be guessed
  for (let i = 0; i < wordToGuess.length; i++) {
    currentWord = currentWord + "_";
  }
  //Update the interface and enter the game loop
  userInputElement.innerHTML = "Check";
  userInputElement.removeEventListener("click", startGame);

  userInputElement.addEventListener("click", () => {
    gameLoop(wordToGuess);
  });
  livesElement.innerHTML = "Lives = 3";
  currentWordElement.innerHTML = currentWord;
  wordFormElement.addEventListener("submit", (event) => {
    event.preventDefault();
    gameLoop(wordToGuess);
  });
}

function gameLoop(wordToGuess) {
  if (gameOver) {
    return;
  }
  //Reset message text;
  messageElement.innerHTML = "";
  //Get the input from the user
  let char = wordElement.value;
  //Check if the input is a character if its not then exit the function
  if (char.length > 1 || !onlyLetters(char)) {
    messageElement.innerHTML = "Please enter 1 character.";
    return;
  }
  //If the letter was already used then update the message and exit the function
  if (lettersUsed.has(char.toLowerCase())) {
    messageElement.innerHTML = "Letter already used!";
    return;
  }
  lettersUsed.add(char);
  updateGameStatus(checkChar(char, wordToGuess), wordToGuess);
}

function updateGameStatus(charIsGuessed, wordToGuess) {
  let currentWord = currentWordElement.innerHTML;
  let lives = Number(livesElement.innerHTML.slice(-1));
  if (!charIsGuessed) lives = lives - 1;
  livesElement.innerHTML = "Lives = " + lives;
  if (lives <= 0) {
    messageElement.innerHTML = "YOU LOST!";
    gameOver = true;
  }
  if (currentWord == wordToGuess) {
    messageElement.innerHTML = "YOU WON!";
    gameOver = true;
  }
}

function checkChar(char, wordToGuess) {
  //Check if the word to guess contains the given character. If yes then add the character to the current word.
  let currentWord = currentWordElement.innerHTML;
  let charGuessed = false;
  for (let i = 0; i < wordToGuess.length; i++) {
    if (wordToGuess.charAt(i).toLowerCase() == char.toLowerCase()) {
      currentWord =
        currentWord.substring(0, i) +
        wordToGuess.charAt(i) +
        currentWord.substring(i + 1);
      charGuessed = true;
    }
  }
  //Update the current word;
  currentWordElement.innerHTML = currentWord;
  return charGuessed;
}

function onlyLetters(string) {
  for (let i = 0; i < string.length; i++) {
    if (
      !(
        (string.charAt(i) >= "a" && string.charAt(i) <= "z") ||
        (string.charAt(i) >= "A" && string.charAt(i) <= "Z")
      )
    )
      return false;
  }
  return true;
}
