const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    prodId : {
        type : String,
    },
    productName : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    discount : {
        type : Number,
        default : 0
    },
    category : {
        type : String,
        required : true
    }
})


const Product = mongoose.model('Product', productSchema);
module.exports = Product;