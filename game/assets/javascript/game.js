/*  Run content for Guess the Movie
            @ Kyle Thomas 2018
    This is the JavaScript for the game */

 //This is what is needed for generation of a random word
 var animal = ['cat', 'dog', 'lizard', 'elephant', 'tuna', 'chicken'];
 var max = 6;
 var guess = null;
 var guessCount = 5;
 var anGuess = null;
 
 function getRandomInt(max) {
     return Math.floor(Math.random() * Math.floor(max));
 }

 anGuess = animal[getRandomInt(max)];

 //Letter guess input from the user (probably should also make this a function)

 //Need to find better input method
 console.log(anGuess);
 var i = 0;
 while(anGuess.length > i) {
     guess = prompt('What is your guess?')
     if(anGuess[i] === guess) {
         alert('Nailed It!!!');
         console.log('i')
     }
     else {
         console.log('Bro, do you even Java?!?!?!');
         ++i;
     }
 };

 alert('Faily McFailerson over here!')