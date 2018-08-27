/*Javascript for the Trivia Game*/
var game = {
    temp: '<div id="question1" class="row">'
    +'<div class="col-md-1"></div>'
    +'<div class="col-md-10 gameBox">'
    +'    <h1 class="title">Totally Trivial Trivia</h1>'
    +'    <h3>Time Remaining to Answer: <span id="timer"></span></h3>'
    +'    <div class="questions"><h3 id="quiz"></h3>'
    +'        <input type="radio" name="answer" value=""/><span id="ans1"></span></input><br>'
    +'        <input type="radio" name="answer" value=""/><span id="ans2"></span></input><br>'
    +'        <input type="radio" name="answer" value=""/><span id="ans3"></span></input><br>'
    +'        <input type="radio" name="answer" value=""/><span id="ans4"></span></input><br>'
    +'   <button id="submit" class="btn btn-secondary">Submit</button>'
    +'  </div>'
    +'</div>'
    +'<div class="col-md-1"></div>'
    +'</div>',

    quest1: {
        Q: 'This is my first Question?',
        Answers: ['cats', 'dogs', 'birds', 'elephants'],
        true: 'Some Random Stuff',
    },   

    quest2: {
        Q: 'This is my Second Question?',
        Answers: [],
        true: '',
    },   

    quest3: {
        Q: '',
        Answers: [],
        true: '',
    },   

    quest4: {
        Q: '',
        Answers: [],
        true: '',
    },   

};//END of Obj

var questionCount = 0;
var questionArray = [game.quest1.Q, game.quest2.Q, game.quest3.Q, game.quest4.Q];
var answerArray = [game.quest1.true, game.quest2.true, game.quest3.true, game.quest4.true];

/*Functino Library*/
var setBoard = function(){
    $('#start').remove();
    $('.container').append(game.temp);
    console.log('Ready to Play')
};

var nextQuestion = function(){
    $('#quiz').text(questionArray[questionCount]);
    let rNum = Math.floor(Math.random()* Math.floor(4))+1;
    let ansSelect = '#ans' + rNum.toString();
    console.log(ansSelect)
    for(i=0; i<4; i++){
    $('#ans' + (1+i).toString()).text(game.quest1.Answers[i]);
    };
    $(ansSelect).text(answerArray[questionCount]);

    questionCount++;
};

/*Initiates the game*/
$('document').ready(function(){
$('.strBtn').click(function(){
    setBoard();
    nextQuestion();

});

$('#submit').click(function(){
    nextQuestion();
});

});