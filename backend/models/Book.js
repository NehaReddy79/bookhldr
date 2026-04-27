const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String },
    img: { type: String },
    category: { type: String },
    description: { type: String },
    rating: { type: Number, default: 0 }
});

module.exports = mongoose.model('Book', bookSchema);