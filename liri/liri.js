var Spotify = require('node-spotify-api');
var request = require('request');
var omdbAPI = "http://www.omdbapi.com/?apikey=trilogy&";
var bitAPI = "";

//Handling of user input to verify and prep
var rawIn = process.argv;
var userIn = '';
for(i = 2; i < rawIn.length; i++){
    if(i>rawIn[i] && i<rawIn.length){
        userIn = userIn + '+' + rawIn[i];
    }
};
console.log(userIn);

var queryUrl = API + userIn;
console.log(queryUrl);

request(queryUrl, function(err, response, body){
    if(!err && response.statusCode === 200){
        console.log(JSON.parse(body)/*ext for data*/);
    }
});