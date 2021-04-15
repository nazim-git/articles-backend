const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let article = new Schema({
    title: { type: String, require: true },
    author: { type: String, require: false },
    body: { type: String, require: true },
    publish_date: { type: Date, default: new Date() },
}, { collection: 'article' });

module.exports = mongoose.model('Article', article);