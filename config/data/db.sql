CREATE DATABASE shopp;
USE  shopp;
CREATE TABLE users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    email varchar(255) null,
    name varchar(255) null,
    pass_word varchar(255) null
);

CREATE TABLE categories (
    id int PRIMARY KEY,
    name varchar(255) null
);

CREATE TABLE cart (
    id int AUTO_INCREMENT PRIMARY KEY,
    uid int NULL,
    FOREIGN KEY (uid) REFERENCES users(id)
);

CREATE TABLE products (
    id int AUTO_INCREMENT PRIMARY KEY,
    quantity int null,
    name varchar(255) null,
    price varchar(255) null,
    category_id int null ,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE images (
    id int AUTO_INCREMENT PRIMARY KEY,
    url varchar(255) null,
    product_id int null,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE cart_item (
    id int AUTO_INCREMENT PRIMARY KEY,
    uid int null,
    cart_id int null,
    FOREIGN KEY (uid) REFERENCES users(id),
    FOREIGN KEY (cart_id) REFERENCES cart(id)
);

CREATE TABLE wishlist (
    id int PRIMARY KEY,
    uid int null,
    product_id int null,
    FOREIGN KEY (uid) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);