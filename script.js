const questions = [
    {
        question: "which is the largest animal in the world?",
        answers: [
            {text: "shark", correct: false},
            {text: "Giraffe", correct: false},
            {text: "Elephant", correct: false},
            {text: "Blue whale", correct: true}
        ]
    },
    {
        question: "What is the capital of Nigeria?",
        answers: [
            {text: "Abuja", correct: true},
            {text: "Kano", correct: false},
            {text: "Lagos", correct: false},
            {text: "Benue", correct: false}
        ]
    },
    {
        question: "how many continents are there in the world?",
        answers: [
            {text: "8", correct: false},
            {text: "9", correct: false},
            {text: "7", correct: true},
            {text: "5", correct: false}
        ]
    },
    {
        question: "which is the largest land animal in the world?",
        answers: [
            {text: "shark", correct: false},
            {text: "Giraffe", correct: false},
            {text: "Elephant", correct: false},
            {text: "Blue whale", correct: true}
        ]
    },
    {
        question: "which is the largest aquatic animal in the world?",
        answers: [
            {text: "shark", correct: false},
            {text: "Giraffe", correct: false},
            {text: "Elephant", correct: false},
            {text: "Blue whale", correct: true}
        ]
    },
    {
        question: "How many months are there in a year?",
        answers: [
            {text: "13", correct: false},
            {text: "12", correct: true},
            {text: "6", correct: false},
            {text: "14", correct: false}
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0; 
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();

    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add('correct');
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz()
    }
});

startQuiz();