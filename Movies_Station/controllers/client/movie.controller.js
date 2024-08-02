const Movie = require("../../models/movie.model");
/* [GET] /movies */
module.exports.index = async(req, res) => {
    const movies = await Movie.find({
        status: "active",
        deleted: false
    }).sort({position : "descending"});

    res.render("client/pages/movies/index", {
        pageTitle: "Danh sách phim",
        movies : movies
    });
}

/* [GET] /movies/:slug */
module.exports.detail = async(req, res) => {
    const find = {
        deleted: false,
        slug: req.params.slug,
    }
    const movie = await Movie.findOne(find);
    res.render("client/pages/movies/detail", {
        pageTitle: "Danh sách phim",
        movie : movie
    });
}