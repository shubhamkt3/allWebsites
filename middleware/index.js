var middlewareObj= {};
var camp=require("../models/campground");
var comment=require("../models/comment");

middlewareObj.checkCampgroundOwnership= function(req, res, next){
    if(req.isAuthenticated()){
            camp.findById(req.params.id, function(err, foundCampground){
            if(err){
            res.redirect("back");
            }
            else{
                if(foundCampground.author.id.equals(req.user._id)){
              next();         
                }
                 else{
                     req.flash("error","You don't have permission to do that");
                    res.redirect("back");
                 }  
            }
        });   
    }else{
        req.flash("error","You need to be logged in to do that");
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
            comment.findById(req.params.comment_id, function(err, foundcomment){
            if(err){
            res.redirect("back");
            }
            else{
                if(foundcomment.author.id.equals(req.user._id)){
              next();         
                }
                 else{
                     req.flash("error","You don't have permission to do that");
                    res.redirect("back");
                 }  
            }
        });   
    }else{
        req.flash("error","You need to be logged in to do that");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn =function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to logged in first");
    res.redirect("/login");
}

module.exports=middlewareObj;