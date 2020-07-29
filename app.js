require('dotenv').config();

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
	dbCred = process.env['mdbURL_PROD']
//seedDB();
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(flash());
mongoose.connect(dbCred, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
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

app.listen(process.env.PORT || 3000, ()=>{
	console.log("app started");
});
