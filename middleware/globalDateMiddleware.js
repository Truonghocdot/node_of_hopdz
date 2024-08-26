const jwt = require("jsonwebtoken");
const { getCart, getFavorites } = require('../services/userService');

const globalDataMiddleware = async (req, res, next) => {
    const token = req.cookies.token || req.headers['authorization'];
    
    if (!token) {
        return next(); // Nếu không có token, tiếp tục middleware khác
    }

    try {
        const decoded = jwt.verify(token, "jwtkey");
        
        const user = {
            id: decoded.id,
            role: decoded.role,
            cart: await getCart(decoded.id),
            favorites: await getFavorites(decoded.id)
        };
        
        req.user = user; // Gán thông tin người dùng vào req để sử dụng trong các middleware khác
    } catch (error) {
        return next(error); // Nếu có lỗi trong quá trình xác thực JWT, chuyển sang middleware xử lý lỗi
    }


    next();
};

module.exports = globalDataMiddleware;
