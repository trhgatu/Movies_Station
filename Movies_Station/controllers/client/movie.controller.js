const Movie = require("../../models/movie.model");

module.exports.index = async(req, res) => {
    const movies = await Movie.find({
        status: "active",
        deleted: false
    });

    console.log(movies);
    res.render("client/pages/movies/index", {
        pageTitle: "Danh sách phim",
        movies : movies
    });
}