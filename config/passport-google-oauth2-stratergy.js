const passport = require('passport');
const googleStratergy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');

const User = require('../models/user')
const {GOUTH_CLIENT_ID,GOUTH_CLIENT_SECRET} = require('./environment')


passport.use(new googleStratergy({

    clientID:GOUTH_CLIENT_ID,
    clientSecret:GOUTH_CLIENT_SECRET,
    callbackURL:"http://localhost:8000/users/auth/google/callback"

}, function(accessToken,refreshToken,profile,done){
    User.findOne({email:profile.emails[0].value}).exec(
        function(err,user){
                if(err){
                    console.log('Error in finding user ---> gOuth');
                    return;
                }
                if(user){
                    console.log('printing profile --->',profile)
                    return done(null,user)
                }
                else{
                    //if  user not found , allow option to sign-up option to create profile
                    User.create({
                        name : profile.displayName,
                        email: profile.emails[0].value,
                        password: crypto.randomBytes(20).toString('hex')
                    },function(err,user){
                        if(err){
                            console.log('Error in creating user ---> gOuth');
                            return;
                        }
                        return done(null,user);
                    })
                }
            })
        }));

module.exports = passport;