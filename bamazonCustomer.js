var inquirer = require("inquirer");
var mysql = require("mysql");
var Table = require("cli-table");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazon_db"
});

var table = new Table({
  head: ["Item Id", "Product Name", "Price"]
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  displayProducts();
});

function displayProducts() {
  connection.query("SELECT * FROM products", function(err, res, fields) {
    if (err) throw err;
    res.forEach(function(res) {
      table.push(
        [res.item_id, res.product_name, res.price]
      );
    });
    console.log(table.toString());
    start();
  });
};

function start() {
  inquirer
    .prompt({
      name: "ask",
      type: "list",
      message: "Would you like to purchase an item?",
      choices: ["YES", "NO"]
    })
    .then(function(answer) {
      if (answer.ask.toUpperCase() === "YES") {
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

