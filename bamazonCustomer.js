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

// Starts connection to DB
connection.connect(function(err) {
  if (err) throw err;
  start();
});

// Prompts user to purchase products
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

// Creates CLI Table with DB values
function displayProducts() {
  var table = new Table({
    head: ["Item Id", "Product Name", "Price"]
  });
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
};

// Takes two user purchase inputs and compares the input to the DB stock.
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
        // Creates variables with the answers from user input
        var chosenItem;
        var custProd = parseInt(answer.productChoice);
        var custProdAmt = parseInt(answer.productAmt);

        res.forEach(function(res) {
          // console.log(res);
          if (res.item_id === custProd) {
            chosenItem = res;
          }
        });
        // Compares chosen product amt with DB stock values
        if (chosenItem.stock_quantity < custProdAmt) {
          console.log("We are currently sold out of this item. We currently only have " + chosenItem.stock_quantity + " in stock. Please select another item");
          purchaseProduct();
        }
        else {
          // Variable holds the total amount of user's purchase
          var total = chosenItem.price * custProdAmt;
          console.log("\nThank you for your purchase. We are shipping " + custProdAmt + " " + chosenItem.product_name + " to you!\n");
          console.log("\nYour total cost is: " + total + "\n");
          // Creates variable to pass into updateStock()
          var updateStock = parseInt(chosenItem.stock_quantity) - custProdAmt;
          updateStock(updateStock, custProd); 
        }
      }
    );
  });
}
// Updates the stock in DB after user purchase
function updateStock(updateStock, custProd) {
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
// Prompts user for another purchase.
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

