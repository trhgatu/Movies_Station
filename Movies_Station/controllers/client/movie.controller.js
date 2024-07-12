module.exports.index = (req, res) => {
    res.render("client/pages/movies/index", {
        pageTitle: "Danh sách phim"
    });
}