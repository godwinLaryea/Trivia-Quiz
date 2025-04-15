const container = document.querySelector(".container");

const quizWrapper = document.querySelector(".quiz-wrapper");

let questionElement = document.querySelector(".question");

let trueButton = document.querySelector(".true");
trueButton.value = "True";

let falseButton = document.querySelector(".false");
falseButton.value = "False";

const nextButton = document.querySelector(".next-btn");

const displayElement = document.querySelector(".display");


let currentQuestionIndex = 0;

let questions = [];

const fetchQuiz = async() => {
  try {
    const response = await fetch("https://opentdb.com/api.php?amount=30&category=9&difficulty=easy&type=boolean");
    const quiz = await response.json();
    
    questions = quiz.results;
    
    displayQuestion();
    
  } catch (error) {
    console.error("Error fetching quiz:", error);
    questionElement.textContent = "Error loading quiz. Please try again.";
  }
};


const displayQuestion = () => {

  if (questions.length > 0 && currentQuestionIndex < questions.length) {

    const currentQuestion = questions[currentQuestionIndex];
    
    questionElement.textContent = currentQuestion.question;
    
    nextButton.style.display = "none";
    
    displayElement.textContent = "";
  } else {
    questionElement.textContent = "Quiz complete! Refresh to start over.";
    trueButton.style.display = "none";
    falseButton.style.display = "none";
    nextButton.style.display = "none";
  }
};

const checkAnswer = (selectedAnswer) => {
  const correctAnswer = questions[currentQuestionIndex].correct_answer;
  
  if (selectedAnswer === correctAnswer) {
    displayElement.textContent = "Correct✅ You are awesome! 👏🏽";
  } else {
    displayElement.textContent = "Wrong❌ You will get the next one. Keep going 💪🏽";
  }
  
  nextButton.style.display = "flex";
};

trueButton.addEventListener('click', () => {
  checkAnswer(trueButton.value);
});

falseButton.addEventListener('click', () => {
  checkAnswer(falseButton.value);
});

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  displayQuestion();
});
fetchQuiz();