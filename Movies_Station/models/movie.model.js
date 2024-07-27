const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
    title: String,
    description: String,
    thumbnail: String,
    status: String,
    deleted: Boolean,
    deletedAt: Date
})
const Movie = mongoose.model('Movie', movieSchema, 'movies')

module.exports = Movie
