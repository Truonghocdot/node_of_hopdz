const multer = require('multer');
const path = require('path');
const pool = require("../../config/data/connect.js");

class dashboardController {
    index(req, res, next) {
        return res.render("admin/home");
    }

    async categories(req, res, next) {
        try {
            const query = req.query.name
                ? 'SELECT * FROM categories WHERE name = ?'
                : 'SELECT * FROM categories';
            const [categories] = await pool.promise().query(query, [req.query.name]);
            return res.render("admin/categories", { categories });
        } catch (err) {
            next(err);
        }
    }

    async add_category(req, res, next) {
        try {
            const { name } = req.body;
            const query = "INSERT INTO categories (name) VALUES (?)";
            await pool.promise().query(query, [name]);
            return res.redirect("/admin/categories");
        } catch (err) {
            return res.redirect('back');
        }
    }

    async delete_category(req, res, next) {
        try {
            const { id } = req.body;
            const query = "DELETE FROM categories WHERE id = ?";
            await pool.promise().query(query, [id]);
            return res.redirect("/admin/categories");
        } catch (err) {
            return res.redirect('back');
        }
    }

    async edit_category(req, res, next) {
        try {
            const { id, name } = req.body;
            const query = "UPDATE categories SET name = ? WHERE id = ?";
            await pool.promise().query(query, [name, id]);
            return res.redirect("/admin/categories");
        } catch (err) {
            return res.redirect('back');
        }
    }

    async products(req, res, next) {
        try {
            const productQuery = req.query.name
                ? 'SELECT * FROM products WHERE name = ?'
                : 'SELECT * FROM products';
            const categoryQuery = 'SELECT * FROM categories';
            const [products, categories] = await Promise.all([
                pool.promise().query(productQuery, [req.query.name]),
                pool.promise().query(categoryQuery)
            ]);
            res.render('admin/products', { products: products[0], categories: categories[0] });
        } catch (err) {
            next(err);
        }
    }

    async add_product(req, res, next) {
        try {
            const { name, price, count, category_id } = req.body;
            const img = req.file ? req.file.filename : null;
            const query = "INSERT INTO products (name, price, quantity, category_id, img) VALUES (?, ?, ?, ?, ?)";
            await pool.promise().query(query, [name, price, count, category_id, img]);
            return res.redirect("/admin/products");
        } catch (err) {
            return res.redirect('back');
        }
    }

    async delete_product(req, res, next) {
        try {
            const { id } = req.body;
            const query = "DELETE FROM products WHERE id = ?";
            await pool.promise().query(query, [id]);
            return res.redirect("/admin/products");
        } catch (err) {
            return res.redirect('back');
        }
    }

    async edit_product(req, res, next) {
        try {
            const { id, name, price, count, category_id } = req.body;
            const img = req.file ? req.file.filename : null;

            let query = "UPDATE products SET name = ?, price = ?, quantity = ?, category_id = ?";
            const params = [name, price, count, category_id];

            if (img) {
                query += ", img = ?";
                params.push(img);
            }

            query += " WHERE id = ?";
            params.push(id);

            await pool.promise().query(query, params);

            return res.redirect("/admin/products");
        } catch (err) {
            return res.redirect('back');
        }
    }

    blogs(req, res, next) {
        res.render('admin/blogs');
    }

    orders(req, res, next) {
        res.render('admin/orders');
    }

    storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'public/uploads/'); // Thư mục lưu trữ file
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + path.extname(file.originalname)); // Đặt lại tên file
        }
    });

    upload = multer({ storage: this.storage });
}

module.exports = new dashboardController();
