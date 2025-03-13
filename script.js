"use strict";
import translations from './translations.js';

//Selecting the elements
const body = document.querySelector("body");
const btnReset = document.querySelector(".btn-reset");
const btnCheck = document.querySelector(".btn-check");
const inputGuess = document.querySelector(".guess"); //Imput from the user
let letter = document.querySelector(".example-letter"); //Letter to guess
const capLetter = document.querySelector(".cap-letter"); //Letter to guess in CAP or Low cursive
const lowLetter = document.querySelector(".low-letter"); //Letter in low cursive
const message = document.querySelector(".message");
const score = document.querySelector(".score");
const highScore = document.querySelector(".highscore");
const flags = document.querySelectorAll('.language-container .flag');
const types = document.querySelector(".other-types");
const title = document.querySelector(".game-title");
const caso = document.querySelector(".case");
const liveScore= document.querySelector(".label-score");
const scoreMessage = document.querySelector(".label-highscore");



document.addEventListener("DOMContentLoaded", () => {
  message.textContent = translations[currentLang].startMessage;
  btnReset.textContent = translations[currentLang].resetMessage;
  btnCheck.textContent = translations[currentLang].checkMessage;
  types.textContent = translations[currentLang].typesMessage;
  title.textContent = translations[currentLang].titleMessage; 
  caso.textContent = translations[currentLang].caseMessage;
// <p> solo
liveScore.childNodes[0].textContent = translations[currentLang].lives;
scoreMessage.childNodes[0].textContent = translations[currentLang].score;

});

// Loop through each flag and add an event listener
flags.forEach(flag => {
  flag.addEventListener('click', () => {
   const selectedLang = flag.dataset.lang; // Get the language from the data-lang attribute
   changeLanguage(selectedLang); // Change the language of the game
    cleanData(); // Reset the game
    console.log("flag clicked");
  });
});

//Initial language setting
let currentLang = 'en'; // Default language is English
// If the browser language is not supported, fall back to English
if (!translations[currentLang]) {
  currentLang = 'en';
}

const changeLanguage = (lang) => {
  currentLang = translations[lang] ? lang : 'en'; // Cambia el idioma o usa inglés por defecto

  // Actualiza todos los mensajes del juego al nuevo idioma
  message.textContent = translations[currentLang].startMessage;
  btnReset.textContent = translations[currentLang].resetMessage;
  btnCheck.textContent = translations[currentLang].checkMessage;
  types.textContent = translations[currentLang].typesMessage;
  title.textContent = translations[currentLang].titleMessage; 
  caso.textContent = translations[currentLang].caseMessage;
  liveScore.childNodes[0].textContent = translations[currentLang].lives;
  scoreMessage.childNodes[0].textContent = translations[currentLang].score;
  cleanData();
  highScore.textContent = 0;
  score.textContent = 10;
  body.style.backgroundColor = "rgba(255, 214, 90, 0.8)";
  currentScore = 10;
  currentHighScore = 0;

};


//Generating a random letter
function getRandomLetter() {
  const charCode =
    Math.random() < 0.5
      ? 65 + Math.floor(Math.random() * 26) // Uppercase A-Z (65 to 90)
      : 97 + Math.floor(Math.random() * 26); // Lowercase a-z (97 to 122)
  return String.fromCharCode(charCode); //Return the ascii as a letter
}

//Display the random letter
function displayRandomLetter(rl) {
  letter.textContent = rl;
  // If the letter is uppercase, change the font style for an appropriate uppercase font representation
  rl === rl.toUpperCase() 
    ? (letter.style.fontFamily = "CapsCursive") 
    : (letter.style.fontFamily = "RegularCursive"); 

}

//Display other typographies of the letter
//Set UpperCase Cursive
const renderTypographies = (letter) => {
  //Render lower manuscript letter
  lowLetter.textContent = letter.toLowerCase();

  //Render caps letter
  if (letter === letter.toUpperCase()) {
    capLetter.textContent = letter.toLowerCase();
  } else {
    capLetter.textContent = letter.toUpperCase();
    capLetter.style.fontFamily="CapsCursive";
  }
};

// Clean values
const cleanData = () => {
  randomLetter = getRandomLetter(); // Generate new letter first
  displayRandomLetter(randomLetter); // Then display it
  inputGuess.value = "";
  capLetter.textContent = "❓";
  lowLetter.textContent = "❓";
  message.textContent = translations[currentLang].startMessage;

};

//Reset the game
btnReset.addEventListener("click", function () {
  cleanData();
  highScore.textContent = 0;
  score.textContent = 10;
  body.style.backgroundColor = "rgba(255, 214, 90, 0.8)";
  currentScore = 10;
  currentHighScore = 0;
});

// Get the random letter and display it

let randomLetter = getRandomLetter();
console.log("Initial randomLetter:", randomLetter);
let currentScore = 10;
let currentHighScore = 0;

displayRandomLetter(randomLetter);

//Check the letter
//if there is no letter or invalid letter

btnCheck.addEventListener("click", function () {
  const guess = inputGuess.value.toUpperCase();

  //if no valid input

  if (currentScore > 0) {
    if (!guess || !/^[A-Z]$/.test(guess)) {
      message.textContent = translations[currentLang].enterValidLetter;
    } else {
      //if the letter is correct

      if (guess === randomLetter || guess.toLowerCase() === randomLetter) {
        message.textContent = translations[currentLang].correctMessage;
        currentHighScore++;
        highScore.textContent = currentHighScore;

        renderTypographies(randomLetter);

        setTimeout(function () {
          cleanData();
        }, 2000);

        //if the letter is incorrect
      } else {
        message.textContent =  translations[currentLang].incorrectMessage;
        currentScore--;
        score.textContent = currentScore;

      }
    }
  } else {
    message.textContent = translations[currentLang].gameOverMessage;
    body.style.backgroundColor = "rgba(122, 122, 122, 1)";

  }
});