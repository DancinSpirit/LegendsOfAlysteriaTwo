const express = require("express");
const session = require('express-session');
const MongoStore = require('connect-mongo');
const app = express();
const db = require("./models");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const PORT = process.env.PORT;

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({extended:true}));

/* Auth Session */
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

/* Auth */
app.use(function(req,res,next){
    if(req.session.currentUser){
    app.locals.user = req.session.currentUser;
    }else{
    app.locals.user = false;
    }
    next();
}) 

/* Home Page Loading */
app.get("/", function(req,res){
    res.render('base',{states: ["main"]});
})

/* Component Loading */
app.get("/component/:component", async function(req,res){
    let context = {};
    if(req.body.model){
        let model = eval(`db.${req.body.model.name}.findById(${req.body.model.id})`)
        context = eval(`{${req.body.model.name}: model}`)
    }
    res.render(`components/${req.params.component}`, context);
})

/* Page Loading */
app.get("/*", function(req, res){
    let states = [];
    for(let x=1; x<req.url.split("/").length; x++){
            states.push(req.url.split("/")[x]);
    }
    res.render('base',{states: states});
})

/* Login */
app.post("/login", async function(req, res){
    const foundUser = await db.User.findOne({username: req.body.username});
    if(!foundUser) return res.send({displayText: "That username doesn't exist!"})
    const match = await bcrypt.compare(req.body.password, foundUser.password);
    if(!match) return res.send({displayText: "Password Invalid"});
    req.session.currentUser = foundUser;
    if(foundUser.gamemaster)
    return res.send("Welcome Gamemaster!");
    else
    return res.send("Login Successful!");
})

/* Register */
app.post("/register", async function(req, res){
    const foundUser = await db.User.findOne({username: req.body.username});
    if(foundUser) return res.send("This username already exists!");
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    req.body.password = hash;
    req.body.avatar = "/images/avatar_placeholder.png";
    req.body.bio = "This user hasn't written a bio yet!";
    req.body.gamemaster = false;
    const newUser = await db.User.create(req.body);
    console.log(newUser);
    req.session.currentUser = newUser;
    return res.send("Registration Successful!");
})

app.listen(PORT, function(){
    console.log(`Live at http://localhost:${PORT}/`);
})