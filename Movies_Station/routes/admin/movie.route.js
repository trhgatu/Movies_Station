const express = require('express');
const router = express.Router();

const controller = require("../../controllers/admin/movie.controller");

router.get('/', controller.index);

module.exports = router;