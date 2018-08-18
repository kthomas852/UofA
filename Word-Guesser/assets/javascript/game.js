/*  Run content for Guess the Movie
            @ Kyle Thomas 2018
    This is the JavaScript for the game */

//Object for game
var game = {
    //var list
    actorList: ['back', 'front', 'side', 'cats', 'some', 'sea'],
    actor: null,
    guess: null,
    guessRight: [],
    guessWrong: ['_', '_', '_', '_'],
    wrongCounter: 0,

    //Function Library

    //Starts the game and does initial setup
    setBoard: function(board, word){
        //sets up game spaces starts 
        for(i=0; i<word.length; i++){
            board.push('_');
        }
        /*board[word.indexOf(' ')] = ' ';
        return board;*/
        //This is used for words with spaces
    },
    
    //Had trouble getting this to work
    /*displayGuess: function(board){
        let disp = '';
        let dispToo = '';
        for (let i = 0; i < board.indexOf(' '); i++) {
            disp = disp + " " + board[i];
            };
        for(let i = board.indexOf(' ') + 1; i < board.length; i++){
            dispToo = dispToo + " " + board[i];
            console.log(dispToo);
        };
        document.querySelector('#guessSpace').innerHTML = disp;
        document.querySelector('#guessSpace').append("  ");
        document.querySelector('#guessSpace').append(dispToo);
        console.log(disp);
    },*/

    //generates random actor
    getActor: function(array, word){
        word = array[Math.floor(Math.random()*Math.floor(array.length))];
        console.log(word);
        return word;
    },
    
    compareKey: function() {
        if((this.guessRight.indexOf(guess) === -1) && (this.actor.inddexOf(guess) === -1)){
            this.guessWrong.push(guess);
            console.log(guessRight);
            console.log(guessWrong);
            this.deadLtrs();
            this.winning();
        } else{
            for(let i =0; i<this.actor.length[i]; i++){
                if((guess === this.actor.indexOf[i]) && (this.guessRight.indexOf(guess) === -1)){
                    this.guessRight[i] = guess;
                    this.liveLtrs();
                    this.winning();
                } else {
                    console.log("Not a valid Character...");
                }
            }
        };
    },

    winning: function(){
        if(this.guessRight === this.actor){
            alert('You Win!!!!');
            this.reseter();
        } else if(wrongCounter < 1){
            alert("You Lose!");
            this.reseter();
        } else {
            console.log("Next letter...")
        }
    },

    //posts used bad letters
    deadLtrs: function(){
        document.querySelector('#grave').innerHTML = " ";
        for(i=0; i<this.guessWrong.length; i++) {
            document.querySelector('#grave').append(this.guessWrong[i]);
        }
    },
    
    //posts good choices in appropriate places
    liveLtrs: function(){
        document.querySelector('#guessSpace').innerHTML = "";
        for(i=0; i<this.guessRight.length; i++) {
            document.querySelector('#guessSpace').append(this.guessRight[i]);
        }
    }, 
    //resets if they decide to play again
    reseter: function(){
        //Runs entire game
        game.actor = game.getActor(game.actorList, game.actor);
        console.log('('+game.actor+')')
        game.guessRight = game.setBoard(game.guessRight, game.actor);
        console.log('[' + game.guessRight + ']');
        wrongCounter = 4;
        game.liveLtrs();
        game.deadLtrs();
        console.log('game ready to go...')
    },
    
    
}; //END of game Obj

document.onkeyup = function(){
game.reseter();
/*Run Time game play*/
document.onkeyup = function(event){
    guess = event.key;
    game.compareKey(guess);
    console.log('keypressed')
}
 console.log(guess);
};