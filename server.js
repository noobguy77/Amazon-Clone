const express = require('express')
const mongoose = require('mongoose');
const userRoutes = require('./routes/user.routes');
const categoryRoutes = require('./routes/category.route');
const {
    requireAuth,
    checkUser
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
    res.render("home");
})
app.use(userRoutes);
app.use(categoryRoutes);

//cookies