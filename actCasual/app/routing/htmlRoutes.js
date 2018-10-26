var express = require('express');
//HTML Router
var app = express();
app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "/../public/home.html"));
});
//GET route /servey
app.get("/survey", function(req, res){
    res.sendFile(path.join(__dirname, "/../public/survey.html"));
});
//catch all route that leads back to home.html