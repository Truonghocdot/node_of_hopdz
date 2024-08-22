const pool = require('../../config/data/connect');
class HomeController {
    index(req, res, next) {
        const product = pool.query("SELECT * FROM products") ;
        console.log(product);
        res.render('client/home');
    }

    about(req, res, next) {
        res.render('client/about');
    }

    blogs(req, res, next) {
        res.render('client/blog');
    }
    about(req, res, next) {
        res.render('client/about');
    }
    blog(req, res, next) {
        res.render('client/blog-detail');
    }
    cart(req, res, next) {
        res.render('client/shopping-cart');
    }
    home2(req, res, next) {
        res.render('client/home-02');
    }
    home3(req, res, next) {
        res.render('client/home-03');
    }
    products(req, res, next) {
        res.render('client/products');
    }

    product(req, res, next) {
        res.render('client/product-detail');
    }
    contact(req, res, next) {
        res.render('client/contact');
    }
    wishlist(req, res, next) {
        res.render('client/wishlist');
    }
}

module.exports = new HomeController()