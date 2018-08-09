/*  Run content for Guess the Movie
            @ Kyle Thomas 2018
    This is the JavaScript for the game */

 //This is what is needed for generation of a random word
 var actor = ['cat', 'dog', 'lizard', 'elephant', 'tuna', 'chicken'];
 var max = 6;
 var guess = null;
 var guessCount = 5;
 var actGuess = null;
 

 //Function Section
 //Random Generation Function
 function getRandomInt(max) {
     return Math.floor(Math.random() * Math.floor(max));
 }

 //Letter guess function - grabs letter from user input and checks it
 
function letterGuesser(){
 console.log(actGuess);
 var i = 0;
 while(actGuess.length > i) {
     guess = document.getElementByClassName('guess');
     if(actGuess[i] === guess) {
        return  i;
                guess;
                console.log('Letter guessed: ' + i);
     }
     else {
         console.log('Bro, do you even Java?!?!?!');
         ++i;
     }
 };
 alert('Faily McFailerson over here!')
};


 /*main body of game*/
//generates actor to guess
 actGuess = actor[getRandomInt(max)];