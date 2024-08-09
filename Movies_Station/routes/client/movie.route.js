const express = require('express');
const router = express.Router();

const controller = require("../../controllers/client/movie.controller");


router.get('/', controller.index);


router.get('/new-movies', controller.newMovies);
router.get('/single-movies', controller.singleMovies);
router.get('/series-movies', controller.seriesMovies);

router.get('/:slug', controller.detail);

module.exports = router;
