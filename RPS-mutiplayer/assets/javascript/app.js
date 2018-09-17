/* This is the JavaScript for the RPS multiplayer game */
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBdmKKBMGQ4pl8zo7lRgpF62gap05W9vSc",
    authDomain: "rps-multi-13b43.firebaseapp.com",
    databaseURL: "https://rps-multi-13b43.firebaseio.com",
    projectId: "rps-multi-13b43",
    storageBucket: "rps-multi-13b43.appspot.com",
    messagingSenderId: "905989129592"
  };
  firebase.initializeApp(config);

  var rps = firebase.database();
  var userName = '';
  var playerMove = '';
  var me = '';
  var mem = '';
  var p1 = 0;
  var p2 = 0;
  var picture = '';
  var noSelect = 'assets/images/noSelection.jpeg';

  //Function Library
  var checkPlayers = function(){
      if(mem.win){
          rps.ref().set({
              player1: userName,
              player2: '',
              player1Choice: '',
              player2Choice: '',
              player1Points: p1,
              player2Points: p2,
              win: false
          });
          me = 'player1';
      } else if(mem.player2 === ''){
         rps.ref('player2').set(userName);
         me = 'player2';
      } else {
          $('#banner').text('...Game in Progress...');
          console.log('...Game in Progress...');
      };
  };

  var compareGuess = function(){
    if(mem.player1Choice === '' || mem.player2Choice === ''){
        console.log('Opponent still making a decision');
    } else if(mem.player1Choice === 'paper' && mem.player2Choice === 'rock'){
        console.log('Player 1 Wins Round!');
        $('#banner').text('Round to Player 1');
        rps.ref('/player1Choice').set('');
        rps.ref('/player2Choice').set('');
        p1++;
        rps.ref('/player1Points').set(p1);
        setTimeout(() => {
            checkWin();
        }, 3000);
    } else if(mem.player1Choice === 'scissors' && mem.player2Choice === 'paper'){
        console.log('Player 1 Wins Round!');
        $('#banner').text('Round to Player 1');
        rps.ref('/player1Choice').set('');
        rps.ref('/player2Choice').set('');
        p1++;
        rps.ref('/player1Points').set(p1);
        setTimeout(() => {
            checkWin();
        }, 3000);
    } else if(mem.player1Choice === 'rock' && mem.player2Choice === 'scissors'){
        console.log('Player 1 Wins Round!');
        $('#banner').text('Round to Player 1');
        rps.ref('/player1Choice').set('');
        rps.ref('/player2Choice').set('');
        p1++;
        rps.ref('/player1Points').set(p1);
        setTimeout(() => {
            checkWin();
        }, 3000);
    } else if(mem.player1Choice === 'paper' && mem.player2Choice === 'scissors'){
        console.log('Player 2 Wins Round!');
        $('#banner').text('Round to Player 2');
        rps.ref('/player1Choice').set('');
        rps.ref('/player2Choice').set('');
        p2++;
        rps.ref('/player2Points').set(p2);
        setTimeout(() => {
            checkWin();
        }, 3000);
    } else if(mem.player1Choice === 'scissors' && mem.player2Choice === 'rock'){
        console.log('Player 2 Wins Round!');
        $('#banner').text('Round to Player 2');
        rps.ref('/player1Choice').set('');
        rps.ref('/player2Choice').set('');
        p2++;
        rps.ref('/player2Points').set(p2);
        setTimeout(() => {
            checkWin();
        }, 3000);
    } else if(mem.player1Choice === 'rock' && mem.player2Choice === 'paper'){
        console.log('Player 2 Wins Round!');
        $('#banner').text('Round to Player 2');
        rps.ref('/player1Choice').set('');
        rps.ref('/player2Choice').set('');
        p2++;
        rps.ref('/player2Points').set(p2);
        setTimeout(() => {
            checkWin();
        }, 3000);
    } else{
        console.log('Tie... Try Again...');
    };
  };

  var setMoveImage = function(){
    if(mem.player1Choice === '' || mem.player2Choice === ''){
        $('#banner').text('Opponent still making a decision');
        $('#playerSpace1').attr('src', noSelect);
        $('#playerSpace2').attr('src', noSelect);
      } else {
          if(playerMove === 'rock'){
        picture = 'assets/images/rock.png';
      } else if(playerMove === 'paper'){
        picture = 'assets/images/paper.png';
      } else if(playerMove === 'scissors'){
        picture = 'assets/images/scissors.png';
      };
      if(me === 'player1'){
          $('#playerSpace1').attr('src', picture);
      } else if(me === 'player2'){
        $('#playerSpace2').attr('src', picture);
      }
    };
    compareGuess();
  };

  var checkWin = function(){
    if(mem.player1Points === 3){
        console.log('Player 1 Wins!!!!');
        $('.container').html('Player 1 Wins!!!!');
        rps.ref('/win').set(true);
    } else if(mem.player2Points === 3){
        console.log('Player 2 Wins!!!!');
        $('.container').html('Player 2 Wins!!!!');
        rps.ref('/win').set(true);
    } else{
        console.log('Next Round');
        setTimeout(() => {
            $('#banner').text('Next Round');
        }, 3000);
    }
  }
/*Listening Events*/
//Player initiation
  $('#userBtn').click(function(){
      userName = $('#userName').val();
      rps.ref('/random').set('here');
      $('.middle').attr('style', 'visibility: visible');
      $('.beginning').html('');
      checkPlayers();
  });
//Move while in game
  $('.move').click(function(){
    $('.battle').attr('style', 'visibility: visible');
      playerMove = $(this).attr('name');
      console.log(playerMove);
      if(me === 'player1'){
        rps.ref('/player1Choice').set(playerMove);
      }else if(me === 'player2'){
          rps.ref('/player2Choice').set(playerMove);
      };
    });
    //Firebase changes listener
    rps.ref().on('value', function(snapshot){
        mem = snapshot.val();
        console.log(mem);
        setTimeout(() => {
            setMoveImage();
        }, 2000);
  });