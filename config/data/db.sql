-- Xóa cơ sở dữ liệu nếu nó tồn tại
DROP DATABASE IF EXISTS shopp;

-- Tạo cơ sở dữ liệu mới
CREATE DATABASE shopp;

-- Chọn cơ sở dữ liệu để sử dụng
USE shopp;

-- Tạo bảng users
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NULL,
    name VARCHAR(255) NULL,
    pass_word VARCHAR(255) NULL,
    role INT NULL DEFAULT 0
);

-- Tạo bảng categories
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NULL,
    img VARCHAR(255) null

);


CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    quantity INT NULL,
    name VARCHAR(255) NULL,
    price DECIMAL(10, 2) NULL, 
    category_id INT NULL,
    img VARCHAR(255) null,
    description TEXT null,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE cart_item (
    id INT AUTO_INCREMENT PRIMARY KEY,
    uid INT NULL,
    FOREIGN KEY (uid) REFERENCES users(id),
    product_id INT NULL,
    FOREIGN KEY (product_id) REFERENCES products(id),
    quantity INT DEFAULT 1,
);

CREATE TABLE wishlist (
    id INT AUTO_INCREMENT PRIMARY KEY,
    uid INT NULL,
    product_id INT NULL,
    FOREIGN KEY (uid) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    uid INT NULL,
    status INT DEFAULT 0,
    FOREIGN KEY (uid) REFERENCES users(id),
    phone TEXT NULL,
    nameuser varchar(255) null,
    address varchar(255) null,
    total INT null
);

CREATE TABLE order_item (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NULL,
    order_id INT NULL,
    quantity INT DEFAULT 1,
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (order_id) REFERENCES orders(id) -- Sửa từ order thành orders
);

CREATE TABLE blogs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title text null,
    time varchar(255) null
)