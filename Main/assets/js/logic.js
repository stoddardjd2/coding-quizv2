var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;


var questionsEl = document.getElementById('questions');
var timerEl = document.getElementById('time');
var choicesEl = document.getElementById('choices');
var submitBtn = document.getElementById('submit');
var startBtn = document.getElementById('start');
var initialsEl = document.getElementById('initials');
var feedbackEl = document.getElementById('feedback');


var sfxRight = new Audio('assets/sfx/correct.wav');
var sfxWrong = new Audio('assets/sfx/incorrect.wav');

var currentQuestion = 0;
var numbOfQuestions = 4;
var NumbofButtons = 4;

var end = false;
var time = 60;

function startQuiz() {
    timer();
    //start timer   
    document.getElementById("start-screen").className = "hide";
    questionsEl.className = "show";
    addQuestions();
    addButtons();

}

function addQuestions() {
    var question = questions[currentQuestion].title;
    document.getElementById("question-title").innerText = question;
}


function timer() {
    var timerInterval = setInterval(function () {
        if (end == true) {
            console.log("end!");
            clearInterval(timerInterval);
            //stop timer when quiz is completed
            console.log("add score");
            document.querySelector('#final-score').innerText = time;
        }
        else if (time <= 0) {
            console.log("000");
            clearInterval(timerInterval);
            console.log("add score");
            document.querySelector('#final-score').innerText = time;

        }    //stop timer if at or less than 0;

        else {
            time--;
            document.getElementById("time").innerText = time;

        }
    }, 1000)
    //1000 miliseconds delay 
}




startBtn.addEventListener("click", startQuiz);
choicesEl.addEventListener("click", selection);
submitBtn.addEventListener("click", submit);

function submit() {

    var initials = document.getElementById("initials").value;
    localStorage.setItem(initials, time);

}

function selection(e) {
    if (currentQuestion == numbOfQuestions) {
        document.querySelector('#choices').className = "hide";
        document.querySelector('#end-screen').className = "show";
        end = true;
        return;
    }
    //check if at end of quiz

    currentQuestion++;

    var selection = e.target.innerText;
    addQuestions();
    var answer = changeButtonText();
    //returns correct answer

    if (selection == answer) {
        sfxRight.play();
        console.log("correct");
    } else {
        sfxWrong.play();
        time = time - 10;
        console.log("incorrect, correct answer was: " + answer);
    }
    //check if answer was correct
    //load next questions

}

function changeButtonText() {

    for (i = 0; i < NumbofButtons; i++) {
        document.querySelector('#button' + i).innerText = questions[currentQuestion].choices[i];
    }
    return questions[currentQuestion-1].answer;
}

function addButtons() {
    for (i = 0; i < NumbofButtons; i++) {
        var questionText = questions[currentQuestion].choices[i];
        var newButton = document.createElement('button');
        newButton.id = "button" + i;
        //add id for each button
        newButton.innerText = questionText;
        document.querySelector('#choices').appendChild(newButton);
    }

}