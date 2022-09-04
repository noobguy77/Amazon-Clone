const Category = require('../models/category.model')


const handleErrors = (err) => {
    let errors = { categoryName: ''};
    console.log(err,"lol");
    // duplicate email and username error
    if (err.code === 11000) {
        // console.log(err.message,"lol");
        if(err.keyValue.categoryName)
        {
            errors.categoryName = 'Category is already registered';
        }
        return errors;
    }
}

const category_create = async(req,res) => {
    const { categoryName }= req.body;
    try {
        const category = await Category.create({categoryName});
        res.status(200).send({category : categoryName});
    }
    catch(err) {
        const errors = handleErrors(err);
        res.status(400).json({errors});
    }
}

module.exports = {
    category_create
}