
var currentQuestion = 0;
var questions = ["Who is the leader of the Autobots?",
    "Who is the leader of the Decepticons?",
    "Who is the main antagonist in 'The Transformers: The Movie?'",
    "What is the Transformers home planet?",
    "In what year does 'The Transformers: The Movie' take place?",
    "Who is the leader of the Dinobots?"

];
var imgSRCs = ["assets/img/optimus_prime.jpg", "assets/img/megatron.jpg", "assets/img/unicron.jpg", "assets/img/cybertron.jpg", "assets/img/autobot_city.jpg", "assets/img/grimlock.jpg"]
var answers = [
    ["Jazz", "Optimus Rhyme", "Optimus Prime", "R2-D2"],
    ["Starscream", "Soundwave", "Shockwave", "Megatron"],
    ["Rust", "Unicron", "Spike", "The Galactic Empire"],
    ["Earth", "Cybertron", "Mercury", "Tatooine"],
    ["2005", "1986", "1985", "2001"],
    ["Snarl", 'Swoop', 'Slag', 'Grimlock']
];
var timer;
var displayTimeLeft;
var correctAnswers = [2, 3, 1, 1, 0, 3];
var questionObjArr = [];
function QuestionObj(str, arr, int) {
    this.question = str,
        this.choices = arr,
        this.correctAnswer = int;
}
var correctNum=0;
var incorrectNum=0;
var unansweredNum=0;

function populateObjArr() {
    for (i = 0; i < questions.length; i++) {
        var newQuestionObj = new QuestionObj(questions[i], answers[i], correctAnswers[i]);
        questionObjArr.push(newQuestionObj);
        //console.log(newQuestionObj);
    }
}

function displayQuestion() {
    clearTimeout(timer);
    timer=setTimeout(displayUnanswered, 15000);
    
    var currentQObj = questionObjArr[currentQuestion];
    $("#content-block").empty();

    var newDiv = $("<div>").attr('id', "question-block");
    $("#content-block").append(newDiv);

    newDiv = $("<div>").attr('id', "time-banner");
    $("#question-block").append(newDiv);

    newDiv = $("<div>").attr('id', "question-banner");
    newDiv.text(currentQObj.question);
    $("#question-block").append(newDiv);

    var curChoices = currentQObj.choices;
    for (i = 0; i < curChoices.length; i++) {
        var answerID = "#answer-" + (i + 1);
        newDiv = $("<div>").attr('id', answerID);
        newDiv.addClass('answer');
        //console.log(answerID);
        newDiv.text(curChoices[i]);
        $("#question-block").append(newDiv);
    }

    var timeLeft=14;
    $("#time-banner").text("15 seconds left to answer!");
    clearInterval(displayTimeLeft);
    displayTimeLeft = setInterval(function(){
        
        if(timeLeft==1){
            $("#time-banner").text(timeLeft+" second left to answer!");
        
        }
        else{
            $("#time-banner").text(timeLeft+" seconds left to answer!");
        }        
        timeLeft--;
    },1000);
}

function checkAnswer() {
   // console.log($(this).attr("id"));
   // console.log(questionObjArr[currentQuestion].correctAnswer + 1);
    if ($(this).attr("id") == ("#answer-" + (questionObjArr[currentQuestion].correctAnswer + 1))) {
        console.log("Correct Answer");
        displayCorrectAnswer();
    }
    else {
        console.log("Incorrect Answer");
        displayWrongAnswer();
    }
}

function displayCorrectAnswer() {
    clearTimeout(timer);
    clearInterval(displayTimeLeft);
    correctNum++;
    $("#question-block").empty();
    var newDiv = $("<div>").attr("id", 'correct-answer').text("Correct!");
    $("#question-block").append(newDiv);
    newDiv = $("<div>").attr("id", 'correct-img-div');
    var correctImg = $("<img>");
    correctImg.attr({ src: imgSRCs[currentQuestion], id: "correct-img" });
    newDiv.append(correctImg);
    $("#question-block").append(newDiv);
    timer=setTimeout(nextQuestion, 3000);
}

