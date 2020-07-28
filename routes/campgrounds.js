const express = require("express"),
    router = express.Router({mergeParams: true }),
    Campground = require("../models/campground"),
    middleware = require("../middleware")

//index
router.get("/", function(req, res){
    var noMatch = null;
    if(req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        Campground.find({name: regex}, function(err, allCampgrounds){
           if(err){
               console.log(err);
           } else {
              if(allCampgrounds.length < 1) {
                  noMatch = "No campgrounds match that query, please try again.";
              }
              res.render("campgrounds/index",{campground:allCampgrounds, noMatch: noMatch});
           }
        });
    } else {
        Campground.find({}, function(err, allCampgrounds){
           if(err){
               console.log(err);
           } else {
              res.render("campgrounds/index",{campground:allCampgrounds, noMatch: noMatch});
           }
        });
    }
});

//new
router.get("/new", middleware.isLoggedIn, (req, res) => {
    res.render("campgrounds/new");
});

router.post("/", middleware.isLoggedIn, (req, res)=> {
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var price = req.body.price;
    var author = { id: req.user._id, username: req.user.username };
        var newCamp = { name: name, price: price, image: image, description: description, author: author}
        Campground.create(newCamp, (err, campground) => {
            if(err)
                console.log(err);
            
            res.redirect("/campgrounds");
        });
});

//show
router.get("/:id", (req, res) => {
    Campground.findById(req.params.id).populate("comment").exec((err, campground) => {
        err ? console.log(err) : res.render("campgrounds/show", {campground: campground});
    });
});

//Edit
router.get("/:id/edit", middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findById(req.params.id, (err, campground)=>{
        res.render("campgrounds/edit", {campground: campground});
    });
});

//Update
router.put("/:id", middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, camp) => {
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }

        res.redirect("/campgrounds/" + camp._id);
    });
});

//Destroy - try catch to delet associated comments
router.delete("/:id", async(req, res)=>{
    try{
        let campground = await Campground.findById(req.params.id);
        await campground.remove();
        res.redirect("/campgrounds");
    }catch (error) {
        console.log(error.message);
        res.redirect("/campgrounds");
    }
});

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = router;