"use strict";
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
  message.textContent = "🤔 Start guessing ...";

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
      message.textContent = "Please enter a valid letter";
    } else {
      //if the letter is correct

      if (guess === randomLetter || guess.toLowerCase() === randomLetter) {
        message.textContent = "Correct! 🏆 Wait and Guess ";
        currentHighScore++;
        highScore.textContent = currentHighScore;

        renderTypographies(randomLetter);

        setTimeout(function () {
          cleanData();
        }, 3500);

        //if the letter is incorrect
      } else {
        message.textContent = "Incorrect!";
        currentScore--;
        score.textContent = currentScore;

      }
    }
  } else {
    message.textContent = "You lost the game! 💥 Try again! ";
    body.style.backgroundColor = "rgba(122, 122, 122, 1)";

  }
});
