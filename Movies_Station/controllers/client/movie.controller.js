const Movie = require("../../models/movie.model");
/* [GET] /movies */
module.exports.index = async(req, res) => {
    const movies = await Movie.find({
        status: "active",
        deleted: false
    });

    res.render("client/pages/movies/index", {
        pageTitle: "Danh sách phim",
        movies : movies
    });
}