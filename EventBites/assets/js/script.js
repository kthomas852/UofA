//Peyton's Main JavaScript code merged with Kyle's API code 9/24/2018
//API call JS with CORS prepended
var keyTmaster = "IDzVz8X50eIWaGtAvc2BO8OSGBU9npNW";
var keyYelp = "Vqg1xCWqf2neA1vpx1waUksNlp7u4jpdOQPISGCODfXH2ntIrtNT9p8-BHWLidQuMFd1PlJB6wuBEedykLmYYCoOYMn_rRXV7YUWoZbnhemS23D4lenEdyTfWAyjW3Yx";
var locale = '';
//arrays to store Lat and Long of full events list by index
var latitude = [];
var longitude = [];

var eventTitle = 'Event Title';
var loc = '123 example ave';
var startingDay = '2-2-20';
var startingTime = '1:00AM - 9:00AM';

//Variables to store RESTERAUNT INFO data pulled from YELP API
var restName = '\'Nearby Restaurants\'';
var restLocation = '123 restaurant ave';
var startingDayYelp = '6:00AM';
var startingTimeYelp = '5 STARS';

//param objects
var yelpObj = {
  limit: 6,
  term: "food",
  location: '',
  radius: 500,
  latitude: 0,
  longitude: 0,
  sort_by: 'distance',
};

var tMasterObj = {
  keyword: '',
  city: '',
  stateCode: 'AZ',
  size: 10,
  apikey: keyTmaster
};

//urls for ticket master and Yelp APIs
var yelpurl = '';
var tMasterurl = '';

//guest login button
$('#guestLogin').on('click', function() {
    $('#loginPage').slideUp();
    $('#mainPage').slideDown();
});

//clear button
$('#clr').on('click', function() {
    $('#res').slideUp('medium');
    $('#food').slideUp('medium');
});

$('#search').on('click', function() {
  tMasterObj.keyword = $("#event").val();
  tMasterObj.city = $("#city").val();
  locale =$("#city").val();
  console.log('results for city ' + tMasterObj.city + ' & event ' + tMasterObj.keyword);
  console.log(tMasterObj);
  //ajax call for TicketMaster
  tMasterurl =
  "https://cors-anywhere.herokuapp.com/https://app.ticketmaster.com/discovery/v2/events.json?" +
  $.param(tMasterObj);
  $.ajax({
    url: tMasterurl,
    method: "GET",
    dataType: "json",
    success: function(data) {
      console.log("success: " + data);
    }
  }).then(function(response) {
    console.log(response);
    $('#table').html('');
    let go = response._embedded;
    if(go){
    for(var i = 0; i < go.events.length; i++) {
    eventTitle = go.events[i].name;
    startingDay = go.events[i].dates.start.localDate;
    startingTime = go.events[i].dates.start.localTime;
    loc = go.events[i]._embedded.venues[0].name;
    let latLoc = go.events[i]._embedded.venues[0].location.latitude;
    let longLoc = go.events[i]._embedded.venues[0].location.longitude;
    let ticketSales = go.events[i].url;
    //let ticket = go.events[0].url;
    //let ticketStatus = go.events[0].dates.status.code;
    latitude.push(parseFloat(latLoc));
    longitude.push(parseFloat(longLoc));
        //creates table row
        let tr = $('<tr>');

        //creates table elements with the EVENT INFO variables above as the text
        let event = $('<td>').text(eventTitle).attr('class', 'c tbkgnd text-dark');
        let address = $('<td>').text(loc).attr('class', 'c tbkgnd text-dark');
        let date = $('<td>').text(startingDay).attr('class', 'c tbkgnd text-dark');
        let time = $('<td>').text(startingTime).attr('class', 'c tbkgnd text-dark');

        //creates resteraunt search button
        let search = $('<td>')
            .css('background', 'white')
            .css('border', '1px solid black')
            .append($('<button>')
                .attr('id', 'searchResteraunts')
                .attr('class', 'btn btn-primary max')
                .attr('data-value', i)
                .text('Search Bites!'));

        //creates buy ticket button
        let link = $('<a>').attr('href', ticketSales).attr('target', '_blank');
        let buy = $('<td>')
            .css('background', 'white')
            .css('border', '1px solid black')
            .append($('<button>')
                .attr('id', 'buyTickets')
                .attr('class', 'btn btn-success max')
                .text('Buy Tickets!'));
        let buttonLink = link.append(buy);

        //append list of event info and buttons to table
        $('#table').append(tr, event, address, date, time, search, buttonLink);
      }
    } else {
      $('#table').append('<h2>No Events Available for this Search</h2>');
    };
      
      //displays the table
      $('#res').slideDown('fast');
  });
});

//WHEN 'SEARCH BITES' BUTTON IS CLICKED
$('body').on('click', '#searchResteraunts', function() {
  let locationIndex = $(this).attr('data-value');
  yelpObj.latitude = latitude[locationIndex];
  yelpObj.longitude = longitude[locationIndex];
  yelpObj.location = locale.toLowerCase();
  yelpurl =
  "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?" +
  $.param(yelpObj);
  console.log(yelpObj);
  //ajax call for Yelp returning restaurants
  $.ajax({
    url: yelpurl,
    headers: {
      Authorization: "Bearer " + keyYelp
    },
    method: "GET",
    dataType: "json",
    success: function(data) {
      console.log("success: " + data);
    }
  }).then(function(response) {
    console.log(response);
    //Variables to store RESTERAUNT INFO data pulled from YELP API
    $('#restTable').html('');
    if(response.businesses){
    for(var i = 0; i < response.businesses.length; i++) {
    restName = response.businesses[i].name;
    restLocation = response.businesses[i].location.display_address[0];
    startingDayYelp = response.businesses[i].is_closed;
    startingTimeYelp = response.businesses[i].rating;

        //creates table row
        let tr = $('<div>').attr('class', 'form-items');;

        //creates table elements with the EVENT INFO variables above as the text
        let name = $('<div>').text(restName).attr('class', 'col-3 py-3 c tbkgnd text-dark item-name d-inline-block');
        let address = $('<div>').text(restLocation).attr('class', 'col-3 py-3 c tbkgnd text-dark item-location d-inline-block');
        let date = $('<div>').text(startingDayYelp).attr('class', 'col-2 py-3 c tbkgnd text-dark item-open d-inline-block');
        let time = $('<div>').text(startingTimeYelp + ' Stars').attr('class', 'col-2 py-3 c tbkgnd text-dark item-rating d-inline-block');
        let save = $('<input>').attr('class', 'col-1 py-3 save-btn btn btn-primary d-inline-block').attr('type', 'submit').attr('value', 'Save');


        // creates mapping search button
        let map = $('<div>').attr('class', 'col-1 py-2 d-inline-block')
            .css('background', 'white')
            .css('border', '1px solid black')
            .css('height', '57px')
            .append($('<button>')
                .attr('class', 'btn py-2 my-0 btn-primary max')
                .text('Map'));


        //append list of resteraunt info and button to table
        tr.append(name, address, date, time, map, save);
        $('#restTable').append(tr);
    }
  }else{
    $('#restTable').append('<h2>No Resaults Returned for this Venue</h2>');
  };

    //displays the table
    $('#food').slideDown('fast');
  });
});
