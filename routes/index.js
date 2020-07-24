const express = require("express"),
    router = express.Router(),
    passport = require("passport"),
    User = require("../models/user")

router.get("/", (req, res) => {
    res.render("landing");
});

//auth
router.get("/register", (req, res)=>{
    res.render("register",{page: 'register'});
});

router.post("/register", (req, res) => {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, (err, user)=>{
        if(err){
            console.log(err);
            return res.render("register", {error: err.message});
        }

        passport.authenticate("local")(req, res, ()=>{
            req.flash("success", "Welcome to Yelpcamp " + user.username + "!");
            res.redirect("/campgrounds");
        });
    });
});

router.get("/login", (req, res)=>{
    res.render("login",{page: 'login'});
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), (req, res)=>{

});

router.get("/logout", (req, res)=>{
    req.logout();
    req.flash("success", "Logged You Out!");
    res.redirect("/campgrounds");
});

module.exports = router;