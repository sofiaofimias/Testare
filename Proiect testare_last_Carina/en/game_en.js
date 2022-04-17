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
        question: 'In Georgia (the state), it’s illegal to eat what with a fork?',
        choice1: "soup",
        choice2: "sandvici",
        choice3: "fries",
        choice4: "desert",
        answer: 3,  
    },

	{
        question: 'What color is the natural hair of the famous Marilyn Monroe?',
        choice1: "blonde",
        choice2: "dark-haired",
        choice3: "red",
		choice4: "black",
        answer: 3,  
    },
	
	{
        question: 'What language does the word "ketchup" come from?',
        choice1: "english",
        choice2: "chinese",
        choice3: "latin",
		choice4: "romanian",
        answer: 2,  
    },
	
	{
        question: 'What is life expectancy worldwide?',
        choice1: "70 years",
        choice2: "65 years",
        choice3: "90 years",
		choice4: "100 years",
        answer: 1,  
    },
	
	{
        question: 'Where is the largest pyramid in the world? ',
        choice1: "Egipt",
        choice2: "Mexic",
        choice3: "Romania",
		choice4: "Hungary",
        answer: 2,  
    },
	
	{
		question: 'In which Scandinavian country would you find "fjords"?',
        choice1: 'Finland',
        choice2: 'Norway',
        choice3: 'Sweden',
        choice4: 'Denmark',
        answer: 2,
    },
	
    {
        question: 'Which is the only major city located on two continents?',
        choice1: 'Istanbul',
        choice2: 'Vienna',
        choice3: 'St.Petersburg',
        choice4: 'Havana',
        answer: 1,
    },
 
    {

        question: 'In which city would you find "Sagrada Familia"?',
        choice1: 'Barcelona',
        choice2: 'Madrid',
        choice3: 'Rome',
        choice4: 'Sevilla',
        answer: 1,
    },
	
    {
        question:'What was the name of the city destroyed by the eruption of Vesuvius volcano?',
        choice1: 'Naples',
        choice2: 'Amalfi',
        choice3: 'Torre del Greco',
        choice4: 'Pompei',
        answer: 4,
    },
	
    {
        question:'Where does the Volga River fall?',
        choice1: 'Black Sea',
        choice2: 'Caspian Sea',
        choice3: 'Mediterranean Sea',
        choice4: 'Red Sea',
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
        return window.location.assign('enden.html')
    }
    
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
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
