//require("dotenv").config();
//var spotify = new Spotify(keys.spotify);
//var spotAPI = require('node-spotify-api');
var request = require('request');
var omdbAPI = "http://www.omdbapi.com/?apikey=trilogy&";
var bitAPI = "https://rest.bandsintown.com/artists/";

//Handling of user input to verify and prep
var rawIn = process.argv;
console.log(rawIn.length);
var userIn = process.argv.slice(3).join('+');;

switch (rawIn[2]) {
    case "concert-this":
        var queryUrl = bitAPI + userIn + "/events?app_id=codingbootcamp";
        console.log(queryUrl);

        request(queryUrl, function (err, response, body) {
            if (!err && response.statusCode === 200) {
                console.log(JSON.parse(body)[0].venue.name);
                console.log("Country: "+JSON.parse(body)[0].venue.country+"  City: "+JSON.parse(body)[0].venue.city);
                console.log("Date of Event: "+JSON.parse(body)[0].datetime);
                //Rock a liitle moment JS to kick back a legit date/time
            }else{
                console.log("ERROR Hagen: " + response.statusCode);
            }
        });
        break;
    case "spotify-this-song":

        break;
    case "movie-this":
        var queryUrl = omdbAPI + userIn;
        console.log(queryUrl);

        request(queryUrl, function (err, response, body) {
            if (!err && response.statusCode === 200) {
                console.log(JSON.parse(body)/*ext for data*/);
            }else{
                console.log("ERROR Hagen: " + response.statusCode);
            }
        });
        break;
    case "do-what-it-says":
        //reads txt file and executes that
        break;
    default:
        console.log('Liri does not recognize this command.  Please use one of the following:')
        console.log('`concert-this`');
        console.log('`spotify-this-song`');
        console.log('`movie-this`');
        console.log('`do-what-it-says`');
        break;
}

