var path = require('path');

module.exports = function(app){
app.get("/", function(req, res){
    console.log(__dirname, "/../public/home.html");
    res.sendFile(path.join(__dirname, "/../public/home.html"));
});
//GET route /servey
app.get("/survey", function(req, res){
    res.sendFile(path.join(__dirname, "/../public/survey.html"));
});
//GET route for Match after survey submit
app.get("/match", function(req, res){
    console.log(__dirname, "/../public/match.html");
    res.sendFile(path.join(__dirname, "/../public/match.html"));
});
};
//catch all route that leads back to home.html