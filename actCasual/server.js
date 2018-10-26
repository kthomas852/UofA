var html = require('html');
var express = require('express');
var path = require('path');
var fs = require('fs');
// may not need ALL these requires

var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());



app.listen(PORT, function(){
    console.log("ActCasual now Listening on PORT " + PORT);
});