const express = require('express');
const app = express();
const port = 8000;

const saasMiddleware = require('node-sass-middleware');
const expressLayout = require('express-ejs-layouts');



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

// setup routes
app.use("/",require("./routes/index.js"));

app.listen(port,function(err){
    if(err){
        // writing inside `` to sunstitute variable is called interpolation
        console.log(`Error in running server:${err}`)
    }
    console.log(`Server is running on Port:${port}`)

})
