/*  Run content for Guess the Movie
            @ Kyle Thomas 2018
    This is the JavaScript for the game */

//Object for game
var game = {
    //var list
    actorList: ['bill paxton', 'jeff goldblum', 'julianne moore', 'judi dench', 'someone', 'someone else'],
    actor: null,
    guessRight: [],
    guessWrong: [],
    wrongCounter: 0,

    //Function Library

    //Starts the game and does initial setup
    start: function(board, word){
        //sets up game spaces starts 
        word.split("");
        for(i=0; i<word.length; i++){
            board.push('_ ');
        }
        board[word.indexOf(' ')] = '  ';
        document.querySelector('#guessSpace').innerHTML = board.join(',');
    },

    //generates random actor
    getActor: function(array, word){
        word = array[Math.floor(Math.random()*Math.floor(array.length))];
        console.log(word);
    },

    //posts used bad letters
    deadLtrs: function(){
        targetDiv = document.getElementById('grave');
        var ptag = document.createElement('span');
        targetDiv.append(ptag);
        ptag.textContent = userText;
    },

    //posts good choices in appropriate places
    liveLtrs: function(){
        targetDiv = document.getElementById('guessSpace');
        var ptag = document.createElement('span');
        targetDiv.append(ptag);
        ptag.textContent = userText;
    }, 
    //resets if they decide to play again
    reseter: function(){
        //...
    },


}; //END of game Obj

/*Run Time game play*/
game.getActor(game.actorList, game.actor);

game.start(game.guessRight, game.actor);