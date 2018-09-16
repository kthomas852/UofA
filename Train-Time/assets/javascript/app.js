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
    let then = 2;
    let result = 0;
    let upper = 0;
    row.append($('<th>').text(snap.name));
    row.append($('<th>').text(snap.destination));
    row.append($('<th>').text(snap.frequency));
    console.log("line" + snap.frequency + " , " + snap.firstTrain + ' , ' + now);
    //Math for future trains and min left
    upper = (parseInt(moment(snap.firstTrain, 'HHmm').format('mm')) + (parseInt(snap.frequency) % 60));
    console.log('Mod ' + (upper % 60));
    console.log('upper ' + (Math.floor((upper/60)) * 100));
    console.log('hour add ' + Math.floor(((parseInt(snap.frequency) * 7)/60))*100);
    console.log('first train hours ' + parseInt(moment(snap.firstTrain, 'HHmm').format('HH')) * 100);
    for(i=0; then > 1; i++){
      result = parseInt(moment(snap.firstTrain, 'HHmm').format('HH') * 100) + Math.floor(((parseInt(snap.frequency) * i)/60))*100 + (Math.floor((upper/60)) * 100) + (upper % 60);
      then = parseInt(moment(now, "X").format('HHmm'))/result;
    };
    console.log(result + ' , ' + moment(now, 'X').format("HHmm"));
    let time1 = (parseInt(moment(now, "X").format("HH")) * 60) + parseInt(moment(now, "X").format('mm'));
    let time2 = (parseInt(moment(result, "HHmm").format('HH')) * 60) + parseInt(moment(result, "HHmm").format('mm'))
    //appending next train and time left
    row.append($('<th>').text(moment(result, "HHmm").format('HH:mm')));
    row.append($('<th>').text(time2 - time1));
    $('#trainDisplay').append(row);
    console.log('Train On Time ');
  });
  
  var clock = function(){
    now = moment().format('X');
    $('#clockDisplay').html($('<h4>').text("The Current Time is: " + moment(now, 'X').format("HH:mm")));
  };
  //Set the time for the clock
  clock();

setInterval(function(){clock()}, 10000);