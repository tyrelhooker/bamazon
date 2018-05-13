DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price DECIMAL(10,2),
  stock_quantity INTEGER(10),
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Martin Guitar", "Musical Instruments", 1099.00, 21);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Dell Monitor", "Electronics", 299.99, 14);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Matterhorn: A Novel of the Vietnam War", "Books", 24.95, 112);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("The Way of Kings", "Books", 27.99, 35);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("this & Object Prototypes", "Books", 21.99, 84);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Washburn D333 Guitar", "Musical Instruments", 1200.00, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Apple Watch", "Electronics", 329.99, 414);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Field Notes Notebook", "Every Day Carry", 12.99, 66);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Grafton Pen", "Every Day Carry", 35.00, 11);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Blank Slates", "Programming Supplies", 100.00, 2);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Bananas", "Produce", 1.49, 500);

SELECT * FROM products;