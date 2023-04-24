const express = require('express');
const app = express();
const port = 8000;

const saasMiddleware = require('node-sass-middleware');
const expressLayout = require('express-ejs-layouts');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);




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

//  set up view engine
app.set("view engine","ejs");
app.set('views','./views');

// looks for assets
app.use(express.static('./assets'));

app.use(session({
    name:'socio',
    secret:'blah',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
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


// setup routes
app.use("/",require("./routes/index.js"));

app.listen(port,function(err){
    if(err){
        // writing inside `` to sunstitute variable is called interpolation
        console.log(`Error in running server:${err}`)
    }
    console.log(`Server is running on Port:${port}`)

})
