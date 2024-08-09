const MovieCategory = require('../../models/movie-category.model');
const systemConfig = require('../../config/system');

const createTreeHelper = require("../../helpers/createTree")
/* [GET] /admin/movies-category */
module.exports.index = async (req, res) => {
    let find = {
        deleted: false,
    }
    function createTree(arr, parentId = ""){
        const tree = [];
        arr.forEach((item) =>{
            if(item.parent_id === parentId){
                const newItem = item;
                const children = createTree(arr, item.id);
                if(children.length > 0){
                    newItem.children = children;
                }
                tree.push(newItem);
            }
        });
        return tree;
    }

    const records = await MovieCategory.find(find);
    const newRecords = createTree(records);
    res.render('admin/pages/movies-category/index', {
        pageTitle: 'Danh mục phim',
        records : newRecords
    });
}
/* [GET] /admin/movies-category/create */
module.exports.create = async (req, res) => {
    let find = {
        deleted: false
    }
    function createTree(arr, parentId = ""){
        const tree = [];
        arr.forEach((item) =>{
            if(item.parent_id === parentId){
                const newItem = item;
                const children = createTree(arr, item.id);
                if(children.length > 0){
                    newItem.children = children;
                }
                tree.push(newItem);
            }
        });
        return tree;
    }

    const records = await MovieCategory.find(find);
    const newRecords = createTree(records);

    res.render('admin/pages/movies-category/create', {
        pageTitle: 'Tạo danh mục',
        records : newRecords
    });
}
/* [POST] /admin/movies/create */
module.exports.createPost = async (req, res) => {
    if(req.body.position == '') {
        const count = await MovieCategory.countDocuments();
        req.body.position = count + 1;
    } else {
        req.body.position = parseInt(req.body.position);
    }
    const record = new MovieCategory(req.body);
    await record.save();

    res.redirect(`${systemConfig.prefixAdmin}/movies-category`);
}