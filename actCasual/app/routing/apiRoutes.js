var friends = require('../data/friends');
//API Routes
//GET Route with the url /api/friends.  Displays JSON of possible friends
module.exports = function(app){
app.get("/api/friends", function(req, res) {
    return res.json(friends);
});

app.get("/api/friends/:friend", function(req, res) {
    var chosen = req.params.friend;

    console.log(chosen);

    for (var i = 0; i < friends.length; i++) {
        if (chosen === friends[i].name) {
        return res.json(friends[i]);
        }
    }

    return res.json(false);
    });

app.post("/api/friends", function(req, res){
    let post = req.body;
    console.log(post);
    friends.push(post);
    res.json(post);
})
};
//POST Route with the url /api/friends handles incoming surveys
//This route will also handle the compatibility logic
