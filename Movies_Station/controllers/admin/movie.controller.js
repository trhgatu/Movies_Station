const Movie = require("../../models/movie.model");

/* [GET] /admin/movies */
module.exports.index = async (req, res) => {
    let filterStatus = [
        {
            name: "Tất cả",
            status: "",
            class: " "
        },
        {
            name: "Hoạt động",
            status: "active",
            class: " "
        },
        {
            name: "Dừng hoạt động",
            status: "inactive",
            class: " "
        },
    ];

    if(req.query.status){
        const index = filterStatus.findIndex(item => item.status == req.query.status);
        filterStatus[index].class = "active";
    }else{
        const index = filterStatus.findIndex(item => item.status == "");
        filterStatus[index].class = "active";
    }

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