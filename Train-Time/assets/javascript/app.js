/*This is thre JavaScript for the Train-Time App*/
//FireBase setup and call
 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyBt5WUc8hnuzxgv9cBpb752CwGXhkLGic8",
    authDomain: "traintime-1861d.firebaseapp.com",
    databaseURL: "https://traintime-1861d.firebaseio.com",
    projectId: "traintime-1861d",
    storageBucket: "traintime-1861d.appspot.com",
    messagingSenderId: "1071929738063"
  };
  firebase.initializeApp(config);
  var tdb = firebase.database();
  var now = 0;
  //Submits new train information
  $('#submit').click(function(){
    let name = $('#tName').val();
    let dest = $('#destination').val();
    let first = $('#startTime').val();
    let freq = $('#frequency').val();
    console.log('Trains Set');
    $('#tName').val('');
    $('#destination').val('');
    $('#startTime').val('');
    $('#frequency').val('');
    tdb.ref('/trains').push({
      name: name,
      destination: dest,
      firstTrain: first,
      frequency: freq
    })
  });
  //Adds trains to the DOM as things are updated
  tdb.ref('/trains').on('child_added', function (snapshot, prevChildKey) {
    let snap = snapshot.val();
    let row = $('<tr>');
    let then = 0;
    row.append($('<th>').text(snap.name));
    row.append($('<th>').text(snap.destination));
    row.append($('<th>').text(snap.frequency));
    for(i=0; then < 1; i++){
      then = 2;//(blows up)parseInt(now)/(parseInt(snap.firstTrain) + (parseInt(snap.frequency) * i));
      console.log('in loop: ' + then);
    };
    console.log(then);
    then = then * snap.frequency;
    row.append($('<th>').text(then));
    row.append($('<th>').text(then-now));
    $('#trainDisplay').append(row);
    console.log('Train On Time');
  });
  
  var clock = function(){
    now = moment().format('HH:mm');
    $('#clockDisplay').html($('<h4>').text("The Current Time is: " + now));
  };
  //Set the time for the clock
  clock();

setInterval(function(){clock()}, 10000);