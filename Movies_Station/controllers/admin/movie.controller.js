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

    if(objectSearch.regex){
        find.title = objectSearch.regex;
    }

    //Pagination
    let objectPagination = {
        currentPage : 1,
        limitItems : 6
    };

    if(req.query.page){
        objectPagination.currentPage = parseInt(req.query.page);
    }


    const countMovies = await Movie.countDocuments(find);
    const totalPage = Math.ceil(countMovies / objectPagination.limitItems);
    objectPagination.totalPage = totalPage;

    objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItems;
    //End pagination

    const movies = await Movie.find(find).limit(objectPagination.limitItems).skip(objectPagination.skip);




    res.render("admin/pages/movies/index", {
        pageTitle: "Danh sách phim",
        movies : movies,
        filterStatus: filterStatus,
        keyword : objectSearch.keyword,
        pagination : objectPagination
    });
}