let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

//Create the user model
let userModel = require('../models/user');
let User = userModel.User;

module.exports.displayHomePage = (req, res, next) =>{
    res.render('home',{title: 'Home'});
}

module.exports.displayServicePage = (req, res, next) =>{
    res.render('services',{title: 'Services'});
}


module.exports.displayProjectsPage = (req, res, next) =>{
    res.render('projects',{title: 'Projects'});
}

module.exports.displayAboutPage = (req, res, next) =>{
    res.render('about',{title: 'About'});
}

module.exports.displayContactPage = (req, res, next) =>{
    res.render('contact',{title: 'contact'});
}



module.exports.displayLoginPage = (req, res, next) => {
    if(!req.user){
        res.render('authentication/login', {
            title: "Login",
            messages: req.flash('loginMessage'),
            displayName: req.user ? req.user.displayName : ''
        })
    }
    else
    {
        res.render('authentication/login');
    }
}

module.exports.processLoginPage = (req, res, next) => {
    passport.authenticate('local',
    (err, user, info) => {
        // server err?
        if(err)
        {
            return next(err);
        }
        // is there a user login error?
        if(!user)
        {
            req.flash('loginMessage', 'Authentication Error');
            return res.redirect('/login');
        }
        req.login(user, (err) => {
            // server error?
            if(err)
            {
                return next(err);
            }

            const payload = 
            {
                id: user._id,
                displayName: user.displayName,
                username: user.username,
                email: user.email
            }

            // const authToken = jwt.sign(payload, DB.Secret, {
            //     expiresIn: 604800 // 1 week
            // });

            /* TODO - Getting Ready to convert to API
            res.json({success: true, msg: 'User Logged in Successfully!', user: {
                id: user._id,
                displayName: user.displayName,
                username: user.username,
                email: user.email
            }, token: authToken});
            */

            return res.redirect('/list-view');
        });
    })(req, res, next);
}

// module.exports.processLoginPage = (req, res, next) => {
//     passport.authenticate('local',
//     (err, user) => {
//         if(err)
//         {
//             return next(err);
//         }
//         if(!user)
//         {
//             req.flash('loginMessage', 'Authentication Error');
//             return res.redirect('/login');
//         }
//         req.login(user,(err) => {
//             if(err)
//             {
//                 return next(err);
//             }
//             return res.redirect('/list-view');
//         })(req, res, next);
//     }
    
    
//     )
// }

module.exports.displayRegisterPage = (req, res, next) => {
    if(!req.user)
    {
        res.render('authentication/register',
        {
            title: 'Register',
            messages: req.flash('registerMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
    }
    else
    {
        res.render('authentication/register');
    }
}

module.exports.processRegisterPage = (req, res, next) => {
    let newUser = new User({
        username: req.body.username,
        //password: req.body.password
        email: req.body.email,
        displayName: req.body.displayName
    });

    User.register(newUser, req.body.password, (err) => {
        if(err)
        {
            console.log("Error: Inserting New User");
            if(err.name == "UserExistasError")
            {
                req.flash(
                    'registerMessage',
                    'Registration Error: User Already Exists!'
                );
                console.log('Error: User Already Exists!')
            }
            return res.render('authentication/register',{
                title: 'Register',
                message: req.flash('registerMessage'),
                displayName: req.user ? req.user.displayName: ''
            });

            res.redirect('/login');
        }
        else
        {
            return passport.authenticate('local')(req, res, () => {
                res.redirect('/list-view')
            });
        }
    });
}

module.exports.performLogout = (req, res, next) => {
    req.logout();
    res.redirect('/');
}