const Movie = require("../../models/movie.model");

const filterStatusHelper = require("../../helpers/filterStatus");
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

    let keyword = "";

    if(req.query.keyword){
        keyword = req.query.keyword;

        const regex = new RegExp(keyword, "i");
        find.title = regex;
    }

    const movies = await Movie.find(find);

    res.render("admin/pages/movies/index", {
        pageTitle: "Danh sách phim",
        movies : movies,
        filterStatus: filterStatus,
        keyword : keyword
    });
}