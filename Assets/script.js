var containerQuestionEl = document.getElementById("question-container");
var containerStartEl = document.getElementById("starter-container");
var containerEndEl = document.getElementById("end-container");
var containerScoreEl = document.getElementById("score-banner");
var formInials = document.getElementById("initials-form");
var containerHighScoresEl = document.getElementById("high-score-container");
var viewHighScoreEl = document.getElementById("view-high-scores");
var listHighScoreEl = document.getElementById("high-score-list");
var correctEl = document.getElementById("correct");
var wrongEl = document.getElementById("wrong");


// Buttons

var btnStartEl = document.querySelector("#start-game");
var btnGoBackEl = document.querySelector("#go-back");
var btnClearScoresEl = document.querySelector("#clear-high-scores");

// Questions/ Answers element

var questionEl = document.getElementById("question");
var answerbuttonsEl = document.getElementById("answer-buttons");
var timerEl = document.querySelector("#timer");
var score = 0;
var timeLeft;
var gameOver
timerEl.innerText = 0;
// High Score array

var highScores = [];

// Assign array details for questions

var arrayShuffleQuestions
var questionIndex = 0;


// The array of questions for our quiz game.
var questions = [
    { question: "What is capital of Guinea is?",
      answer: "2.",
      choices: [{choice: '1. Dakar'}, {choice: '2. Conakry'}, {choice: '3. Kankan'}, {choice: '4. Labe'}]

    },
    { question: "In which continent Guinea Located?",
      answer: '4. Africa',
      choices: [{choice: '1. Noth America'}, {choice: '2. Europe'}, {choice: '3. Asia'}, {choice: '4. Africa'}]

    },
    { question: "What is the national language of Guinea is?",
      answer: "1.",
      choices: [{choice: '1. French'}, {choice: '2. English'}, {choice: '3. Arabic'}, {choice: '4. Spanish'}]
    },
    { question: "When did Guinea get it independent?",
      answer: "2.",
      choices: [{choice: '1. 1960'}, {choice: '2. 1958'}, {choice: '3. 2000'}, {choice: '4. 1967'}]
    },
    { question: "How many dialect are spoken in Guinea?",
      answer: "3.",
      choices: [{choice: '1. 10'}, {choice: '2. 17'}, {choice: '3. 6'}, {choice: '4. 45'}]
    },
    { question: "What is the color of the Guinea flag?",
      answer: "2.",
      choices: [{choice: '1. green'}, {choice: '2. red, yellow, green'}, {choice: '3. red'}, {choice: '4. white'}]
    },
    { question: "What is the population of Guinea?",
      answer: "3.",
      choices: [{choice: '1. 6,000,000'}, {choice: '2. 100,000'}, {choice: '3. 12,000,000'}, {choice: '4. 5,000,000'}]
    },

];

// If go back button is hit on high score page

var renderStartPage = function () {
  containerHighScoresEl.classList.add("hide")
  containerHighScoresEl.classList.remove("show")
  containerStartEl.classList.remove("hide")
  containerStartEl.classList.add("show")
  containerScoreEl.removeChild(containerHighScoresEl.lastChild)
  questionIndex = 0
  gameOver = ""
  timerEl.textContent = 0
  score = 0

  if (correctEl.className = "show") {
    correctEl.classList.remove("show");
    correctEl.classList.add("hide")
  }
  if (wrongEl.classList = "show") {
    wrongEl.classList.remove("show");
    wrongEl.classList.add("hide");
  }
};

// Every second, check if game-over is true or if there is time left. Start time at 40.

var setTime = function () {
  timeLeft = 10;

var timerCheck = setInterval(function() {
    timerEl.innerText = timeLeft;
    timeLeft--
  console.log("TIMER: ", timeLeft);
  if (timeLeft <= 0) {
    document.querySelector("#timer").innerHTML = 0;
    clearInterval(timerCheck)
  }

    }, 1000)
};

var startGame = function() {
  // Add classes to show/hide start and quiz screen
  containerStartEl.classList.add("hide");
  containerStartEl.classList.remove("show");
  containerQuestionEl.classList.remove("hide");
  containerQuestionEl.classList.add("show");
  // Shuffle the questions so they show in ramdom order
  arrayShuffleQuestions = questions.sort(() => Math.random() -0.5)
  setTime()
  setQuestion()

}

//Set next question for quiz
var setQuestion = function() {
  resetAnswers()
  displayQuestion(arrayShuffleQuestions[questionIndex])
}

// remove answer buttons
var resetAnswers = function() {
    while (answerbuttonsEl.firstChild) {
      answerbuttonsEl.removeChild(answerbuttonsEl.firstChild)
    };
};

// Display questions information (including answer buttons)
var displayQuestion = function(index) {
    questionEl.innerText = index.question
    for (var i = 0; i < index.choices.length; i++) {
      var answerbutton = document.createElement("button")
      answerbutton.innerText = index.choices[i].choice
      answerbutton.classList.add("btn")
      answerbutton.classList.add("answerbtn")
      answerbutton.addEventListener("click", answerCheck)
      answerbuttonsEl.appendChild(answerbutton)
    }
};

