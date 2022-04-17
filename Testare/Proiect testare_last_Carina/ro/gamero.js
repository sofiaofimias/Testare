const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'Ce este ilegal să mănânci cu furculița în statul Georgia?',
        choice1: "supă",
        choice2: "sandwich",
        choice3: "cartofi pai",
        choice4: "desert",
        answer: 3,  
    },
	
    {
        question: 'Ce culoare are părul natural al faimoasei Marilyn Monroe?',
        choice1: "blond",
        choice2: "brunet",
        choice3: "roșcat",
		choice4: "negru",
        answer: 3,  
    },
	
    {
        question: 'Din ce limbă provine cuvântul „Ketchup”?',
        choice1: "engleză",
        choice2: "chineză",
        choice3: "latină",
		choice4: "română",
        answer: 2,  
    },
	
    {
        question: 'Care este speranța de viață la nivel mondial?',
        choice1: "70 de ani",
        choice2: "65 de ani",
        choice3: "90 de ani",
		choice4: "100 de ani",
        answer: 1,  
    },
	
    {
        question: 'Unde se află cea mai mare piramidă din lume? ',
        choice1: "Egipt",
        choice2: "Mexic",
        choice3: "România",
		choice4: "America",
        answer: 2,  
    },
	
    {
        question: 'În ce țară scandinavă întâlnești cuvântul "fjords"?',
        choice1: 'Finlanda',
        choice2: 'Norvegia',
        choice3: 'Suedia',
        choice4: 'Danemarca',
        answer: 2,
    },

    {
        question: 'Ce oraș important al lumii este localizat pe două continente?',
        choice1: 'Istanbul',
        choice2: 'Viena',
        choice3: 'St. Petersburg',
        choice4: 'Havana',
        answer: 1,
    },

    {
        question: 'În ce oraș se află "Sagrada Familia"?',
        choice1: 'Barcelona',
        choice2: 'Madrid',
        choice3: 'Roma',
        choice4: 'Sevilla',
        answer: 1,
    },

    {
        question:'Care este numele orașului care a fost distrus de erupția vulcanului Vezuviu?',
        choice1: 'Naples',
        choice2: 'Amalfi',
        choice3: 'Torre del Greco',
        choice4: 'Pompei',
        answer: 4,
    },

    {
        question:'Unde se revarsă fluviul Volga?',
        choice1: 'Marea Neagră',
        choice2: 'Marea Caspică',
        choice3: 'Marea Mediterană',
        choice4: 'Marea Roșie',
        answer: 2,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 3

startGame = () => {
    questionCounter = 1
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score)
        return window.location.assign('endro.html')
    }
    
    progressText.innerText = `Întrebarea ${questionCounter} din ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
	questionCounter++

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e =>{
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct':'incorrect'

        if(classToApply === 'correct'){
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    })
})
incrementScore = num => {
    score+=num
    scoreText.innerText = score

}
startGame()
