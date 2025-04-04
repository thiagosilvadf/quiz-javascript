const $startGameButton = document.querySelector(".start-quiz")
const $nextQuestionButton = document.querySelector(".next-question")
const $questionsContainer = document.querySelector(".questions-container")
const $questionText = document.querySelector(".question")
const $answersContainer = document.querySelector(".answers-container")
const $answers = document.querySelectorAll(".answer")
const $videoescondido = document.querySelectorAll(".videoescondido")

let currentQuestionIndex = 0
let totalCorrect = 0

$startGameButton.addEventListener("click", startGame)
$nextQuestionButton.addEventListener("click", displayNextQuestion)

function startGame() {
  $startGameButton.classList.add("hide")
  $questionsContainer.classList.remove("hide")
  displayNextQuestion()
}

function displayNextQuestion() {
  resetState()

  document.body.removeAttribute("class")
  $nextQuestionButton.classList.add("hide")
  
  if (questions.length === currentQuestionIndex) {
    return finishGame()
  }

  $questionText.textContent = questions[currentQuestionIndex].question
  questions[currentQuestionIndex].answers.forEach(answer => {
    const newAsnwer = document.createElement("button")
    newAsnwer.classList.add("button", "answer")
    newAsnwer.textContent = answer.text
    if (answer.correct) {
      newAsnwer.dataset.correct = answer.correct
    }
    $answersContainer.appendChild(newAsnwer)

    newAsnwer.addEventListener("click", selectAnswer)
  })
}

function resetState() {
  while($answersContainer.firstChild) {
    $answersContainer.removeChild($answersContainer.firstChild)
  }

  document.body.removeAttribute("class")
  $nextQuestionButton.classList.add("hide")
}

function selectAnswer(event) {
  const answerClicked = event.target

  if (answerClicked.dataset.correct) {
    document.body.classList.add("correct")
    totalCorrect++
  } else {
    document.body.classList.add("incorrect") 
  }

  document.querySelectorAll(".answer").forEach(button => {
    button.disabled = true

    if (button.dataset.correct) {
      button.classList.add("correct")
    } else {
      button.classList.add("incorrect")
    }
    button.disabled = true
  })
  
  $nextQuestionButton.classList.remove("hide")
  currentQuestionIndex++
}

function finishGame() {
  const totalQuestions = questions.length
  const performance = Math.floor(totalCorrect * 100 / totalQuestions)
  
  let message = ""

  switch (true) {
    case (performance >= 90):
      message = "Excelente :)"
      break
    case (performance >= 70):
      message = "Muito bom :)"
      break
    case (performance >= 50):
      message = "Bom"
      break
    default:
      message = "Pode melhorar :("
  }

  $questionsContainer.innerHTML = 
  `
    <p class="final-message">
      Você acertou ${totalCorrect} de ${totalQuestions} questões!
      <span>Resultado: ${message}</span>
    </p>
    <button 
      onclick=window.location.reload() 
      class="button"
    >
      Refazer teste
    </button>
  `
}

function reproduzirAudio() {
  document.getElementsByTagName("audio")[0].play()
}

function pararAudio() {
  document.getElementsByTagName("audio")[0].pause()
}

document.getElementById("ultima-pagina").addEventListener("click",
  function () {
  document.getElementById("meu-video").style.display = "block";
});


const questions = [
  {
    question: "O que é radiação ionizante?",
    answers: [
      { text: "A - Um tipo de luz", correct: false },
      { text: "B - Um tipo de som", correct: false },
      { text: "C - Um tipo de radiação que pode causar danos", correct: true },
      { text: "D - Um tipo de energia", correct: false }
    ]
  },
  {
    question: "De onde vem a Radiação Ionizante?",
    answers: [
      { text: "A - Do sol", correct: false },
      { text: "B - Das estrelas", correct: false },
      { text: "C - De fontes naturais e artificiais", correct: true },
      { text: "D - De lugar nenhum", correct: false }
    ]
  },
  {
    question: 'O que pode acontecer se você for exposto à radiação ionizante?',
    answers: [
      { text: 'A - Você pode se sentir mais saudável', correct: false },
      { text: 'B - Você pode ter mais energia', correct: false },
      { text: 'C - Você pode ter mais chances de desenvolver doenças', correct: true },
      { text: "D - Você pode se sentir mais feliz", correct: false }
    ]
    
  },
  {
    question: 'Como você pode se proteger da radiação ionizante?',
    answers: [
      { text: 'A - Usando protetor solar', correct: false },
      { text: 'B - Usando óculos de sol', correct: false },
      { text: 'C - Evitando a exposição', correct: true },
      { text: 'D - Comendo alimentos ricos em vitamina C', correct: false }
    ]
  },
  {
    question: 'Por que é importante saber sobre a radiação ionizante?',
    answers: [
      { text: 'A - Para saber como se proteger', correct: true },
      { text: 'B - Para saber como usar máquinas de raios-X', correct: false },
      { text: 'C - Para saber como construir um reator nuclear', correct: false },
      { text: 'D - Para saber como fazer uma bomba nuclear', correct: false }
    ]
  },
]