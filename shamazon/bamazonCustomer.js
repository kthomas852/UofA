//Bamazon customer App
var mysql = require('mysql');
var inquirer = require('inquirer');
var items = [];
var stock = '';
var buying = '';
var chosenProduct = '';

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'bamazon', 
});

//connection
connection.connect();

    //Process for prompts and sale selection
function sale(){
connection.query('SELECT * FROM products', function(err, results, fields){
    if(err) throw err;
    for(i=0; i<results.length; i++){
        items.push(results[i].item_id + ' ID#' +' '+results[i].product_name +' $'+results[i].price);
    }
console.log(`             Welcome to Shamazon!!!
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
Please make your selection:

`);
stock = results;
inquirer.prompt([
    {
        type: 'list',
        message: 'Select your product by ID:',
        choices: items,
        name: 'id'
    },
     {
        type: 'input',
        message: 'How many would you like?',
        name: 'num',
        validate: function(value) {
            if (isNaN(value) === false && value > 0) {
              return true;
            }
            console.log(
              "\nPlease enter a Number or a Value Greater Than Zero."
            );
            return false;
          }
        }
    ]).then(function(response){
        buying = response.num;
        chosenProduct = response.id[0];
        if(parseInt(stock[parseInt(response.id[0])].stock_quantity)>response.num){
            console.log(`================================================================
    Purchase information:
    item: ${stock[parseInt(chosenProduct) - 1].product_name}
    Quantity: ${buying}
    Price: $${(parseInt(buying))*parseInt(stock[parseInt(response.id[0])-1].price)}`)
            inquirer.prompt([
                {
                    type: 'confirm',
                    message: 'Does this look correct?',
                    name: 'conf'
                }
            ]).then(function(res){
                if(res.conf){
                    console.log('Your purchase has been confirmed!');
                    updateStock();
                }else{
                    sale();
                };
            })
        }else{
            console.log('Sorry, we do not have enough stock in that item.');
            setTimeout(() => {
                sale();
            }, 2000); 
        };
    });
});
};

    //Updates stock quantities after purchase
function updateStock(){
    let temp = (parseInt(stock[parseInt(chosenProduct) - 1].stock_quantity) - parseInt(buying));
connection.query('UPDATE products SET ? WHERE ?',[
    {stock_quantity: temp},
    {item_id: chosenProduct}
], function(err, res){
    if(err) throw err;
    setTimeout(() => {
        endStockCheck();
    }, 2000);
});
};

    //Cycles back through inventory and checks for updates
function endStockCheck(){
connection.query('SELECT * FROM products', function(err, res){
    for(i=0; i<res.length; i++){
    console.log(`Product: ${res[i].product_name}  available: ${res[i].stock_quantity}`);
    }
    connection.end();
});
};

    //Main program
//======================================
sale();