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
  var picture1 = '';
  var picture2 = '';
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
        //$('#banner').text('Opponent still making a decision');
    } else if(mem.player1Choice === 'paper' && mem.player2Choice === 'rock'){
        console.log('Player 1 Wins Round!');
        $('#banner').text('Round to ' + mem.player1);
        setMoveImage();
        rps.ref('/player1Choice').set('');
        rps.ref('/player2Choice').set('');
        p1++;
        rps.ref('/player1Points').set(p1);
        setTimeout(() => {
            checkWin();
        }, 2000);
    } else if(mem.player1Choice === 'scissors' && mem.player2Choice === 'paper'){
        console.log('Player 1 Wins Round!');
        $('#banner').text('Round to ' + mem.player1);
        setMoveImage();
        rps.ref('/player1Choice').set('');
        rps.ref('/player2Choice').set('');
        p1++;
        rps.ref('/player1Points').set(p1);
        setTimeout(() => {
            checkWin();
        }, 2000);
    } else if(mem.player1Choice === 'rock' && mem.player2Choice === 'scissors'){
        console.log('Player 1 Wins Round!');
        $('#banner').text('Round to ' + mem.player1);
        setMoveImage();
        rps.ref('/player1Choice').set('');
        rps.ref('/player2Choice').set('');
        p1++;
        rps.ref('/player1Points').set(p1);
        setTimeout(() => {
            checkWin();
        }, 2000);
    } else if(mem.player1Choice === 'paper' && mem.player2Choice === 'scissors'){
        console.log('Player 2 Wins Round!');
        $('#banner').text('Round to ' + mem.player2);
        setMoveImage();
        rps.ref('/player1Choice').set('');
        rps.ref('/player2Choice').set('');
        p2++;
        rps.ref('/player2Points').set(p2);
        setTimeout(() => {
            checkWin();
        }, 2000);
    } else if(mem.player1Choice === 'scissors' && mem.player2Choice === 'rock'){
        console.log('Player 2 Wins Round!');
        $('#banner').text('Round to ' + mem.player2);
        setMoveImage();
        rps.ref('/player1Choice').set('');
        rps.ref('/player2Choice').set('');
        p2++;
        rps.ref('/player2Points').set(p2);
        setTimeout(() => {
            checkWin();
        }, 2000);
    } else if(mem.player1Choice === 'rock' && mem.player2Choice === 'paper'){
        console.log('Player 2 Wins Round!');
        $('#banner').text('Round to ' + mem.player2);
        setMoveImage();
        rps.ref('/player1Choice').set('');
        rps.ref('/player2Choice').set('');
        p2++;
        rps.ref('/player2Points').set(p2);
        setTimeout(() => {
            checkWin();
        }, 2000);
    } else{
        console.log('Tie... Try Again...');
    };
  };

  var setMoveImage = function(){
    if(mem.player1Choice === 'rock'){
        picture1 = 'assets/images/rock.png';
      } else if(mem.player1Choice === 'paper'){
        picture1 = 'assets/images/paper.png';
      } else if(mem.player1Choice === 'scissors'){
        picture1 = 'assets/images/scissors.png';
      };
    $('#playerSpace1').attr('src', picture1);
    if(mem.player2Choice === 'rock'){
        picture2 = 'assets/images/rock.png';
      } else if(mem.player2Choice === 'paper'){
        picture2 = 'assets/images/paper.png';
      } else if(mem.player2Choice === 'scissors'){
        picture2 = 'assets/images/scissors.png';
      };
    $('#playerSpace2').attr('src', picture2);
  };

  var checkWin = function(){
    if(mem.player1Points === 3){
        console.log('Player 1 Wins!!!!');
        $('#banner').text(mem.player1 + ' Wins!!!!');
        rps.ref('/win').set(true);
        //resetOption();
    } else if(mem.player2Points === 3){
        console.log('Player 2 Wins!!!!');
        $('#banner').text(mem.player2 + ' Wins!!!!');
        rps.ref('/win').set(true);
        //resetOption();
    } else{
        console.log('Next Round');
        setTimeout(() => {
            $('#banner').text('Next Round');
            $('#playerSpace1').attr('src', noSelect);
            $('#playerSpace2').attr('src', noSelect);
        }, 3000);
    }
  };

  var resetOption = function(){
    let b = $('<button>').addClass('btn btn-primary mx-auto d-block');
    $('#selector').html(b);
    $('.btn').text('New Game');
    $('.btn').attr('id', 'reset');
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
    $('#playerSpace1').attr('src', noSelect);
    $('#playerSpace2').attr('src', noSelect);
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
        compareGuess();;
    });

    $('.btn-sm').click(function(){
        let post = $('#chatter').val();
        let chatPlay = $('<strong>').text(me + ':');
        let chatter = $('<p>').text(post);
        let contain = $('<span>');
        $('.chat').append(contain);
        $('.chat').append(chatPlay);
        $('.chat').append(chatter);
    })
    //Reset Listener
    /*$('#reset').click(function(){
        console.log('Reset');
        location.reload();
    });*/