require("dotenv").config();
var keys = require('./keys.js');
var fs = require('file-system');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var request = require('request');
var omdbAPI = "http://www.omdbapi.com/?apikey=trilogy&t=";
var bitAPI = "https://rest.bandsintown.com/artists/";

//Handling of user input to verify and prep
var rawIn = process.argv;
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
        spotify.search({ type: 'track', query: userIn + "&limit=1&" }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }

            console.log("\nSong Title : " + data.tracks.items[0].name);
            console.log("\nArtist : " + data.tracks.items[0].artists[0].name);
            console.log("\nAlbum : " + data.tracks.items[0].album.name);
            console.log("\nCheck it out on Spotify" + "\n" + data.tracks.items[0].album.external_urls.spotify);
        });
        break;
    case "movie-this":
        var queryUrl = omdbAPI + userIn;
        console.log(queryUrl);

        request(queryUrl, function (err, response, body) {
            if (!err && response.statusCode === 200) {
                let res = JSON.parse(body);
                console.log("Title: "+res.Title+"\n"+
                            "Year: "+res.Year+"\n"+
                            "Rated: "+res.Rated+"\n"+
                            "Tomato Rating: "+res.Ratings[1].Value+"\n"+
                            "Country of Production: "+res.Country+"\n"+
                            "Language: "+res.Language+"\n"+
                            "Plot: "+res.Plot+"\n"+
                            "Actors: "+res.Actors);
            }else{
                console.log("ERROR Hagen: " + response.statusCode);
            }
        });
        break;
    case "do-what-it-says":
        fs.readFile("random.txt", "utf8", function(error, data){
            if(error){
                console.log("There was and error, and it's all your fault!");
            }else{
                let random = data.split(',');
                spotify.search({ type: 'track', query: random[1] + "&limit=1&" }, function (err, data) {
                    if (err) {
                        return console.log('Error occurred: ' + err);
                    }
                    console.log("\nSong Title : " + data.tracks.items[0].name);
                    console.log("\nArtist : " + data.tracks.items[0].artists[0].name);
                    console.log("\nAlbum : " + data.tracks.items[0].album.name);
                    console.log("\nCheck it out on Spotify" + "\n" + data.tracks.items[0].album.external_urls.spotify);
                });
            };
        })
        //reads txt file and executes that
        break;
    default:
        console.log('Liri does not recognize this command.  Please use one of the following:\n'+
                    '`concert-this`\n'+
                    '`spotify-this-song`\n'+
                    '`movie-this`\n'+
                    '`do-what-it-says`\n');
        break;
}

