const axios = require('axios');
const newMoviesController = require("../../controllers/client/newMovies.controller");
const seriesMoviesController = require("../../controllers/client/seriesMovies.controller");
const singleMoviesController = require("../../controllers/client/singleMovies.controller");


module.exports.index = async (req, res) => {
    try {
        const newMoviesData = await newMoviesController.getMovies();
        const pathImages = newMoviesData.pathImage;

        const singleMoviesData = await singleMoviesController.getMovies();
        const seriesMoviesData = await seriesMoviesController.getMovies();

        res.render('client/pages/home/index', {
            pageTitle: 'Trang chủ',
            newMovies: newMoviesData.items,
            pathImages: pathImages,
            singleMovies: singleMoviesData.items,
            pathImages: pathImages,
            seriesMovies: seriesMoviesData.items,
            pathImages: pathImages
        });

    } catch (error) {
        console.error('Error fetching movies:', error);
        res.status(500).send('Lỗi khi lấy dữ liệu phim');
    }
};
