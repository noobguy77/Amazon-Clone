const mongoose = require('mongoose')
const md5 = require('md5')
const {isEmail} = require('validator');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter your email!'],
        unique: true,
        lowercase: true,
        validate : [isEmail, 'Please enter a valid email!']
    },
    username: {
        type: String,
        required: [true, 'Please enter your username!'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please enter your password!'],
        minLength: [6, 'Password should be atleast 6 characters!']
    },
})

userSchema.pre('save',async function (next) {
    this.password = md5(this.password)
    next();
})

userSchema.statics.login = async function(email,password) {
    const user = await this.findOne({email});
    if(user) {
        if(md5(password) === user.password) {
            return user;
        }
        throw Error('incorrect password')
    }
    throw Error('incorrect email')
}

const User = mongoose.model('User', userSchema);
module.exports = User;