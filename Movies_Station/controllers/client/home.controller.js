/* [GET] / */
const Movie = require("../../models/movie.model");

module.exports.index = async (req, res) => {
    const movies = await Movie.find({
        status: "active",
        deleted: false
    });
    res.render("client/pages/home/index", {
        pageTitle: "Trang chủ",
        movies : movies
    });
}