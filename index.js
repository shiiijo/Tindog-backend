const express = require('express');
const app = express();
const port = 8000;

const saasMiddleware = require('node-sass-middleware');
const expressLayout = require('express-ejs-layouts');
const session = require('express-session');
const cookieParser = require("cookie-parser");
const passport = require('passport');
const passportLocal = require('./config/passport-local-stratergy');
const passportGoogle = require('./config/passport-google-oauth2-stratergy');
const MongoDBStore = require('connect-mongodb-session')(session);
const {SESSION_SECRET,SESSION_NAME} = require('./config/environment')



// databse connection firing up
const db = require("./config/mongoose");

// it is to facilitate css loading with sass middle ware once server starts
app.use(saasMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:true,
    outputStyle:'expanded',
    prefix:'/css'
  }));
  

// it is to add styles tag always in head section for individual style files
app.set('layout extractStyles',true);
// it is to add script tag always in footer section for individual js script files
app.set('layout extractScripts',true);

// setup layout , it should be before routes and views
app.use(expressLayout)

// it is to allow to get form data in req object
app.use(express.urlencoded());
// to parse the cookies
app.use(cookieParser());

// looks for assets
app.use(express.static('./assets'));

//  set up view engine
app.set("view engine","ejs");
app.set('views','./views');

app.use(session({
    name:SESSION_NAME,
    secret:SESSION_SECRET,
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000000)
    },
    // mongo store is used to session cookie in DB
    store: new MongoDBStore({
            mongooseConnection : db,
            autoRemove :'disabled'
    },
    function(err){
        console.log(err || 'connect-mongodb setup ok');
    })
}));

// initailze passport and passport session
app.use(passport.initialize());
app.use(passport.session());

//  this function is defined by me , for any request comming in this function stores user 
// - info available in locales , locales can be accessed anywhere for views when he is signed in 
app.use(passport.setAuthenticatedUser);

// setup routes
app.use("/",require("./routes/index.js"));

app.listen(port,function(err){
    if(err){
        // writing inside `` to sunstitute variable is called interpolation
        console.log(`Error in running server:${err}`)
    }
    console.log(`Server is running on Port:${port}`)

})
