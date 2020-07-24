const express = require("express"),
    router = express.Router({ mergeParams: true }),
    Campground = require("../models/campground"),
    Comment = require("../models/comment"),
    middleware = require("../middleware")

router.get("/new", middleware.isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, (err, campground)=>{
        err ? console.log(err) : res.render("comments/new", {campground: campground });
    });
});

router.post("/", middleware.isLoggedIn, (req,res)=>{
    Campground.findById(req.params.id, (err, campground)=> {
        if(err){
            req.flash("error", "Something went wrong");
            console.log(err);
        }
        
        Comment.create(req.body.comment, (err, comment)=> {
            comment.author.id = req.user._id;
            comment.author.username = req.user.username;
            comment.save();
            campground.comment.push(comment);
            campground.save();
            req.flash("success","Successfully added comment")
            res.redirect("/campgrounds/" + campground._id);
        });
    });
});

router.get("/:comment_id/edit", middleware.checkCommentOwnership, (req, res)=>{
    Comment.findById(req.params.comment_id, (err, comment)=>{
        err ? res.redirect("back") : res.render("comments/edit",{campground_id: req.params.id, comment: comment});
    });
});

router.put("/:comment_id", middleware.checkCommentOwnership, (req, res)=>{
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, comment) => {
        if(err){
            console.log(err);
            res.redirect("back");
        }

        res.redirect("/campgrounds/" + req.params.id);
    });
});

router.delete("/:comment_id", middleware.checkCommentOwnership, (req, res)=>{
    Comment.findByIdAndRemove(req.params.comment_id, err =>{
        if(err){
            res.redirect("back") 
        }else{
            req.flash("success", "Successfully deleted comment");
            res.redirect("/campgrounds/" + req.params.id);
        } 
    });
});


module.exports = router;