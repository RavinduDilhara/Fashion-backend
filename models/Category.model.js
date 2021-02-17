const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    categoryName: {
        type: String,
        default: '',
        required: true
    }
});

const categoryDetails = mongoose.model('categoryDetails', CategorySchema);

module.exports = categoryDetails;