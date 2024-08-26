const pool = require('../../config/data/connect');
const jwt = require('jsonwebtoken');

class HomeController {
    getUserFromToken(req) {
        const token = req.cookies.token || req.headers['authorization'];
        if (!token) return null;

        try {
            const decoded = jwt.verify(token, "jwtkey");
            return decoded;
        } catch (err) {
            return null;
        }
    }

    async index(req, res, next) {
        try {
            const productQuery = `
                SELECT products.name, products.price, products.img, products.id, categories.name AS category_name 
                FROM products 
                LEFT JOIN categories 
                ON products.category_id = categories.id
            `;
            const categoryQuery = `SELECT * FROM categories`;

            const [[productRows], [categoryRows]] = await Promise.all([
                pool.promise().query(productQuery),
                pool.promise().query(categoryQuery)
            ]);

            const user = req.user;


            res.render('client/home', { products: productRows, categories: categoryRows, user: user });
        } catch (err) {
            next(err);
        }
    }

    about(req, res, next) {

        const user = req.user;
        res.render('client/about', { user: user });
    }

    blogs(req, res, next) {

        const user = req.user;

        res.render('client/blog', { user: user });
    }

    blog(req, res, next) {

        const user = req.user;
        res.render('client/blog-detail', { user: user });
    }

    async cart(req, res, next) {

        const user = req.user;
        const query = `SELECT 
                    cart_item.id AS wishlist_id,
                    cart_item.uid,
                    cart_item.product_id,
                    cart_item.quantity,
                    products.name AS product_name,
                    products.price AS product_price,
                    products.img AS product_img,
                    categories.name AS category_name
                FROM 
                    cart_item
                INNER JOIN 
                    products ON cart_item.product_id = products.id
                INNER JOIN
                    categories ON products.category_id = categories.id
                WHERE 
                    cart_item.uid = ? `;
        const [row] = await pool.promise().query(query,[user.id]);
        
        res.render('client/shopping-cart', { user: user, list: row });
    }

    home2(req, res, next) {

        const user = req.user;
        res.render('client/home-02', { user: user });
    }

    home3(req, res, next) {

        const user = req.user;
        res.render('client/home-03', { user: user });
    }

    async products(req, res, next) {
        const productQuery = `
            SELECT products.name, products.price, products.img, products.id, categories.name AS category_name 
            FROM products 
            LEFT JOIN categories 
            ON products.category_id = categories.id
        `;
        const categoryQuery = `SELECT * FROM categories`;

        const [[productRows], [categoryRows]] = await Promise.all([
            pool.promise().query(productQuery),
            pool.promise().query(categoryQuery)
        ]);


        const user = req.user;
        res.render('client/products', { products: productRows, categories: categoryRows, user: user });
    }

    async product(req, res, next) {
        const user = req.user;
        const id = req.params.id;
        const query = `SELECT * FROM products WHERE id = ? `;
        const [row] = await pool.promise().query(query, [id]);
        const product = row[0];
        const [other] = await pool.promise().query(`SELECT * FROM products WHERE id != ? LIMIT 10`, [id]);

        res.render("client/product", { user: user, product: product, others: other });
    }

    contact(req, res, next) {

        const user = req.user;
        res.render('client/contact', { user: user });
    }

    async wishlist(req, res, next) {
        try {
            const userId = req.user.id; // Lấy ID người dùng từ token hoặc session

            const query = `
                SELECT 
                    wishlist.id AS wishlist_id,
                    wishlist.uid,
                    wishlist.product_id,
                    products.name AS product_name,
                    products.price AS product_price,
                    products.img AS product_img,
                    categories.name AS category_name
                FROM 
                    wishlist
                INNER JOIN 
                    products ON wishlist.product_id = products.id
                INNER JOIN
                    categories ON products.category_id = categories.id
                WHERE 
                    wishlist.uid = ?;
            `;
            const user = req.user;
            const [rows] = await pool.promise().query(query, [userId]);
            console.log(rows);

            return res.render("client/wishlist", { user: user, list: rows })
        } catch (error) {
            next(error); // Xử lý lỗi nếu có
        }
    }
}

module.exports = new HomeController();
