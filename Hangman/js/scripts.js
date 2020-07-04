// Get DOM Elements
const wordEl = document.getElementById("word");
const wrongLettersEl = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");

// Get Figure Parts
const figureParts = document.querySelectorAll(".figure-part");

const words = [
  "application",
  "booknerd",
  "book",
  "programming",
  "wizard",
  "hogwarts",
  "gamer",
  "australia",
  "india",
  "computer",
  "clock",
  "infinity",
  "harry potter",
  "bullying",
  "rubix cube",
  "starry skies",
  "coding is love",
  "reading is awesome",
];

let selectedWord = words[Math.floor(Math.random() * words.length)];

// console.log(selectedWord);
const correctLetters = [];
const wrongLetters = [];

// Show the hidden word
function displayWord() {
  wordEl.innerHTML = ` 
  ${selectedWord
    .split("")
    .map((letter) => {
      if (letter === " ") {
        return '<span class="space"></span>';
      } else {
        return `
              <span class="letter">
                ${correctLetters.includes(letter) ? letter : ""}
              </span>
            `;
      }
    })
    .join("")}`;

  const innerWord = wordEl.innerText.replace(/\n/g, "");
  if (innerWord === selectedWord.replace(/\s/g, "")) {
    finalMessage.innerText = "Congratulations! You Won! 🤩";
    popup.style.display = "flex";
  }
}

// Update the wrong letters
function updateWrongLettersEl() {
  // Display Wrong Letters
  wrongLettersEl.innerHTML = `
  ${wrongLetters.length > 0 ? "<p>Wrong</p>" : ""}
  ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
  `;

  // Display Parts
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;

    if (index < errors) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });

  // Check if lost
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = "Unfortunately you lost. 😢";
    popup.style.display = "flex";
  }
}

// Show  Notification
function showNotification() {
  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}

// Keydown letter press
window.addEventListener("keydown", (e) => {
  const keyCode = e.keyCode;

  if (keyCode >= 65 && keyCode <= 90) {
    const letter = e.key;

    if (selectedWord.includes(letter)) {
      // Check if the array does not already contain the letter
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);

        displayWord();
      } else {
        showNotification();
      }
    } else {
      // Push onto wrong letters
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);

        updateWrongLettersEl();
      } else {
        showNotification();
      }
    }
  }
});

// Restart game and play again
playAgainBtn.addEventListener("click", (e) => {
  // Empty arrays
  correctLetters.splice(0);
  wrongLetters.splice(0);

  selectedWord = words[Math.floor(Math.random() * words.length)];

  displayWord();

  updateWrongLettersEl();

  popup.style.display = "none";
});

displayWord();
