const Product = require('../models/product.model')
const { uuid } = require('uuidv4');

const handleErrors = (err) => {
    let errors = { productName : ''};
    // duplicate email and username error
    if (err.code === 11000) {
        // console.log(err.message,"lol");
        if(err.keyValue.productName)
        {
            errors.productName = 'Product is already registered';
        }
        return errors;
    }
}

const product_create = async(req,res) => {
    try {
        var prodId = uuid();
        const product = await Product.create(prodId,req.body.productName,req.body,price,0,req.body.categoryName);
        res.status(200).send({product});
    }
    catch(err) {
        const errors = handleErrors(err);
        res.status(400).send({errors});
    }
}

module.exports = {
    product_create
}