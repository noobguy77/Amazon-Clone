const User = require('../models/user.model')
const md5 = require('md5')
const jwt = require('jsonwebtoken')

const handleErrors = (err) => {
    let errors = { email: '', username:'', password: '' };
    // incorrect email
    if (err.message === 'incorrect email') {
        errors.email = 'Email is not registered';
    }

    // incorrect password
    if (err.message === 'incorrect password') {
        errors.password = 'Password is incorrect';
    }

    // duplicate email and username error
    if (err.code === 11000) {
        // console.log(err.message,"lol");
        if(err.keyValue.email)
        {
            errors.email = 'Email is already registered';
        }
        if(err.keyValue.username)
        {
            errors.username = 'Username is already registered';
        }
        return errors;
    }

    // validation errors
    if (err.message.includes('User validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }
    return errors;
}

const createToken = (id) => {
    return jwt.sign({id},process.env.secret,{
        expiresIn : 60*60
    });
}


const signup_get = (req,res) => {
    res.render("signup");
}
const login_get = (req,res) => {
    res.render("login");
}
const signup_post = async(req,res) => {
    // res.send("signup_post");
    const { email, username, password } = req.body;

    try {
        const user = await User.create({ email, username, password });
        const token = createToken(user._id);
        res.cookie('jwt',token,{httpOnly : true, maxAge : 60*60*1000});
        res.cookie('username',user.username);
        res.cookie('email',user.email);
        res.status(200).send({user : user._id});
    }
    catch(err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}
const login_post = async(req,res) => {
    const {email, password} = req.body;
    try {
        const user = await User.login(email,password);
        const token = createToken(user._id);
        res.cookie('jwt',token,{httpOnly : true, maxAge : 60*60*1000});
        res.cookie('username',user.username);
        res.cookie('email',user.email);
        res.status(200).json({user : user._id});
    }
    catch(err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}
const logout_get = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
}


module.exports = {
    signup_get,
    login_post,
    login_get,
    signup_post,
    logout_get
}