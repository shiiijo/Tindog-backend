
const passport = require('passport')

const LocalStratergy = require('passport-local').Strategy;

const User = require('../models/user')

// authentication
passport.use(new LocalStratergy(
  {usernameField:'email',
  passReqToCallback: true

},async function(req,email,password,done){
  let loggedInUser = await User.findOne({
        email:email
    })

    if(!loggedInUser){
      console.log('Error in finding user -- passport')
      return done(err);
    }
    
    if(loggedInUser.password != password || loggedInUser == null){
      req.flash('error','Invalid Username/Password');
      console.log('Invalid username/password');
      return done(null,false);
    }
    console.log(loggedInUser)
    return done(null,loggedInUser);

    }));

// serializing the user 
passport.serializeUser(function(user,done){
    done(null,user.id);
})

// de-serializing the user 
passport.deserializeUser(async function(id,done){
    let user = await User.findById(id);
        if(!user){
            console.log('Error in finding user -- passport')
            return done(err);
          }
        return done(null,user);
      });

//  check if the user is autenticated or not -- > it is used as middleware while going to profile page
passport.checkAuthentication = function(req,res,next){
  
  // if user is signed in , then pass the request to the next function (in controller)
  if(req.isAuthenticated()){
    return next();
  }
    // if user is not signed in
  return res.redirect('/users/sign-in')
}


passport.setAuthenticatedUser = function(req,res,next){
  if(req.isAuthenticated()){
    //  req.user contains contains current signed in user from the current session cookie andd we are sending this to the locales for the views 
    // now locales will be having all data from the data-base about the current user
    res.locals.user = req.user
  }
  next();

}

module.exports = passport;

