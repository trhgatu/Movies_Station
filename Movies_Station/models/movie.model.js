const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const movieSchema = new mongoose.Schema({
    title: String,
    description: String,
    thumbnail: String,
    status: String,
    deleted: {
        type: Boolean,
        default: false
    },
    slug:{
        type: String,
        slug: "title",
        unique: true
    },
    deletedAt: Date,
    position: Number,

},{
    timestamps: true
})
const Movie = mongoose.model('Movie', movieSchema, 'movies')

module.exports = Movie
