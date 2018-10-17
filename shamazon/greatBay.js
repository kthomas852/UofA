var inquirer = require("inquirer");
var mysql = require("mysql");
var mysql = require('mysql');
var bids = [];
var searchFN = "SELECT Product_Name FROM price";

var connection = mysql.createConnection({
   host: "localhost",

   // Your port; if not 3306
   port: 3306,

   // Your username
   user: "root",

   // Your password
   password: "",
   database: "greatbaydb"
 });

 connection.connect(function(err) {
   if (err) throw err;
   console.log("connected as id " + connection.threadId + "\n");
   afterConnection();
 });

 function afterConnection() {
   connection.query(searchFN, function(err, res) {
     if (err) throw err;
     console.log(JSON.stringify(res[0].Product_Name));
     
     connection.end();
   });
 }

inquirer.prompt([
    {
    type: "list",
    message: "What would you like to do? ",
    choices: ["POST AN ITEM", "BID ON AN ITEM"],
    name: "action"
    },
]).then(function(response){
    if(response.action === "POST AN ITEM"){
        console.log("post");
    }else if(response.action === "BID ON AN ITEM"){
        inquirer.prompt([
            {
                type: "list",
                message: "These are the BIDs availible, please pick a BID: ",
                choices: bids,
                name: "bid"
            }
        ]).then(function(resp){
            inquirer.prompt({
                type: "input",
                message: "What is your bid? ",
                name: "myBid"
            }).then(function(res){
                if(parseInt(res.myBid)){
                    console.log(`Your bid of ${res.myBid} Wins!`);
                }else{
                    console.log("Thats not a real bid!!!!");
                }
            })
        })
    }
});