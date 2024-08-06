const MovieCategory = require('../../models/movie-category.model');
const systemConfig = require('../../config/system');
/* [GET] /admin/movies-category */
module.exports.index = async (req, res) => {
    let find = {
        deleted: false,
    }

    const records = await MovieCategory.find(find);
    res.render('admin/pages/movies-category/index', {
        pageTitle: 'Danh mục phim',
        records : records
    });
}
/* [GET] /admin/movies-category/create */
module.exports.create = async (req, res) => {
    res.render('admin/pages/movies-category/create', {
        pageTitle: 'Tạo danh mục',
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