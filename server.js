const express = require('express')
const mongoose = require('mongoose');
const categoryRoutes = require('./routes/category.route');
const productRoutes = require('./routes/product.route');
const userRoutes = require('./routes/user.routes');


//models
const categoryModel = require('./models/category.model');
const productModel = require('./models/product.model');


const {
    requireAuth,
    checkUser,
    requireAuthAdmin
} = require('./middleware/user.middleware')
const cookieParser = require('cookie-parser')
require('dotenv').config()

const app = express()

app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json())
app.use(cookieParser());
app.set('view engine', 'ejs');



mongoose.connect(process.env.dbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        app.listen(6969, () => {
            console.log("Running in 6969")
            console.log("Db success");
        })
    })
    .catch((err) => {
        console.log("Error!", err);
    })

app.use("*", checkUser);
app.get('/', requireAuth, (req, res) => {
    categoryModel.find({})
    .then((data) => {
        res.render("home",{data});
    })
    .catch((err) => {
        res.send("Error Occurred!");
    })
})
app.get('/admin',requireAuthAdmin, (req, res) => {
    res.send("admin");
})

app.get('/products/:categoryId', (req,res) => {
    console.log(req.params);
    productModel.find({categoryId : Number(req.params.categoryId)})
    .then((data) => {
        res.render("products",{data});
    })
})
app.use(userRoutes);
app.use(categoryRoutes);
app.use(productRoutes);

//cookies