/*This is my Phsycic game*/
//Game Object
var fullGame = {
//variables for the game
winsCount: 0,
lossesCount: 0,
guessCounter: 9,
randomLetter: null,
letterGuess: null,
pastGuesses: [],
letters: ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'],

/*Function Library for the game*/

//Gets random letter
getLetter: function(ltr){
    var rndLtr = ltr[Math.floor(Math.random() *Math.floor(26))];
    return rndLtr;
},

//Kicks off the Game
start: function(guess, ok, pastGuesses){
    //runs checks to ensure letter was passed
    var g2g = guess.toLowerCase();
    //Subtracts 1 from the guess counter
    this.guessCounter--;
    document.querySelector('#count').innerHTML = this.guessCounter;
    if(this.check(g2g, ok)){
        this.zivsDinner();
    } else {
        this.lament();
    };
    //Updates the past Guesses
    pastGuesses.push(guess);
    document.querySelector('#guess').innerHTML = this.pastGuesses;
},

//Checks to see if the guess was correct or not
check: function(ltr, ok){
    if(ltr === ok){
        return true;
    } else {
        return false;
    }
},

//Winning function
zivsDinner: function(){
    console.log('win!');
    this.winsCount++;
    document.querySelector('#wins').innerHTML = this.winsCount;
    this.reseter();
},

//lossing function
lament: function(){
    console.log('Loss :(');
    this.lossesCount++;
    document.querySelector('#loss').innerHTML = this.lossesCount;
},

//resets everything in the case of a loss
isLoss: function(guess){
    if(guess === 0){
    alert("You are out of guesses!")

    this.winsCount = 0;
    document.querySelector('#wins').innerHTML = this.winsCount;
    this.lossesCount = 0;
    document.querySelector('#loss').innerHTML = this.lossesCount;
    this.guessCounter = 9;
    document.querySelector('#count').innerHTML = this.guessCounter;
    this.pastGuesses = [];
    document.querySelector('#guess').innerHTML = this.pastGuesses;
        //gets new letter
    this.randomLetter = this.getLetter(this.letters);
    }
},

//resets after a winning guess
reseter: function(){
    this.guessCounter = 9;
    document.querySelector('#count').innerHTML = this.guessCounter;
    this.pastGuesses = [];
    document.querySelector('#guess').innerHTML = this.pastGuesses;
        //gets new letter
    this.randomLetter = this.getLetter(this.letters);
},


};  //END of game Obj

//Gets letter during setup
fullGame.randomLetter = fullGame.getLetter(fullGame.letters);
console.log("("+fullGame.randomLetter+")");

//Listening event for letter pressed
document.onkeyup = function(event){
   fullGame.letterGuess = event.key;
   console.log(fullGame.letterGuess);
   fullGame.start(fullGame.letterGuess, fullGame.randomLetter, fullGame.pastGuesses);
   fullGame.isLoss(fullGame.guessCounter);
};