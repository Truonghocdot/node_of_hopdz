const homeRoutes = require("./home");
const adminRoutes = require("./admin")
function routes(app) {
    app.use("/",homeRoutes);
    app.use("/admin",adminRoutes);
}
module.exports = routes;
