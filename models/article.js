const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a Schema and a Model

const ArticleSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
});

const ArticleData = mongoose.model('article', ArticleSchema);

module.exports = ArticleData;
