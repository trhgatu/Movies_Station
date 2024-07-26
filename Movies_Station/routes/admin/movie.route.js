const express = require('express');
const router = express.Router();

const controller = require("../../controllers/admin/movie.controller");

router.get('/', controller.index);
router.patch('/change-status/:status/:id', controller.changeStatus);
module.exports = router;