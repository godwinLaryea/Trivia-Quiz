const container = document.querySelector(".container");

const quizWrapper = document.querySelector(".quiz-wrapper");

let questionElement = document.querySelector(".question");

let trueButton = document.querySelector(".true");
trueButton.value = "True";

let falseButton = document.querySelector(".false");
falseButton.value = "False";

const nextButton = document.querySelector(".next-btn");

const displayElement = document.querySelector(".display");

const scoreUpdate = document.getElementById("score-update")

let currentQuestionIndex = 0;

let questions = [];

let score = {
  wins: 0,
  losses: 0
}

function decodeEntities(text) {
  const textArea = document.createElement("textarea");
  textArea.innerHTML = text;
  return textArea.value;
}

const fetchQuiz = async() => {
  try {
    const response = await fetch("https://opentdb.com/api.php?amount=30&category=9&difficulty=easy&type=boolean");
    const quiz = await response.json();
    
    questions = quiz.results.map((question)=>{
      return {
        ...question,
        question: decodeEntities(question.question),
        correct_answer: question.correct_answer,
        incorrect_answers: question.incorrect_answers,
      }
    })
  
    displayQuestion();
    
  } catch (error) {
    console.error("Error fetching quiz:", error);
    questionElement.textContent = "Error loading quiz. Please try again.";
  }

  function displayQuestion(){

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
  
  const checkAnswer = selectedAnswer => {
    const correctAnswer = questions[currentQuestionIndex].correct_answer;
  
    if (selectedAnswer === correctAnswer) {
      displayElement.textContent = "Correct✅ You are awesome! 👏🏽"; 
    } else {
      displayElement.textContent = "Wrong❌ You will get the next one. Keep going 💪🏽";
    }
    nextButton.style.display = "flex";
    
    if(selectedAnswer === correctAnswer){
      score.wins += 1;
      scoreUpdate.innerHTML = `<p>Wins: ${score.wins}</p>
      <p>Losses: ${score.losses}</p>
      `
    }else if(selectedAnswer !== correctAnswer){
      score.losses +=1
      scoreUpdate.innerHTML = `<p>Wins: ${score.wins}</p>
      <p>Losses: ${score.losses}</p>`
    };
  }
  
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
};
fetchQuiz();