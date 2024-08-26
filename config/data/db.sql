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

-- Tạo bảng cart
CREATE TABLE cart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    uid INT NULL,
    FOREIGN KEY (uid) REFERENCES users(id)
);

-- Tạo bảng products
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    quantity INT NULL,
    name VARCHAR(255) NULL,
    price DECIMAL(10, 2) NULL, -- Thay varchar bằng decimal cho giá
    category_id INT NULL,
    img VARCHAR(255) null,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Tạo bảng cart_item
CREATE TABLE cart_item (
    id INT AUTO_INCREMENT PRIMARY KEY,
    uid INT NULL,
    cart_id INT NULL,
    FOREIGN KEY (uid) REFERENCES users(id),
    FOREIGN KEY (cart_id) REFERENCES cart(id),
    total INT DEFAULT 0
);

-- Tạo bảng wishlist
CREATE TABLE wishlist (
    id INT AUTO_INCREMENT PRIMARY KEY,
    uid INT NULL,
    product_id INT NULL,
    FOREIGN KEY (uid) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Tạo bảng orders
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    uid INT NULL,
    status INT DEFAULT 0,
    FOREIGN KEY (uid) REFERENCES users(id)
);

-- Tạo bảng order_item
CREATE TABLE order_item (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NULL,
    order_id INT NULL,
    quantity INT DEFAULT 1,
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (order_id) REFERENCES orders(id) -- Sửa từ order thành orders
);
