import getElement from "./modules/getElement.js";

const form = getElement("#word-form");
const addButton = getElement("#add-button");
let dictionaryList = new Set();

addButton.addEventListener("click", (event) => {
  addToDictionary();
});

//Prevent the word form from refreshing the page when pressing enter
form.addEventListener("submit", (event) => {
  event.preventDefault();
  addToDictionary();
});

//Add word to dictionary
function addToDictionary() {
  let messageEl = getElement("#message");
  messageEl.innerHTML = "";
  let word = getElement("#word").value;
  if (word.length <= 0 && !isWord(word)) {
    messageEl.text("Please enter a word made out of letters.");
    return;
  }
  word = word.toLowerCase();
  if (!dictionaryList.has(word)) {
    messageEl.innerHTML = "Word has been added to dictionary!";
  } else messageEl.innerHTML = "Word already exists in dictionary!";
  dictionaryList.add(word);
}
//Check if the word provided is made out of letters
function isWord(str) {
  for (let i = 0; i < str.length; i++) {
    if (str[i] < "A" || (str[i] > "Z" && str[i] < "a") || str[i] > "z") {
      return false;
    }
  }
  return true;
}
