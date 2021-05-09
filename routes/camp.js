var express= require("express");
var router= express.Router();
var camp=require("../models/campground");
var comment=require("../models/comment");
var middleware= require("../middleware");

//index route
router.get("/camp",function(req,res){
    camp.find({}, function(err,allcamp){
        if(err){
            console.log("Something went wrong$4");
            console.log(err);
        }
        else{
            console.log("all the camps");
            res.render("campgrounds/camp",{campground:allcamp, currentUser: req.user});
        }});
   /* res.render("camp",{campground:campground});*/
});
//create route
router.post("/camp",middleware.isLoggedIn, function(req,res){
    var name=req.body.name;
    var price=req.body.price;
    var img=req.body.image;
    var desc=req.body.description;
    var author={
        id: req.user._id,
        username: req.user.username
    }
    var newcampground={name:name,price:price, image:img, description:desc, author:author};
    camp.create(newcampground, function(err,newcampgr){
        if(err){
            console.log("Something went wrong@@");
            console.log(err);
        }
        else{
            console.log(newcampgr);
            req.flash("success","Successfully added new campground");
              res.redirect("/camp");
        }});
})
//new route
router.get("/camp/new",middleware.isLoggedIn, function(req,res){
    res.render("campgrounds/new");
})

//SHOW ROUTE
router.get("/camp/:id", function(req,res){
    camp.findById(req.params.id).populate("comments").exec(function(err, foundcamp){
        
        if(err){
            console.log("something went wrong!!!");
        }else{
            res.render("campgrounds/show",{campground:foundcamp});
        }
    })
})
//EDIT ROUTE
router.get("/camp/:id/edit",middleware.checkCampgroundOwnership, function(req, res){
  
            camp.findById(req.params.id, function(err, foundCampground){
                if(foundCampground.author.id.equals(req.user._id)){
                 res.render("campgrounds/edit", {campground: foundCampground});          
                }
    });
    
});
//UPDATE ROUTE
router.put("/camp/:id",middleware.checkCampgroundOwnership, function(req,res){
    camp.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err)
        {
            res.redirect("/camp");
        }else{
            res.redirect("/camp/"+req.params.id);
        }
    })
})
//DELETE ROUTE
router.delete("/camp/:id",middleware.checkCampgroundOwnership, function(req,res){
    camp.findByIdAndRemove(req.params.id, function(err){
        if(err)
        {
            res.redirect("/camp");
        }else{
            res.redirect("/camp");
        }
    })
})





module.exports=router;