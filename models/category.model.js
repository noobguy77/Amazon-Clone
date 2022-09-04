const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    categoryName : {
        type : String,
        required : true,
        unique : true,
    },
    categoryId : {
        type : Number,
    }
})

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;