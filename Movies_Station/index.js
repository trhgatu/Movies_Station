require('dotenv').config();
const express = require('express');
const path = require("path");
var methodOverride = require("method-override");
var bodyParser = require("body-parser");
const axios = require("axios");
var flash = require('express-flash');
var cookieParser = require("cookie-parser");
var session = require('express-session');
const database = require("./config/database");
const cors = require('cors');

database.connect();

const route = require('./routes/client/index.route');
const routeAdmin = require('./routes/admin/index.route');
const systemConfig = require("./config/system");

const app = express();
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT;

app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

//Flash
app.use(cookieParser("ASDHIASHDJAS"));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());
//End Flash

//TinyMCE
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));


//End TinyMCE


app.locals.prefixAdmin = systemConfig.prefixAdmin;
app.use(cors());
app.use(express.static(`${__dirname}/public`));

//Route
routeAdmin(app);
route(app);



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});