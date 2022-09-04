const Product = require('../models/product.model')
const Category = require('../models/category.model')
const { v4: uuidv4 } = require('uuid');

const handleErrors = (err) => {
    let errors = { productName : ''};
    if (err.code === 11000) {
        if(err.keyValue.productName)
        {
            errors.productName = 'Product is already registered';
        }
        return errors;
    }
}

const product_create = async(req,res) => {
    const {productName, price, categoryName } = req.body;
    try {
        var prodId = uuidv4();
        var discount = 0;
        Category.findOne({categoryName : req.body.categoryName})
        .then(async(data) => {
            console.log(data);
            var categoryId = Number(data.categoryId);
            const product = await Product.create({prodId,productName,price,discount,categoryId});
            res.status(200).send(product);
        })
        .catch((err) => {
            res.status(400).send(err.message);
        })
    }
    catch(err) {
        const errors = handleErrors(err);
        res.status(400).send({errors});
    }
}

const fetch_products = (req,res) => {
    Product.find({categoryId : Number(req.params.categoryId)})
    .then((data) => {
        res.status(200).send(data);
    })
    .catch((err) => {
        res.status(400).send(err.message);
    })
}

module.exports = {
    product_create,
    fetch_products
}