// Required Dependancies
var mysql = require("mysql");
var inquirer = require("inquirer");
//require("console.table");

// Configuring our connection to our database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazon"
});

// Connecting to our database
connection.connect();

function supervisor() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: "What would you like to do?",
        choices: ["View Product Sales by Department", "Create New Department", "Exit"]
      }
    ])
    .then(function(val) {
      if (val.choice === "View Product Sales by Department") {
        viewSales();
      }
      else if (val.choice === "Create New Department") {
        addDepartment();
      }
      else {
        console.log("Goodbye!");
        process.exit(0);
      }
    });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the name of the department?"
      },
      {
        type: "input",
        name: "overhead",
        message: "What is the overhead cost of the department?",
        validate: function(val) {
          return val > 0;
        }
      }
    ])
    .then(function(val) {
      connection.query(
        "INSERT INTO departments (department_name, over_head_costs) VALUES (?, ?)",[
         val.name, 
         val.overhead
        ], function(err) {
          if (err) throw err;
          console.log("ADDED DEPARTMENT!");
          makeTable();
        }
      );
    });
}

function viewSales() {
  connection.query(
    "SELECT * FROM departments",
    function(err, res) {
      console.table(res);
      supervisor();
    }
  );
}
supervisor()