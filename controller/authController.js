const pool = require("../config/data/connect.js");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

class authController {
    // Hiển thị trang đăng nhập cho khách hàng
    show_login_client(req, res, next) {
        return res.render("client/login", { alertType: "", message: false });
    }

    // Hiển thị trang đăng ký cho khách hàng
    show_register_client(req, res, next) {
        return res.render("client/register", { alertType: "", message: false });
    }

    // Hiển thị trang đăng nhập cho admin
    show_login_admin(req, res, next) {
        return res.render("admin/login", { alertType: "", message: false });
    }

    // Hiển thị trang đăng ký cho admin
    show_register_admin(req, res, next) {
        return res.render("admin/register", { alertType: "", message: false });
    }

    // Đăng ký tài khoản mới
    register(req, res, next) {
        const q = "SELECT * FROM users WHERE name = ? OR email = ?";
        pool.query(q, [req.body.username, req.body.email], (err, data) => {
            if (err) return res.render("admin/register", { message: "Có lỗi xảy ra!", alertType: 'error' });
            if (data.length) return res.render("admin/register", { message: "Tài khoản đã tồn tại!", alertType: 'error' });

            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, salt);

            const role = req.body.role == '1' ? 1 : 0;
            const insertQuery = `INSERT INTO users(name, email, pass_word, role) VALUES (?)`;
            const values = [req.body.username, req.body.email, hash, role];

            pool.query(insertQuery, [values], (err, data) => {
                if (err) return res.render("admin/register", { message: "Có lỗi xảy ra!", alertType: 'error' });
                return res.render("admin/register", { message: "Tạo tài khoản thành công!", alertType: 'success' });
            });
        });
    }

    // Đăng xuất người dùng
    logout(req, res, next) {
        res.clearCookie('token', {
            sameSite: 'none',
            secure: true,
            httpOnly: true
        });
        return res.redirect('/');
    }

    login(req, res, next) {
        const q = "SELECT * FROM users WHERE name = ? OR email = ?";
        pool.query(q, [req.body.nameomail, req.body.nameomail], (err, data) => {
            if (err) return next(err);
            if (data.length === 0) return res.render("admin/login", { message: "Tài khoản hoặc mật khẩu không đúng!", alertType: 'error' });

            const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].pass_word);
            if (!isPasswordCorrect) {
                return res.render("admin/login", { message: "Tài khoản hoặc mật khẩu không đúng!", alertType: 'error' });
            }

            const token = jwt.sign({ id: data[0].id, role: data[0].role }, "jwtkey", { expiresIn: '1h' });

            return res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // Chỉ sử dụng secure ở môi trường production
                sameSite: 'Strict', // Cải thiện bảo mật cookie
                maxAge: 3600000 // 1 giờ, khớp với thời gian hết hạn của token
            }).redirect(data[0].role == '1' ? "/admin" : "/");
        });
    }

    // Middleware xác thực người dùng (dành cho Admin)
    authenticateToken(req, res, next) {
        const token = req.cookies.token || req.headers['authorization'];
        if (!token) return res.redirect('/login');

        jwt.verify(token, "jwtkey", (err, user) => {
            if (err) return res.redirect('/login');
            req.user = user;
            next();
        });
    }

    // Kiểm tra quyền Admin
    checkRoleAdmin(req, res, next) {
            
        if (req.user.role == "1") {
            return next();
        } else {
            return res.redirect('/');
        }
    }

    // Kiểm tra quyền truy cập của khách hàng
    checkAuthClient(req, res, next) {
        if (req.user) {
            return next();
        } else {
            return res.redirect('/login');
        }
    }
}

module.exports = new authController();
