const homeRoutes = require("./home");
function routes(app) {
    app.use("/",homeRoutes);
}
module.exports = routes;
