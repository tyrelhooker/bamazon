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
        purchaseProduct();
      }
      else {
        console.log("You are missing out on some great products!");
      }
    });
}

function purchaseProduct() {
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
      connection.query(
        "SELECT * FROM products", 
        function(err, res) {
          if (err) throw err;
          console.log(answer.productChoice);
          console.log(answer.productAmt);
          var chosenItem;
          var custProd = parseInt(answer.productChoice);
          var custProdAmt = parseInt(answer.productAmt);
          // for (var i = 0; i < res.length; i++) {
          //   if (res[i].item_id === custProd) {
          //     chosenItem = res[i];
          //     console.log(chosenItem);
          //   }
          // }
          res.forEach(function(res) {
            // console.log(res);
            if (res.item_id === custProd) {
              chosenItem = res;
              console.log("Chosen item check in loop: " + chosenItem);
            }
          });
          console.log("Chosen item check out loop:\n" + chosenItem);
          console.log(chosenItem.stock_quantity);

          if (chosenItem.stock_quantity < custProdAmt) {
            console.log("We are currently sold out of this item. Please select another item");
          }
          else {
            console.log("We are shipping " + custProdAmt + " " + chosenItem.product_name + " to you!");
            updateProductQuantity();
            // var updateStock = parseInt(chosenItem.stock_quantity) - custProdAmt;
            // // updateStock = parseInt(updateStock);
            // console.log(updateStock);

          //  connection.query(
          //     "UPDATE products SET ? WHERE ?",
          //     [
          //       {
          //         stock_quantity: updateStock
          //       },
          //       {
          //         item_id: chosenItem.id
          //       }
          //     ],
          //     function(err, res) {
          //       if (err) throw err;
          //       console.log(res.affectedRows + " products updated!")
          //     }
          //   );
          //   console.log("The stock was updated: " + chosenItem.stock_quantity);
          }
        }
      );
    });
}

function updateProductQuantity() {
  var updateStock = parseInt(chosenItem.stock_quantity) - custProdAmt;
  updateStock = parseInt(updateStock);
  console.log(updateStock);

 connection.query(
    "UPDATE products SET ? WHERE ?",
    [
      {
        stock_quantity: "updateStock"
      },
      {
        item_id: "chosenItem.id"
      }
    ],
    function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " products updated!")
    }
  );
  console.log("The stock was updated: " + chosenItem.stock_quantity);
}

