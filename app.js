require('dotenv').config(); //see slide for setting up in heroku, also google dev console and whitelist heroku url
//hide/encrypt all passwords and keys --https://www.youtube.com/watch?v=B4OuCjQLJ9k 19:50 explains that GIT can hide this file type.
//do a git status to see if .env shows up

const express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose"),
	passport = require("passport"),
	LocalStrategy = require("passport-local"),
	methodOverride = require("method-override"),
	Campground = require("./models/campground"),
	Comment = require("./models/comment"),
	User = require("./models/user"),
	flash = require('connect-flash'),
	commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index"),
	seedDB = require("./seed"),
	dbCred = process.env.mdbURL_Prod
//seedDB();
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(flash());
mongoose.connect("mongodb+srv://wharter1980:Erinjean12*@cluster0-sxrqj.mongodb.net/test?retryWrites=true&w=majority", {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
.then(() => {
	console.log("mongodb connected");
})
.catch(err => {
	console.log("ERROR:", err);
});

app.use(require("express-session")({
	secret: "Eric",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use((req, res, next)=>{
	app.locals.currentUser = req.user || null;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use(indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds",campgroundRoutes);

app.listen(3000, ()=>{
	console.log("DEV started");
});

// app.listen(process.env.PORT, ()=>{
// 	console.log("app started");
// });
