//Constructor for letter values

function Letter(letter){
    this.correct = letter;
    this.right = false;
    this.temp = function(){
        if(this.correct === ' '){
            return ' ';
        }else if(this.right){
            return this.correct;
        }else{
            return '_';
        }
    }
    this.compare = function(guess){
        if(this.right){
            return 'You already guessed this letter, try again';
        }else if(guess === this.correct){
            this.showing = guess;
            this.right = true;
            return true
        }else{
            return false;
        }
    };
};

module.exports = Letter;