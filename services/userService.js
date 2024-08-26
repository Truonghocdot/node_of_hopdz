const pool = require("../config/data/connect.js")
const getCart = async (userId) => {
    const query = `SELECT COUNT(*) FROM cart_item WHERE uid = ?`;
    const [countCart] = await pool.promise().query(query, userId);
    return countCart;
};

const getFavorites = async (userId) => {
    const query = `SELECT COUNT(*) FROM wishlist WHERE uid = ?`;
    const [countWishlist] = await pool.promise().query(query, userId);
    return countWishlist;
};

module.exports = {
    getCart,
    getFavorites
};
