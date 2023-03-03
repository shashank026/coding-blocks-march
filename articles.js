const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    articleTitle: {
        type: String,
        trim: true,
    },
    articleDiscriptaion: {
        type: String,
        required: true,
        trim: true,
    },
    articleMarkdown: {
        type: String,
        required: true,
        trim: true,
    },
    articleDate: {
        type: Date,
        default: () => new Date(+new Date() + 7*24*60*60*1000),
    }
});

module.exports = mongoose.model("Article", articleSchema);