// Display Correct!! on screen
var answerCorrect = function() {
  if (correctEl.className = "hide") {
    correctEl.classList.remove("hide")
    correctEl.classList.add("banner")
    wrongEl.classList.remove("banner")
    wrongEl.classList.add("hide")
  }
};

// display wrong onscreen

var answerWrong = function() {
  if (wrongEl.className = "hide") {
    wrongEl.classList.remove("hide")
    wrongEl.classList.add("banner")
    correctEl.classList.remove("banner")
    correctEl.classList.add("hide")
  }
};

// Check if answer is correct
var answerCheck = function(event) {
  var selectedAnswer = event.target;
  if (arrayShuffleQuestions[questionIndex].answer === selectedAnswer.innerText){
    answerCorrect()
    score = score + 5
  }
  else {
    answerWrong()
    score = score - 1;
  };

  // Go to next question, check if there is more questions
  questionIndex++
    if (arrayShuffleQuestions.length > questionIndex + 1) {
      setQuestion()
    }
    else {
      gameOver = "true";
      showScore();
    }
}

// Display total score screen at end of game
var showScore = function () {
  containerQuestionEl.classList.add("hide");
  containerEndEl.classList.remove("hide");
  containerEndEl.classList.add("show");

  var scoreDisplay = document.createElement("p");
  scoreDisplay.innerText = ("Your final score is " + score + "!");
  containerScoreEl.appendChild(scoreDisplay);
}


// Create high score values
var createHighScore = function(event) {
  event.preventDefault();
  var initials = document.querySelector("#initials").value;
  if (!initials) {
    alert("Enter your initials!");
    return;
  }

  // forminitials.reset();

  var highScore = {
    initials: initials,
    score: score
  }

  // Push and sort scores
  highScores.push(highScore);
  highScores.sort((a, b) => {return b.score-a.score});

  // Clear visible list to resort
  while (listHighScoreEl.firstChild) {
    listHighScoreEl.removeChild(listHighScoreEl.firstChild)
  }

  // Create elements in order of high scores
  for (var i = 0; i < highScores.length; i++) {
    var highScoreEl = document.createElement("li");
    highScoreEl.className = "high-score";
    highScoreEl.innerHTML = highScores[i].initials + " - " + highScores[i].score;
    listHighScoreEl.appendChild(highScoreEl);
  }

  saveHighScore();
  displayHighCores();
}
// Save high score
var saveHighScore = function () {
  localStorage.setItem("highScores", JSON.stringify(highScores))
}

// Load values/ called on page load
var loadHighScore = function () {
  var loadedHighScores = localStorage.getItem("highScores")
  if (!loadedHighScores) {
    return false;
  }

  loadedHighScores = JSON.parse(loadedHighScores);
  loadedHighScores.sort((a, b) => {return b.score-a.score})

  for (var i = 0; i < loadedHighScores.length; i++) {
    var highScoreEl = document.createElement("li");
    highScoreEl.className = "high-score";
    highScoreEl.innerText = loadedHighScores[i].initials + " - " + loadedHighScores[i].score;
    listHighScoreEl.appendChild(highScoreEl);

    highScores.push(loadedHighScores[i]);
  }
}

// Display high score screen from link or when initials entered
var displayHighCores = function() {
  containerHighScoresEl.classList.remove("hide");
  containerHighScoresEl.classList.add("show");
  gameOver = "true"

  if (containerEndEl.className = "show") {
      containerEndEl.classList.remove("show");
      containerEndEl.classList.add("hide");
  }
  if (containerStartEl.className = "show") {
      containerStartEl.classList.remove("show");
      containerStartEl.classList.add("hide");
  }

  if (containerQuestionEl.className = "show") {
      containerQuestionEl.classList.remove("show");
      containerQuestionEl.classList.add("hide");
  }

  if (correctEl.className = "show") {
      correctEl.classList.remove("show");
      correctEl.classList.add("hide");
  }

  if (wrongEl.className = "show") {
    wrongEl.classList.remove("show");
    wrongEl.classList.add("hide");
  }


}

// Clrears hih scores
var clearScores = function () {
  highScores = [];
  while (listHighScoreEl.firstChild) {
    listHighScoreEl.removeChild(listHighScoreEl.firstChild);
  }

  localStorage.clear(highScores);
}

loadHighScore()

// On start click, start game
btnStartEl.addEventListener("click", startGame)

// On submit button -- enter or click
formInials.addEventListener("submit", createHighScore)

// When view high-score is clicked
viewHighScoreEl.addEventListener("click", displayHighCores)

// Go back button
btnGoBackEl.addEventListener("click", renderStartPage)

// Clear scores button
btnClearScoresEl.addEventListener("click", clearScores)


  
    











