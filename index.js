const container = document.querySelector(".container");

const quizWrapper = document.querySelector(".quiz-wrapper");

let questionElement = document.querySelector(".question");

let trueButton = document.querySelector(".true");
trueButton.value = "True"

let falseButton = document.querySelector(".false");
falseButton.value = "False"

const nextButton = document.querySelector(".next-btn");



const displayElement = document.querySelector(".display");

const fetchQuiz = async() => {
  
  const response = await fetch("https://opentdb.com/api.php?amount=20&category=9&difficulty=easy&type=boolean");
  
  const quiz = await response.json();

  
  let newQuestions = [];
  
  
  for(let quizzes of quiz.results){
        newQuestions.push(quizzes);
    }
  
  
  let rightAnswer = "";

  const questionsMain = () =>{

    newQuestions.forEach(element =>{
        const questions =`${element.question}`
  
        rightAnswer = `${element.correct_answer}`;
        
        questionElement.textContent = questions
      });
      
      nextButton.style.display = "none"

  }    
  questionsMain()

    
  const correctAnswer = (button) =>{
    if(rightAnswer === button){
      alert("You are right");
    }else{
      alert("Wrong Attempt!")
    }
    
  }
  
  
  trueButton.addEventListener('click', ()=>{
    correctAnswer(trueButton.value)
    displayElement.textContent = "You are awesome!";
    nextButton.style.display = "flex"
  })
  
  falseButton.addEventListener('click', ()=>{
    correctAnswer(falseButton.value)
    displayElement.textContent = "You will get the next one. Keep going"
    nextButton.style.display = "flex"
  })


  nextButton.addEventListener("click", ()=>{
    questionsMain();
  })

}
fetchQuiz();


