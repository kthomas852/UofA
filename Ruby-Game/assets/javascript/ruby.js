//JS for Ruby game

var ruby = {
    gameNum: 0,
    playerNum: 0,
    wins: 0,
    losses: 0,
    crystal: [],

    //function library
    generateGameNum: function(){
        this.gameNum = Math.floor(Math.random() * Math.floor(45 - 16)) + 16;
        
    },

    generateCrystals: function(){
        for(i=0; i<4; i++){
            let num = Math.floor(Math.random() * Math.floor(13));
            this.crystal.push(num); 
            console.log(this.crystal);
        };
    },

    setup: function(){
        this.crystal = [];
        this.playerNum = 0;
        this.generateCrystals();
        this.generateGameNum();
        this.displayUpdate();
    },

    checkEnd: function(){
        if(this.playerNum === this.gameNum){
            console.log('Winning!');
            this.wins++;
            this.setup();
        } else if(this.playerNum > this.gameNum){
            console.log('Lost!');
            this.losses++;
            this.setup();
        } else {
            console.log('and then...')
        };
    },
        
    displayUpdate: function(){
        $('#gameNum').text(this.gameNum);
        $('#playerNum').text(this.playerNum);
        $('#wins').text(this.wins);
        $('#losses').text(this.losses);
    }

}//END of game Obj

//Game run time

$('document').ready(function(){
    console.log('Game is ready to Roll!');
    
    ruby.setup();
    
    $('#crystalOne').on('click', function(){
        ruby.playerNum = ruby.playerNum + ruby.crystal[0];
        console.log(ruby.playerNum);
        ruby.checkEnd();
        ruby.displayUpdate();
        console.log('one pressed');
    });
    
    $('#crystalTwo').on('click', function(){
        ruby.playerNum = ruby.playerNum + ruby.crystal[1];
        ruby.checkEnd();
        ruby.displayUpdate();
        console.log('two pressed');
    });
    
    $('#crystalThree').on('click', function(){
        ruby.playerNum = ruby.playerNum + ruby.crystal[2];
        ruby.checkEnd();
        ruby.displayUpdate();
        console.log('three pressed');
    });
    
    $('#crystalFour').on('click', function(){
        ruby.playerNum = ruby.playerNum + ruby.crystal[3];
        ruby.checkEnd();
        ruby.displayUpdate();
        console.log('four pressed');
    });
});