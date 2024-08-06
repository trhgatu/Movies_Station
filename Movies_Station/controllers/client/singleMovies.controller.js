const axios = require('axios');

module.exports.getMovies = async () => {
    try {
        const response = await axios.get('https://apii.online/apii/danh-sach?type=single&page=2');
        return {
            items: response.data.items || [],
            pathImage: response.data.pathImage
        };
    } catch (error) {
        console.error('Error fetching movies:', error);
        throw new Error('Lỗi khi lấy dữ liệu phim');
    }
};
