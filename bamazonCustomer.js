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
  start();
});

function start() {
  inquirer
    .prompt({
      name: "ask",
      type: "list",
      message: "Welcome to Bamazon! Would you like to purchase an item?",
      choices: ["YES", "NO"]
    })
    .then(function(answer) {
      if (answer.ask.toUpperCase() === "YES") {
      displayProducts();
      }
      else {
        console.log("You are missing out on some great products!");
      }
    });
}

function displayProducts() {
  var query = connection.query("SELECT * FROM products", function(err, res){
    if (err) throw err;
    res.forEach(function(res) {
      table.push(
        [res.item_id, res.product_name, res.price]
      );
    });
    console.log(table.toString());
    purchaseProduct();
  });
  console.log(query.sql);
};

function purchaseProduct() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "productChoice",
          type: "input",
          message: "Please enter the product id of the product you would like to purchase: "
        },
        {
          name: "productAmt",
          type: "input",
          message: "How many of units of the product would you like?"
        }
      ])
      .then(function(answer){
        // console.log(answer.productChoice);
        // console.log(answer.productAmt);
        
        var chosenItem;
        var custProd = parseInt(answer.productChoice);
        var custProdAmt = parseInt(answer.productAmt);

        res.forEach(function(res) {
          // console.log(res);
          if (res.item_id === custProd) {
            chosenItem = res;
          }
        });
        // console.log(chosenItem.stock_quantity);

        if (chosenItem.stock_quantity < custProdAmt) {
          console.log("We are currently sold out of this item. We currently only have " + chosenItem.stock_quantity + " in stock. Please select another item");
          purchaseProduct();
        }
        else {
          var total = chosenItem.price * custProdAmt;

          console.log("\nThank you for your purchase. We are shipping " + custProdAmt + " " + chosenItem.product_name + " to you!\n");
          console.log("\nYour total cost is: " + total + "\n");

          var updateStock = parseInt(chosenItem.stock_quantity) - custProdAmt;
          // console.log(updateStock);
          updateProductQuantity(updateStock, custProd); 
        }
      }
    );
  });
}

function updateProductQuantity(updateStock, custProd) {
  connection.query(
    "UPDATE products SET ? WHERE ?",
    [
      {
        stock_quantity: updateStock
      },
      {
        item_id: custProd
      }
    ],
    function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " products updated!\n\n");
      anotherPurchase();
    }
  );
}

function anotherPurchase() {
  inquirer
    .prompt({
      name: "reask",
      type: "list",
      message: "Would you like to make another purchase an item?",
      choices: ["YES", "NO"]
    })
    .then(function(answer) {
      if (answer.ask.toUpperCase() === "YES") {
      displayProducts();
      }
      else {
        console.log("Thank you for your purchase. We appreciate your business");
      }
    });
}

