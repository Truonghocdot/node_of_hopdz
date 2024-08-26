const express = require("express");
const app = express();
const session = require("express-session");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv").config();
const routes = require("./routes/index.js");
const path = require('path');
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const engine = require("ejs-locals")
const methodOverride = require('method-override');
const globalDataMiddleware = require("./middleware/globalDateMiddleware.js");

app.use(methodOverride('_method'));
app.use(morgan("tiny"));
app.engine("ejs", engine);
app.use(bodyParser.json());
app.use(express.static("public"))
app.set("view engine", "ejs")
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use(cookieParser());
app.use(session({
    secret: 'hihi',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false, 
        maxAge: 24 * 60 * 60 * 1000
    }
}));

app.use(globalDataMiddleware)
routes(app);
app.listen(process.env.PORT || 8000, (err, result) => {
    if (err) {
        return new err();
    } else {
        if (process.env.PORT) {
            console.log("server is running on localhost:8000");
        } else {
            console.log("server is running on localhost:8000");
        }
    }
});
