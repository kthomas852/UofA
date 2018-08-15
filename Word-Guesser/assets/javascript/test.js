var actor = "cat";
var userText = '';
var guess = '';
var i = 0;
var key = '';

document.onkeyup = function (event) {
    key.textContent = event.key;
    compares(key, actor, i);
};
console.log(i);


function compares(userText, actor, i) {
    if(userText === actor[i]){
        liveLtrs(userText);
        guess = guess + userText;
        i++;
    } else {
        deadLtrs(userText);
    };

};
    var deadLtrs = function(userText){
        targetDiv = document.getElementById('grave');
        var ptag = document.createElement('span');
        targetDiv.append(ptag + ' ');
        ptag.textContent = userText;
    };
    
    var liveLtrs = function(userText){
        targetDiv = document.getElementById('guessSpace');
        var ptag = document.createElement('span');
        targetDiv.append(ptag + ' ');
        ptag.textContent = userText;
    }; 
    
  /*  console.log(userText);
    for (i = 0; i < actor.length; i++) {
        console.log(i);
            if (userText === actor[i]) {
                liveLtrs(); //Returns correct answer
            } else {
                deadLtrs(); //to graveyard
            }
        }
        */
    
//Working funciton that grabs an element and changes it onclick
/*function letsGo(){
var targetDiv = document.getElementById('guessSpace');
var ptag = document.createElement('p');

targetDiv.append(ptag); 
ptag.textContent = 'and now for something completely different!';
};*/
