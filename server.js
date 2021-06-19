const express = require("express");
const session = require('express-session');
const MongoStore = require('connect-mongo');
const app = express();
require("dotenv").config();

const PORT = process.env.PORT;

const routes = require("./routes"); //JSON routes
const pages = require("./pages"); //Page (Component) Loading //Routes for Page Loading

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({extended:true}));

app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI
    }),
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 * 1
    }  
}));

app.use(async function(req,res,next){
    if(req.session.currentUser){
    app.locals.user = req.session.currentUser;
    }else{
    app.locals.user = false;
    }
    next();
}) 

app.use("/component", pages);

app.get("/*", async function(req, res){
    let states = [];
    for(let x=1; x<req.url.split("/").length; x++){
        if(req.url.split("/")[x]!="")
            states.push(req.url.split("/")[x]);
        else{
            states.push("main");
        }
    }
    res.render('base',{states: states});
})

app.listen(PORT, function(){
    console.log(`Live at http://localhost:${PORT}/`);
})