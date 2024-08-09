const axios = require('axios');

/* [GET] /new-movies */
module.exports.index = async (req, res) => {
    res.send("OK");
}










module.exports.getMovies = async () => {
    try {
        const response = await axios.get('https://apii.online/apii/danh-sach/phim-moi-cap-nhat');
        return {
            items: response.data.items || [],
            pathImage: response.data.pathImage
        };
    } catch (error) {
        console.error('Error fetching movies:', error);
        throw new Error('Lỗi khi lấy dữ liệu phim');
    }
};
