const Campground = require("../models/campground"),
    Comment = require("../models/comment"),
    middelwareObj = {}

middelwareObj.checkCampgroundOwnership = function checkCampgroundOwnership(req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, (err, campground)=>{
            if(err){
                req.flash("error", "Campground not found");
                redirect("back");
            }else{
                if (!campground) {         //prevents crashing with fake id
                    req.flash("error", "Item not found.");
                    return res.redirect("back");
                }
                if(campground.author.id.equals(req.user._id)){
                    next();
                }else{
                    req.flash("error", "You don't have permissions for that");
                    res.redirect("back");
                }
            }
        });
    }else{
        req.flash("error", "You need logged in to do that");
        res.redirect("back");
    }
}

middelwareObj.checkCommentOwnership = function checkCommentOwnership(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, (err, comment)=>{
            if(err){
                req.flash("error", "Something went wrong");
                redirect("back");
            }else{
                if (!comment) {          //prevents crashing with fake id
                    req.flash("error", "Item not found.");
                    return res.redirect("back");
                }
                if(comment.author.id.equals(req.user._id)){
                    next();
                }else{
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    }else{
        req.flash("error", "You need logged in to do that");
        res.redirect("back");
    }
}

middelwareObj.isLoggedIn = function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need logged in to do that");
    res.redirect("/login");
}

module.exports = middelwareObj;