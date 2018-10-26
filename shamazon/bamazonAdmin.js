var mysql = require('mysql');
var inquirer = require('inquirer');
var stock = '';
var departments = [];

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'bamazon',
});
connection.connect();
connection.query('SELECT * FROM products', function(err, results){
    if(err) throw err;
    stock = results;
});