var express = require('express');
var bodyParser = require('body-parser');
// may not need ALL these requires

var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

require("./app/routing/htmlRoutes")(app);
require("./app/routing/apiRoutes")(app);
var friends = require('./app/data/friends.js');
console.log(friends.members);
app.listen(PORT, function(){
    console.log("ActCasual now Listening on PORT " + PORT);
});