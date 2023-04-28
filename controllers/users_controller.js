const User = require('../models/user');
const fs = require('fs');
const path = require('path');


module.exports.signUp = function (req,res){
    res.render('sign_up.ejs')
}

// get data from sign up form and create user
module.exports.create = async function(req,res){
    if(req.body.password != req.body.confirm_password){
        console.log('password is not maching -- while creating user')
        return res.redirect('back');
    }
    let user = await User.findOne({email:req.body.email})
    if(user==null){
        let createdUser = await User.create({
            name : req.body.name,
            email : req.body.email,
            password : req.body.password

        });
        if(createdUser){
            console.log('user created succesfully');
            return res.render('sign_in.ejs')
        }
        else{
            console.log('error while creating user');
            return res,redirect('back')
        }
    }

    else{
        
    return res.redirect('back');

    }
}

module.exports.signIn = function(req,res){
    res.render('sign_in.ejs')
}


module.exports.create_session = function(req,res){
    console.log('Logged in successfully');
    return res.redirect('/');
}


module,exports.destroySession = function(req,res){
    req.logout(function(err) {
        if (err) {
             return (err); 
        }
        console.log('logged out successfully')
        return res.redirect('/');
    });

}


