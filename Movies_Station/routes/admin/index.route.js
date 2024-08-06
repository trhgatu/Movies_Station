const dashboardRoutes = require("./dashboard.route");
const systemConfig = require("../../config/system");
const movieRoutes = require("./movie.route");
const movieCategoryRoutes = require("./movie-category.route");
module.exports = (app) =>{
    const PATH_ADMIN = systemConfig.prefixAdmin;
    app.use(PATH_ADMIN +'/dashboard', dashboardRoutes);
    app.use(PATH_ADMIN +'/movies', movieRoutes);
    app.use(PATH_ADMIN +'/movies-category', movieCategoryRoutes);
}
