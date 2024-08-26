const pool = require("../../config/data/connect");
const jwt = require("jsonwebtoken");

class serviceClientController {
    getUserFromToken(req) {
        const token = req.cookies.token || req.headers['authorization'];
        if (!token) return null;

        try {
            const user = jwt.verify(token, "jwtkey");
            return user; // Trả về thông tin người dùng từ token
        } catch (err) {
            return null; // Token không hợp lệ hoặc hết hạn
        }
    }

    add_wishlist(req, res, next) {
        const product_id = req.params.id;
        const infoUser = (req) => {
            const token = req.cookies.token || req.headers['authorization'];
            if (!token) return null;

            try {
                const user = jwt.verify(token, "jwtkey");
                return user; // Trả về thông tin người dùng từ token
            } catch (err) {
                return null; // Token không hợp lệ hoặc hết hạn
            }
        };
        const user = infoUser(req);
        if (!user) {
            return res.redirect("/login"); // Nếu không có người dùng, chuyển hướng đến trang đăng nhập
        }
        const query1 = `SELECT * FROM wishlist WHERE uid = ? AND product_id = ?`;
        pool.query(query1, [user.id, product_id], (err, result, field) => {
            if (result.length) {
                return res.redirect('back');
            } else {
                const query = `INSERT INTO wishlist (uid, product_id) VALUES (?, ?)`;
                pool.query(query, [user.id, product_id], (err, result, field) => {
                    if (err) {
                        // Xử lý lỗi nếu cần
                        return res.status(500).send("Có lỗi xảy ra!");
                    }
                    return res.redirect("back");
                });
            }
        })
    }

    delete_wishlist(req, res, next) {
        const wishlist_id = req.params.id;
        const infoUser = (req) => {
            const token = req.cookies.token || req.headers['authorization'];
            if (!token) return null;

            try {
                const user = jwt.verify(token, "jwtkey");
                return user; // Trả về thông tin người dùng từ token
            } catch (err) {
                return null; // Token không hợp lệ hoặc hết hạn
            }
        };
        const user = infoUser(req);
        if (!user) {
            return res.redirect("/login"); // Nếu không có người dùng, chuyển hướng đến trang đăng nhập
        }
        const query1 = `DELETE FROM wishlist WHERE id = ?;`;
        pool.query(query1, [wishlist_id], (err, result, field) => {
            return res.redirect('back');
        })
    }

    add_cart(req, res, next) {
        // const product_id = req.params.id;
        const id = req.body.id;
        const quantity = req.body.quantity;
        const infoUser = (req) => {
            const token = req.cookies.token || req.headers['authorization'];
            if (!token) return null;

            try {
                const user = jwt.verify(token, "jwtkey");
                return user;
            } catch (err) {
                return null;
            }
        };
        const user = infoUser(req);
        if (!user) {
            return res.redirect("/login");
        }
        const query1 = `SELECT * FROM cart_item WHERE uid = ? AND product_id = ?`;
        pool.query(query1, [user.id, id], (err, result, field) => {
            if (result.length) {
                return res.redirect('back');
            } else {
                const query = `INSERT INTO cart_item (uid, product_id, quantity) VALUES (?, ?, ?)`;
                pool.query(query, [user.id, id, quantity], (err, result, field) => {
                    if (err) {
                        return res.status(500).send("Có lỗi xảy ra!");
                    }
                    return res.redirect("back");
                });
            }
        })
    }

    delete_cart(req, res, next) {
        const wishlist_id = req.params.id;
        const infoUser = (req) => {
            const token = req.cookies.token || req.headers['authorization'];
            if (!token) return null;

            try {
                const user = jwt.verify(token, "jwtkey");
                return user;
            } catch (err) {
                return null;
            }
        };
        const user = infoUser(req);
        if (!user) {
            return res.redirect("/login");
        }
        const query1 = `DELETE FROM cart_item WHERE id = ?;`;
        pool.query(query1, [wishlist_id], (err, result, field) => {
            return res.redirect('back');
        })
    }

    async checkout(req, res, next) {
        try {
            const uid = req.user.id;
            const data = req.body;

            const [rows] = await pool.promise().query(
                `SELECT 
                    cart_item.id AS cart_item_id,
                    cart_item.product_id,
                    cart_item.quantity,
                    products.price AS product_price
                FROM 
                    cart_item
                INNER JOIN 
                    products ON cart_item.product_id = products.id
                WHERE 
                    cart_item.uid = ?`,
                [uid]
            );

            let totalPrice = 0;
            rows.forEach(element => {
                totalPrice += element.product_price * element.quantity;
            });

            const [orderResult] = await pool.promise().query(
                `INSERT INTO orders (uid, status, phone, nameuser, address, total) VALUES (?, ?, ?, ?, ?, ?)`,
                [uid, 1, data.phone, data.nameuser, data.address, totalPrice]
            );

            const orderId = orderResult.insertId;

            const orderItems = rows.map(item => [
                item.product_id,
                orderId,
                item.quantity
            ]);

            await pool.promise().query(
                `INSERT INTO order_item (product_id, order_id, quantity) VALUES ?`,
                [orderItems]
            );

            await pool.promise().query(
                `DELETE FROM cart_item WHERE uid = ?`,
                [uid]
            );

            res.redirect('back');

        } catch (err) {
            next(err);
        }
    }

}

module.exports = new serviceClientController();
