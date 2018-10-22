//import { Word } from './letter.js';
//Main promgram for game
var Word = require('./word');
var keypress = require('keypress');
//Word Bank
var wordsAvail = ["cat", "dog", "mother", "doors", `blank slate`];
//Selects word at random
var playWord = new Word();
playWord.ltrize(wordsAvail[Math.floor(Math.random() * wordsAvail.length)]);

var winCondition = function(){
    let win = true;
    for(i=0; i<playWord.unguessed.length; i=0){
        if(!playWord.unguessed[i].right){
            console.log(win);
            win = false;
        }
    };
    console.log(win);
    if(win){
        console.log('YOU WIN!!!!!');
    }else{
        console.log('Keep going');
    };
};

var lines = process.stdout.getWindowSize()[1];
for(var i = 0; i < lines; i++) {
    console.log('\r\n');
}
console.log('Guess a letter');
playWord.action();

keypress(process.stdin);
process.stdin.on('keypress', function(ch, key){
    var lines = process.stdout.getWindowSize()[1];
    for(var i = 0; i < lines; i++) {
        console.log('\r\n');
    }
    console.log('You guessed ' + ch)
    for(i=0; i<playWord.unguessed.length; i++){
    if(playWord.unguessed[i].compare(ch)){
        console.log("Correct!");
    }else if(!playWord.unguessed[i].compare(ch)){
        console.log("Doesn't match, Guess again");
    }else{
        console.log("You've already guessed that letter...")
    };
    }
    playWord.action();
    //winCondition();
});

process.stdin.setRawMode(true);
process.stdin.resume();