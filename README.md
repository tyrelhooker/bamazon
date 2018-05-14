# bamazon

By: TJ Hooker    
Date: May 14, 2018

This is a Node.js and MySQL CLI store app. The app takes in orders from the customers and updates a database containing products for sale. 

The app uses 3 npms:

1. inquirer
2. MySql
3. cli-table

This git repository contains the seed file for easy re-creation of the database and DB values used in the app. 

To launch the app enter node bamazonCustomer.js in the terminal. The app immediately asks if the customer would like to purchase a product. If the customer selects YES then the app displays a table containing the products available to purchase (the displayed table does not contain all of the table values). 

![gif1](https://github.com/tyrelhooker/bamazon/blob/master/gifs/gif1.gif)

The customer selects which item they would like to purchase by the item's item id and then the amount of the item they would like to purchase. Upon making these two selections, the app compares the item_id selection with the DB table item id, grabs the row of values, and then compares the user desired quantity to purchase against the stock quantity. If the stock quantity is less than the user quantity, the customer is notified of insufficient inventory and the customer is asked to choose an item again. 

![gif2](https://github.com/tyrelhooker/bamazon/blob/master/gifs/gif2.gif)

Upon choosing an item and quantity in stock, the app ships the item to the customer and notifies the customer of his/her total. The app the asks if the customer would like to make another purchase. Selecting yes, brings up the products again. Selecting no, closes the connection to the server. 

![gif3](https://github.com/tyrelhooker/bamazon/blob/master/gifs/gif3.gif)