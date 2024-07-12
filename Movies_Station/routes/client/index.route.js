const homeRoutes = require("./home.route");
const movieRoutes = require("./movie.route");

module.exports = (app) =>{
    app.use('/', homeRoutes );

    app.use('/movies', movieRoutes);
}
