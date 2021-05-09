var express= require("express");
var router= express.Router({mergeParams: true});
var camp=require("../models/campground");
var comment=require("../models/comment");
var middleware= require("../middleware");

//====================
//COMMENT ROUTE
router.get("/new",middleware.isLoggedIn , function(req,res){
    camp.findById(req.params.id, function(err,campground){
        if(err){
            console.log(err);
        }else{
                res.render("comments/new",{campground: campground});          
        }
    })
})

router.post("/",middleware.isLoggedIn , function(req,res){
    camp.findById(req.params.id, function(err,campground){
        if(err){
            console.log(err);
            res.redirect("/camp");
        }else{
               comment.create(req.body.comment, function(err,comment){
                   console.log("========================");
                   console.log(req.body);
                   if(err){
                       console.log(err);
                      
                   }else{
                        console.log("-------------");
                    
                       comment.author.id=req.user._id;
                       comment.author.username=req.user.username;
                       console.log(req.body);
                       comment.save();
                       console.log("======");
                       campground.comments.push(comment);
                       campground.save();
                       console.log(campground.comments);
                       console.log("-----");
                       req.flash("success","Successfully added comment");
                       res.redirect("/camp/"+campground._id);
                   }
               })          
        }
    })
})
//Edit Route
router.get("/:comment_id/edit", middleware.checkCommentOwnership ,function(req,res){
    comment.findById(req.params.comment_id, function(err, foundcomment){
        if(err){
            res.redirect("back");
        }else{
            res.render("comments/edit",{campground_id: req.params.id, comment: foundcomment});        
        }
    })
    
})
//Update route
router.put("/:comment_id", middleware.checkCommentOwnership ,function(req,res){
    comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedcomment){
        if(err){
            res.redirect("/");
        }else{
            res.redirect("/camp/"+req.params.id);
        }
    })
})
//Destroy Route
router.delete("/:comment_id",middleware.checkCommentOwnership ,function(req,res){
    comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        }else{
            req.flash("success","comment deleted");
            res.redirect("/camp/"+req.params.id);
        }
    })
})

module.exports=router;