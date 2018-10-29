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
};
//catch all route that leads back to home.html