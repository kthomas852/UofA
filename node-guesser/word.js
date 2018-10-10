//import { Letter } from "./letter";
//Word constructor
var Letter = require('./letter');
function Word(){
    this.unguessed = [];
    this.ltrize = function(word){
        for(i=0; i<word.length; i++){
            this.unguessed.push(new Letter(word[i]));
        }
        console.log('Word ready!');
    }
    this.action = function(){
        let display = [];
        for(i=0; i<this.unguessed.length; i++){
            let ltr = this.unguessed[i];
            display.push(ltr.temp());
        }
        console.log(display.join(` `));
    }
}

module.exports = Word;