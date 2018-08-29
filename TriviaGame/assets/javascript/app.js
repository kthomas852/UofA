/*Javascript for the Trivia Game*/
var game = {
    temp: '<div id="start" class="row">'
    +'<div class="col-md-1"></div>'
    +'<div class="col-md-10 gameBox">'
    +'    <h1 class="title">Totally Trivial Trivia</h1>'
    +'    <h3 id="tBlock">Time Remaining to Answer: <span id="timer"></span></h3>'
    +'    <div class="questions"><h3 id="quiz"></h3>'
    +'        <input type="radio" name="answer" value="ans1"/><span id="ans1"></span></input><br>'
    +'        <input type="radio" name="answer" value="ans2"/><span id="ans2"></span></input><br>'
    +'        <input type="radio" name="answer" value="ans3"/><span id="ans3"></span></input><br>'
    +'        <input type="radio" name="answer" value="ans4"/><span id="ans4"></span></input><br>'
    +'        <div class="spacer"></div>'
    +'  </div>'
    +'   <button id="submit" class="btn btn-secondary">Submit</button>'
    +'</div>'
    +'<div class="col-md-1"></div>'
    +'</div>',

    //Array holding the questions
    questions:[
    {
        Q: 'Who plays the shy scientist who who falls for S.J.P. in Mars Attacks?',
        Answers: ['Jack Nicholson,', 'Danny DeVito', 'Martin Short', 'Jim Brown'],
        true: 'Pierce Brosnan',
    },   

    {
        Q: 'Name the movie that Bill Paxton was NOT in?',
        Answers: ['Aliens', 'Frailty', 'True Lies', 'Twister'],
        true: 'Tremors',
    },   

    {
        Q: 'In what movie does Jeff Goldblum have his DNA spliced with an insect?',
        Answers: ['Beetle Juice', 'Jurassic Park', 'Space Invaders' , 'Independance Day'],
        true: 'The Fly',
    },   

    {
        Q: 'Which big star makes their first big appearance in the movie Mars Attacks?',
        Answers: ['Jack Black', 'Glenn Close', 'Sarah Jessica Parker', 'Michael J. Fox'],
        true: 'Natalie Portman',
    },   
    ],

};//END of Obj

var questionCount = 0;
var gameTime = 30;
var ansSelect = '';
var TO = null;
var timer = null;
var gotRight = 0;

/*Functino Library*/
var setBoard = function(){
    $('#start').remove();
    $('.container').append(game.temp);
    console.log('Ready to Play')
};

var nextQuestion = function(){
    setBoard();
    clearTimeout(TO);
    gameTime = 30;
    $('#quiz').text(game.questions[questionCount].Q);
    let rNum = Math.floor(Math.random()* Math.floor(4))+1;
    ansSelect = '#ans' + rNum.toString();
    console.log(ansSelect)
    for(i=0; i<4; i++){
    $('#ans' + (1+i).toString()).text(game.questions[questionCount].Answers[i]);
    };
    $(ansSelect).text(game.questions[questionCount].true);
    timer = setInterval(decrement, 1000);
    questionCount++;
    buttonWatch();
    console.log('Out of question function');    
};

var buttonWatch = function(){
$('#submit').click(function(){
    clearInterval(timer);
    console.log('submit pressed');
    if($('input[value=' + ansSelect.substring(1) + ']').is(':checked')){
        $('#timer').text('ANSWER CORRECT!');
        gotRight++;
        console.log('correct answer selected');
    }else{
        $('#timer').text('ANSWER INCORRECT SORRY');
        console.log('correct answer NOT selected');
    };
    endCheck();
        TO = setTimeout(nextQuestion, 3000);
});
};

var decrement = function(){
    gameTime--;
    $('#timer').text(gameTime);
    if(gameTime === 0){
        console.log('You ran out of time');
        endCheck();
        timesUp();
    }
};

var timesUp = function(){
    clearInterval(timer);
    $('#timer').text('OUT OF TIME');
    $('#quiz').text("What's a matter, cat got your tounge?");
    TO = setTimeout(nextQuestion, 3000);
};

var endCheck = function(){
    if(questionCount === game.questions.length){
        clearTimeout(TO);
        clearInterval(timer);
        $('#tBlock').text("You've finished the quiz!");
        $('.questions').html('<h3 id="end"></h3>');
        $('#end').text("You answered " + gotRight + " of " + game.questions.length + " Correct!");
        $('#submit').text('Try Again');
        TO = setTimeout(nextQuestion, 600000);
        $('#submit').unbind().click(function(){
            clearTimeout(TO);
            questionCount = 0;
            gotRight = 0;
            console.log('questionCount is '+ questionCount);
            nextQuestion();
        });
    }
    console.log('Keep going');
};

/*Initiates the game*/
$('document').ready(function(){
$('.strBtn').click(function(){
    nextQuestion();
});

});