const express = require('express');
const router = express.Router();

const controller = require("../../controllers/admin/movie.controller");

router.get('/', controller.index);

router.get('/trash', controller.trash);

router.patch('/change-status/:status/:id', controller.changeStatus);

router.patch('/change-multi', controller.changeMulti);

router.delete('/delete/:id', controller.deleteItem);

router.delete('/trash/force-delete/:id', controller.forceDeleteItem);

router.get('/create', controller.create);

router.post('/create', controller.createPost);

module.exports = router;