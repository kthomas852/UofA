# WELCOME TO SHAMAZON!

### OVERVIEW

This site allows you to buy and sell items.  Item information is stored in a MySQL database and accessed by three operational JavaScript pages; `bamazonCustomer.js`, `bamazonManager.js` and `bamazonAdmin.js`.  These pages require an NPM install before operation.  

### Function Details


* `bamazonCustomer.js`
This page allows a customer to access the database and see what products are available for sale.  A customer can then choose a product and make a purchase of X items of their choice.  The data base will update after the purchase so that future customers will see updated data.  Promts are validated and will reject answers that do not make sense for the prompt.


* `bamazonManager.js`
This page allows a manager to see details of products available, see stock that is marked as LOW, replenish low stock and add new products.  These prompts are also validated and will reject answers that do not make sense fot the prompt.


* `bamazonAdmin`
This page allows for updates to the database such as adding departments to the list available for new products.


**Enjoy Shopping Shamazon**