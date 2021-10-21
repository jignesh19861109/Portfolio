//require modules for the user model
let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

let User = mongoose.Schema
(
    {
    username:
    {
        type: String,
        default: '',
        trim: true,
        required: 'Must enter your username'
    },
    /*
    password:
    {
        type: String,
        default: '',
        trim: true,
        required: 'Must enter your password'
    }
    */
    email:
    {
        type: String,
        default: '',
        trim: true,
        required: 'Must enter your email'
    },
    displayName:{
        type: String,
        default: '',
        trim: true,
        required: 'Name is required'
    },
    created:
    {
        type: Date,
        default: Date.now
    },
    update:
    {
        type: Date,
        default: Date.now
    }
    },
    {
        collection: "users"
    }
)


//Configure option for user Model

let options = ({missingPasswordError: 'Wrong Password'});

User.plugin(passportLocalMongoose, options);

module.exports.User = mongoose.model('User', User);