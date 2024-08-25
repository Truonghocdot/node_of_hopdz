class dashboardController {
    index (req, res, next){
        res.render("admin/home")
    }

    products (req, res, next) {
        res.render('admin/products');
    }

    categories (req, res, next) {
        res.render('admin/categories');
    }
    blogs (req, res, next) {
        res.render('admin/blogs');
    }
    orders (req, res, next) {
        res.render('admin/orders');
    }

}

module.exports = new dashboardController();