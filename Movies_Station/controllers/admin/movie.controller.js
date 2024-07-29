const Movie = require('../../models/movie.model')

const systemConfig = require("../../config/system");

const filterStatusHelper = require('../../helpers/filterStatus')
const searchHelper = require('../../helpers/search')
const paginationHelper = require('../../helpers/pagination')
const {query} = require('express')

/* [GET] /admin/movies */
module.exports.index = async (req, res) => {
    const filterStatus = filterStatusHelper(req.query)

    let find = {
        deleted: false,
    }
    if (req.query.status) {
        find.status = req.query.status
    }

    const objectSearch = searchHelper(req.query)

    if (objectSearch.regex) {
        find.title = objectSearch.regex
    }

    //Pagination
    const countMovies = await Movie.countDocuments(find);

    let objectPagination = paginationHelper({
        currentPage: 1,
        limitItems: 6,
    },
     req.query,
        countMovies
    );
    //End pagination

    const movies = await Movie.find(find)
    .sort({position : "descending"})
    .limit(objectPagination.limitItems)
    .skip(objectPagination.skip);

    res.render('admin/pages/movies/index', {
        pageTitle: 'Danh sách phim',
        movies: movies,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword,
        pagination: objectPagination,
    })
};

/* [PATCH] /admin/movies/change-status/:status/:id */
module.exports.changeStatus = async (req, res) => {
    const status = req.params.status;
    const id = req.params.id;

    await Movie.updateOne({_id: id},{status: status});

    req.flash("success", "Cập nhật trạng thái thành công!");
    res.redirect("back");
};
/* [PATCH] /admin/movies/change-multi */
module.exports.changeMulti = async (req, res) =>{
    const type = req.body.type;
    const ids = req.body.ids.split(", ");

    switch (type){
        case "active":
            await Movie.updateMany({_id: {$in: ids}}, {status: "active"});
            req.flash("success", `Cập nhật trạng thái của ${ids.length} phim thành công!`);
            break;
        case "inactive":
            await Movie.updateMany({_id: {$in: ids}}, {status: "inactive"});
            req.flash("success", `Cập nhật trạng thái của ${ids.length} phim thành công!`);
            break;
        case "delete-all":
            await Movie.updateMany(
                {
                    _id : {$in: ids}
                },
                {
                    deleted: true,
                    deletedAt: new Date()
                }
            );
            req.flash("success", `Xóa ${ids.length} phim thành công!`);
            break;
        case "change-position":
            for (const item of ids) {
                let [id, position ] = item.split("-");
                position = parseInt(position);
                await Movie.updateOne({_id: id}, {position: position});
            }
            req.flash("success", `Thay đổi vị trí của ${ids.length} phim thành công!`);
            break;
        default:
            break;
    }
    res.redirect("back");
};
/* [DELETE] /admin/movies/delete/:id */
module.exports.deleteItem = async (req, res) =>{
    const id = req.params.id;
    await Movie.updateOne({_id: id},{
        deleted: true,
        deletedAt: new Date()
    });
    req.flash("success", `Xóa phim thành công!`);
    res.redirect("back");
};
/* [GET] /admin/movies/trash */
module.exports.trash = async (req, res) => {
    const filterStatus = filterStatusHelper(req.query)

    let find = {
        deleted: true,
    }
    if (req.query.status) {
        find.status = req.query.status
    }

    const objectSearch = searchHelper(req.query)

    if (objectSearch.regex) {
        find.title = objectSearch.regex
    }

    //Pagination
    const countMovies = await Movie.countDocuments(find);

    let objectPagination = paginationHelper({
        currentPage: 1,
        limitItems: 6,
    },
     req.query,
        countMovies
    );
    //End pagination

    const movies = await Movie.find(find).limit(objectPagination.limitItems).skip(objectPagination.skip);

    res.render('admin/pages/movies/trash', {
        pageTitle: 'Thùng rác',
        movies: movies,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword,
        pagination: objectPagination,
    })
};
/* [DELETE] /admin/movies/trash/delete/:id */
module.exports.forceDeleteItem = async (req, res) =>{
    const id = req.params.id;
    await Movie.deleteOne({_id: id});
    res.redirect("back");
};

/* [GET] /admin/movies/create */
module.exports.create = async (req, res) =>{
    res.render('admin/pages/movies/create', {
        pageTitle: 'Thêm mới sản phẩm',
    })
};
/* [POST] /admin/movies/create */
module.exports.createPost = async (req, res) =>{
    if(req.body.position == ""){
        const countMovies = await Movie.countDocuments();
        req.body.position = countMovies + 1;
    }else{
        req.body.position = parseInt(req.body.position);
    }
    req.body.thumbnail = `/uploads/${req.file.filename}`;
    const movie = new Movie(req.body);
    await movie.save();

    res.redirect(`${systemConfig.prefixAdmin}/movies`);
};