function displayWrongAnswer(){
    clearTimeout(timer);
    clearInterval(displayTimeLeft);
    incorrectNum++;
    $("#question-block").empty();
    var newDiv = $("<div>").attr("id", 'incorrect-answer').text("Incorrect!");
    $("#question-block").append(newDiv);
    newDiv = $("<div>").attr("id", 'correct-answer-banner');
    var corAnswer= questionObjArr[currentQuestion].choices[questionObjArr[currentQuestion].correctAnswer];
    newDiv.text("The correct answer is "+ corAnswer+".");
    $("#question-block").append(newDiv);
    newDiv = $("<div>").attr("id", 'correct-img-div');
    var correctImg = $("<img>");
    correctImg.attr({ src: imgSRCs[currentQuestion], id: "correct-img" });
    newDiv.append(correctImg);
    $("#question-block").append(newDiv);
    timer=setTimeout(nextQuestion, 3000);
}
function displayUnanswered(){
    clearTimeout(timer);
    clearInterval(displayTimeLeft);
    unansweredNum++;
    $("#question-block").empty();
    var newDiv = $("<div>").attr("id", 'incorrect-answer').text("Time's up!");
    $("#question-block").append(newDiv);
    newDiv = $("<div>").attr("id", 'correct-answer-banner');
    console.log(questionObjArr[currentQuestion]);
    var corAnswer= questionObjArr[currentQuestion].choices[questionObjArr[currentQuestion].correctAnswer];
    newDiv.text("The correct answer is "+ corAnswer+".");
    $("#question-block").append(newDiv);
    newDiv = $("<div>").attr("id", 'correct-img-div');
    var correctImg = $("<img>");
    correctImg.attr({ src: imgSRCs[currentQuestion], id: "correct-img" });
    newDiv.append(correctImg);
    $("#question-block").append(newDiv);
    timer=setTimeout(nextQuestion, 3000);
}

function nextQuestion(){
    currentQuestion++;
    if(currentQuestion>=questionObjArr.length){
        displayEndScreen();
    }
    else{
        
        displayQuestion();
        
    }
}

function displayEndScreen(){
    $("#content-block").empty();
    var newDiv = $("<div>").attr("id", 'game-over-block')
    $("#content-block").append(newDiv);
    $("#game-over-block").append($("<div>").attr("id", 'end-game-banner').text("All done! Here's how you did!!"));
    $("#game-over-block").append($("<div>").attr("id", 'correct').text("Correct answers: "+ correctNum));
    $("#game-over-block").append($("<div>").attr("id", 'incorrect').text("Incorrect answers: "+ incorrectNum));
    $("#game-over-block").append($("<div>").attr("id", 'unanswered').text("Left unanswered: "+ unansweredNum));
    $("#game-over-block").append($("<div>").attr({id: 'start-over',class:'restart'}).text("Start Over?"));
}
function displayStartScreen(){
    $("#content-block").empty();
    var newDiv = $("<div>").attr("id", 'start-game-block');
    $("#content-block").append(newDiv);
    newDiv.append($("<div>").attr({id: 'start-game-banner',class:'start'}).text("Start!"));
    $("#content-block").append(newDiv);
}
function start(){
    correctNum = 0;
    incorrectNum = 0;
    unansweredNum = 0;
    currentQuestion = 0;
    displayQuestion();
}

$(document).ready(function () {
    populateObjArr();
    //currentQuestion++;
    // currentQuestion++;
    // currentQuestion++;
    // currentQuestion++;
    // currentQuestion++;
    // displayQuestion();
    displayStartScreen();
});
$(document).on("click", ".answer", checkAnswer);
$(document).on("click",".start",start);
$(document).on("click",".restart",start);