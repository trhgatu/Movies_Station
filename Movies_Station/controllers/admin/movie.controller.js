const Movie = require("../../models/movie.model");

const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
const { query } = require("express");

/* [GET] /admin/movies */
module.exports.index = async (req, res) => {

    const filterStatus = filterStatusHelper(req.query);

    let find = {
        deleted: false,
    };
    if(req.query.status){
        find.status = req.query.status;
    }

    const objectSearch = searchHelper(req.query);

    console.log(objectSearch);


    if(objectSearch.regex){
        find.title = objectSearch.regex;
    }

    const movies = await Movie.find(find);

    res.render("admin/pages/movies/index", {
        pageTitle: "Danh sách phim",
        movies : movies,
        filterStatus: filterStatus,
        keyword : objectSearch.keyword
    });
}