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
connection.connect();
connection.query('SELECT * FROM products', function(err, results){
    if(err) throw err;
    stock = results;
});

var products = function(){
        let prods = [];
        for(i=0; i<stock.length; i++){
            prods.push(stock[i].item_id+' '+stock[i].product_name);
        }
        inquirer.prompt([
            {
                type: 'list',
                message: 'Select your product:',
                choices: prods,
                name: 'needs'
            }]).then(function(res){
                let index = parseInt(res.needs[0]);
                console.log(`
ID #         ${stock[index].item_id}
Product:     ${stock[index].product_name}
Department:  ${stock[index].department_name}
Price:      $${stock[index].price}
In-Stock:    ${stock[index].stock_quantity}`);
            });
    setTimeout(() => {
        inquirer.prompt([
            {
                type: 'confirm',
                message: 'Would you like to look at another product?',
                name: 'con'
            }
        ]).then(function(res){
            if(res){
                products();
            }else{
                manager();
            }
        });
    }, 2000);
};

var lowInven = function(){
        for(i=0; i<stock.length; i++){
            if(stock[i].stock_quantity < 3){
                console.log(`ID# ${stock[i].item_id}    item: ${stock[i].product_name}     Stock available: ${stock[i].stock_quantity}`)
            }
        }
        setTimeout(() => {
            manager();
        }, 2000);
};

var addInven = function(){
    console.log('Which Product would you like to add more of?')
    let prods = [];
    for(i=0; i<stock.length; i++){
        prods.push(stock[i].item_id+' '+stock[i].product_name+' '+stock[i].stock_quantity);
    }
    inquirer.prompt([
        {
            type: 'list',
            message: 'Select your product:',
            choices: prods,
            name: 'needs'
        },
        {
            type: 'input',
            message: 'How many more would you like to add?',
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
        }]).then(function(res){
            let index = res.needs[0];
            let adder = res.num;
            let updated = 0;
            connection.query('SELECT stock_quantity FROM products', function(err, sto){
                if(err) throw err;
                updated = parseInt(sto[index]) + parseInt(adder);
            })
            connection.query('UPDATE products SET ? WHERE ?', [
                {stock_quantity: updated},
                {item_id: index},
            ], function(err, res){
                if(err) throw err;
                inquirer.prompt([
                    {
                        type: 'confirm',
                        message: 'Would you like to add stock to another product?',
                        name: 'ans'
                    }
                ]).then(function(res){
                    if(res){
                        setTimeout(() => {
                            console.log('Updates made, be ready to choose your next product for update...')
                            addInven();
                        }, 2000);
                    }else{
                        console.log('Thank you for updating!');
                        setTimeout(() => {
                            manager();
                        }, 2000);
                    }
                });
            });
            
        });
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
            connection.query('INSERT INTO products (product_name, department_name, price, stock_quantity) VALUE (',res.dis,', ',res.cat,', ',res.pri,', ',res.quant,')', function(error, results, field){
                if(error) throw error;
                console.log(res.dis, " has been added");
            })
        });
};

function end(){
    console.log('Thank you for shopping Shamazon!')
    connection.end();
};

//Inquirer prompts for Shamazon
function manager(){
inquirer.prompt([
    {
        type: 'list',
        message: `          Welcome to Shamazon!
=======================================================
`,
        choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product', 'Exit'],
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
        case 'Exit':
            end();
            break;
    }
})
}

manager();