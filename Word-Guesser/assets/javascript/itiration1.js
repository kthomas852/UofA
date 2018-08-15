/*  Run content for Guess the Movie
            @ Kyle Thomas 2018
    This is the JavaScript for the game */

 //This is what is needed for generation of a random word
 var actorList = ['bill paxton', 'jeff goldblum', 'julianne moore', 'judi dench', 'someone', 'someone else'];
 var actor = "";
 var max = actorList.length;
 var userText = "";
 var guessCount = 5;
 var actGuess = "";
 var guessIndex = 0;
 var emptySpaces = [];
 

 /*Function Section*/
 //Random Generation Function
 function getRandomInt(max) {
     return Math.floor(Math.random() * Math.floor(max));
 };

 //Function that creates proper spaces for Guess
 function guessBox(word) {
    for(i=0; i<word.length; i++){
        emptySpaces.push('_ ');
    }
    emptySpaces.join(','); 
    console.log(emptySpaces);
    document.getElementById('guessSpace').text ='<span>' + emptySpaces + ' (spaces for the guesses)</span>';
 }

 //Compares guess to string
    var deadLtrs = function(){
        targetDiv = document.getElementById('grave');
        var ptag = document.createElement('span');
        targetDiv.append(ptag);
        ptag.textContent = userText;
    };

    var liveLtrs = function(){
        targetDiv = document.getElementById('guessSpace');
        var ptag = document.createElement('span');
        targetDiv.append(ptag);
        ptag.textContent = userText;
    }; 

    
    
    /*main body of game*/
    //while Loop to contain game and generates replay
    
    //generates actor to guess
    actor = actorList[getRandomInt(max)];
    //Function that creates spaces to be displayed in actorGuess based on actor
    console.log("The actor is: " + actor);
    //Creates Guess Box
    guessBox(actor);

/*wraper for the game*/
document.getElementById("guess");
document.onkeyup = function (event) {
    userText = event.key;
    console.log(userText);


    actor.indexOf(userText);
    if (userText === actor) {
        liveLtrs();
        actGuess = actGuess + userText;
        guessIndex++;
    } else {
        deadLtrs();
    };
    console.log(guessIndex);
};
  //Code that compares guess to string
    //if correct sends guess to HTML in correct palcement
      //Function that updates screen to show correct info
    //else sends bad guess to graveyard
      //Function that updates screen to show correct info


  /*If actor is guessed this finishing code runs*/
    //Funtion that displays pic of correct actor and plays audio clip