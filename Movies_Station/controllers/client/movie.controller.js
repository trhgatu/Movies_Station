const Movie = require("../../models/movie.model");
const axios = require("axios");

/* [GET] /movies */
module.exports.index = async (req, res) => {
    const movies = await Movie.find({
        status: "active",
        deleted: false
    }).sort({ position: "descending" });

    res.render("client/pages/movies/index", {
        pageTitle: "Danh sách phim",
        movies: movies
    });
}
/* [GET] /movies/:slug */
module.exports.newMovies = async (req, res) => {
    res.send("OK");
}
/* [GET] /movies/:slug */
module.exports.singleMovies = async (req, res) => {
    res.send("OK");
}

/* [GET] /movies/:slug */
module.exports.seriesMovies = async (req, res) => {
    res.send("OK");
}


/* [GET] /movies/:slug */
module.exports.detail = async (req, res) => {
    const movieSlug = req.params.slug;
    const response = await axios.get(`https://apii.online/apii/phim/${movieSlug}`);
    const movieData = response.data.movie;
    console.log(movieData);
    res.render("client/pages/movies/detail", {
        movie: movieData
    });
}
