const express = require("express"),
    router = express.Router({mergeParams: true }),
    Campground = require("../models/campground"),
    middleware = require("../middleware")
    // NodeGeocoder = require('node-geocoder'),
    //     options = {
    //     provider: 'google',
    //     httpAdapter: 'https',
    //     apiKey: process.env.GEOCODER_API_KEY,
    //     formatter: null
    //     },
    // geocoder = NodeGeocoder(options);

//index
router.get("/", (req, res)=>{
    Campground.find({}, (err, campground) => {
        err ? console.log(err) : res.render("campgrounds/index", {campground: campground, page: 'campgrounds'});
    });
});

//new
router.get("/new", middleware.isLoggedIn, (req, res) => {
    res.render("campgrounds/new");
});

router.post("/", middleware.isLoggedIn, (req, res)=> {
    //var newCamp = req.body.campground;
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var price = req.body.price;
    var author = { id: req.user._id, username: req.user.username };
    // geocoder.geocode(req.body.location, function (err, data) {
    //     if (err || !data.length) {
    //       req.flash('error', 'Invalid address');
    //       return res.redirect('back');
    //     }
    //     var lat = data[0].latitude;
    //     var lng = data[0].longitude;
    //     var location = data[0].formattedAddress;
        var newCamp = { name: name, price: price, image: image, description: description, author: author}//,location: location, lat: lat, lng: lng}
        Campground.create(newCamp, (err, campground) => {
            if(err)
                console.log(err);
            
            res.redirect("/campgrounds");
        });
    // });
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
// UPDATE CAMPGROUND ROUTE
// router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
//   geocoder.geocode(req.body.location, function (err, data) {
//     if (err || !data.length) {
//       req.flash('error', 'Invalid address');
//       return res.redirect('back');
//     }
//     req.body.campground.lat = data[0].latitude;
//     req.body.campground.lng = data[0].longitude;
//     req.body.campground.location = data[0].formattedAddress;

//     Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, campground){
//         if(err){
//             req.flash("error", err.message);
//             res.redirect("back");
//         } else {
//             req.flash("success","Successfully Updated!");
//             res.redirect("/campgrounds/" + campground._id);
//         }
//     });
//   });
// });

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

module.exports = router;