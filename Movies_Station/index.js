require('dotenv').config();
const express = require('express');
var methodOverride = require("method-override");
const database = require("./config/database");

database.connect();

const route = require('./routes/client/index.route');
const routeAdmin = require('./routes/admin/index.route');
const systemConfig = require("./config/system");

const app = express();
app.use(methodOverride('_method'));
const port = process.env.PORT;

app.set("views", "./views");
app.set("view engine", "pug");


app.locals.prefixAdmin = systemConfig.prefixAdmin;
app.use(express.static("public"));

//Route
routeAdmin(app);
route(app);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});