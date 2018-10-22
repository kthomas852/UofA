var mysql = require('mysql');
var inquirer = require('inquirer');
var stock = '';

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'bamazon',
});

var products = function(){
    connection.connect();

    connection.query('SELECT * FROM products', function(err, results){
        if(err) throw err;
        stock = results;
        let prods = [];
        for(i=0; i<results.length; i++){
            prods.push(results[i].item_id+' '+results[i].product_name);
        }
        inquirer.prompt([
            {
                type: 'list',
                message: 'Select your product:',
                choices: prods,
                name: 'needs'
            }]).then(function(res){
                console.log(parseInt(res[0]));
                console.log(stock);
            });
    });

    connection.end();
};

var lowInven = function(){
    connection.connect();
    connection.query(`SELECT * FROM products`, function(err, res){
        if(err) throw err;
        for(i=0; i<res.length; i++){
            if(res[i].stock_quantity < 3){
                console.log(`ID# ${res[i].item_id}    item: ${res[i].product_name}     Stock available: ${res[i].stock_quantity}`)
            }
        }
        setTimeout(() => {
            connection.end(manager);
        }, 2000);
    });
};

var addInven = function(){

};

var addProduct = function(){
        inquirer.prompt([
            {
                type: 'input',
                message: 'Item Discription',
                name: 'dis'
            },
            {
                type: 'input',
                message: 'category',
                name: 'cat'
            },
            {
                type: 'input',
                message: 'Price',
                name: 'pri'
            },
            {
                type: 'input',
                message: 'Initial Quantity',
                name: 'quant'
            }
        ]).then(function(res){
            connection.connect();
            connection.query('INSERT INTO products (product_name, department_name, price, stock_quantity) VALUE (',res.dis,', ',res.cat,', ',res.pri,', ',res.quant,')', function(error, results, field){
                if(error) throw error;
                //console.log(res.dis, " has been added");
            })
        });
};

//Inquirer prompts for Shamazon
function manager(){
inquirer.prompt([
    {
        type: 'list',
        message: `          Welcome to Shamazon!
=======================================================
`,
        choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product'],
        name: 'menu'
    },
]).then(function(response){
    switch (response.menu) {
        case 'View Products for Sale':
            products();
            break;
        case 'View Low Inventory':
            lowInven();
            break;
        case 'Add to Inventory':
            addInven();
            break;
        case 'Add New Product':
            addProduct();
            break;
    }
})
}

manager();


// connection.connect();

// connection.query('SELECT * FROM products', function(err, results, fields){
//     if(err) throw err;
//     console.log('solution ', results[0]);
//     console.log(results.length);
// });

// connection.end();