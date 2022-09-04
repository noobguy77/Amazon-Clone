const Category = require('../models/category.model')


const handleErrors = (err) => {
    let errors = { categoryName: ''};
    if (err.code === 11000) {
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
        await Category.find({})
        .then(async(data) => {
            var categoryId = data.length+1;
            const category = await Category.create({categoryName, categoryId});
            res.status(200).send({category : categoryName,categoryId : categoryId});
        })
        .catch((err) => {
            res.status(400).send(err.message);
        })
    }
    catch(err) {
        const errors = handleErrors(err);
        res.status(400).json({errors});
    }
}

module.exports = {
    category_create
}