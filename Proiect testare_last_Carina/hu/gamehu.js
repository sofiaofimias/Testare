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
        question: 'Illegális enni Georgiaban:',
        choice1: "levest",
        choice2: "sandwichet",
        choice3: "szalmakrumpli",
        choice4: "desszertet",
        answer: 3,  
    },

	{
        question: 'Milyen szinű Marilyn Monroe haja?',
        choice1: "szöke",
        choice2: "barna",
        choice3: "vörös",
		choice4: "fekete",
        answer: 3,  
    },

	{
        question: 'Milyen nyelböl származik a „Ketchup” sző?',
        choice1: "angol",
        choice2: "kinai",
        choice3: "latin",
		choice4: "román",
        answer: 2,  
    },

	{
        question: 'Mennyi a várható életkor villágszerte?',
        choice1: "70 év",
        choice2: "65 év",
        choice3: "90 év",
		choice4: "100 év",
        answer: 1,  
    },

	{
        question: 'Hol található a világ legmagasabb piramisa? ',
        choice1: "Egiptom",
        choice2: "Mexic",
        choice3: "Románia",
		choice4: "America",
        answer: 2,  
    },

	{
		question: 'Melyik skandináv országban találsz "fjordokat”?',
		choice1: 'Finnországban',
		choice2: 'Norvégiaban',
		choice3: 'Svédországban',
      	choice4: 'Dániaban',
      	answer: 2,
	},

	{
		question: 'Melyik az egyetlen nagyobb város két kontinensen?',
		choice1: 'Isztambul',
        choice2: 'Bécs',
        choice3: 'Szentpétervár',
        choice4: 'Havanna',
        answer: 1,
	},

	{
        question: 'Melyik városban találod a Sagrada Családot?',
        choice1: 'Barcelonaban',
        choice2: 'Madridban',
        choice3: 'Rómaban',
        choice4: 'Sevillaban',
        answer: 1,
    },
	
	{
        question:'Mi volt a neve a Vezúv vulkán kitörése által elpusztított városnak?',
        choice1: 'Nápoly',
        choice2: 'Amalfi',
        choice3: 'Torre del Greco',
        choice4: 'Pompei',
        answer: 4,
    },

    {
        question:'Hova folyik a Volga folyó?',
        choice1: 'Fekete tengerbe',
        choice2: 'Kaszpi-tengerbe',
        choice3: 'Földközi-tengerbe',
        choice4: 'vörös tengeber',
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
        return window.location.assign('endhu.html')
    }
    
    progressText.innerText = `Kérdes szám  ${questionCounter} a ${MAX_QUESTIONS} bol`
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
