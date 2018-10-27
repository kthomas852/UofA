DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products(
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50) NULL,
    department_name VARCHAR(50) NULL,
    price DECIMAL(10,2) NULL,
    stock_quantity INT NULL,
    PRIMARY KEY (item_id)
);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("Laptop Charger", "electronics", 19.95, 8);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("Laptop", "electronics", 985.00, 4); 
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("Dog Lifevest", "pets", 34.75, 5);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("Handmade leather belt", "apparel", 10.00, 16);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("food bowl", "pets", 14.00, 8);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("fake flowers", "in trouble", 30.00, 7);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("assorted chocolates", "in trouble", 24.00, 9);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("bicycle", "sports", 400.00, 2);