var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazon_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  start();
});

function start() {
  inquirer
    .prompt({
      name: "ask",
      type: "rawlist",
      message: "Would you like to purchase an item?",
      choices: ["YES", "NO"]
    })
    .then(function(answer) {
      if (answer.ask.toUpperCase() === "YES") {
        purchaseProduct();
      }
      else {
        console.log("You are missing out on some great products!");

      }
    })
}

function purchaseProduct() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.log(res);
    connection.end();
  });
}

function readProducts() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.log(res);
  });
}