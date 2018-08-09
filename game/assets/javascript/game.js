/*  Run content for Guess the Movie
            @ Kyle Thomas 2018
    This is the JavaScript for the game */

 //This is what is needed for generation of a random word
 var actorList = ['Bill Paxton', 'Jeff Goldblum', 'Julianne Moore', 'Judi Dench', '', ''];
 var actor = null;
 var max = 6;
 var userText = null;
 var guessCount = 5;
 var actGuess = null;
 

 /*Function Section*/
 //Random Generation Function
 function getRandomInt(max) {
     return Math.floor(Math.random() * Math.floor(max));
 };

 //Compares guess to string
 function compares(userText, actor) {
    var bad = null; 
    for(i=0; i<actor.length; i++) {
        if(userText === actor[i]) {
            return //char to correct guess location
        } else {
            bad = userText;
            return bad; //to graveyard
        }
    }
 }


 /*main body of game*/
//while Loop to contain game and generates replay

  //generates actor to guess
  actor = actorList[getRandomInt(max)];
  //Function that creates spaces to be displayed in actorGuess based on actor

  /*While Loop containing guess runthrough, will eject if # ofguesses are used up*/  
  //Function that grabs user input
  document.getElementById("guess");
  document.onkeyup = function(event) {
      console.log('keyup event= ', event);
      userText.textContent = event.key;
      console.log('new user-text= ', userText);
  };
  //Code that compares guess to string
  while(actor !== actGuess) {
    actorGuess = compares(userText, actor);
  }
    //if correct sends guess to HTML in correct palcement
      //Function that updates screen to show correct info
    //else sends bad guess to graveyard
      //Function that updates screen to show correct info


  /*If actor is guessed this finishing code runs*/
    //Funtion that displays pic of correct actor and plays audio clip