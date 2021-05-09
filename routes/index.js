var express= require("express");
var router= express.Router();
var passport=require("passport");
var user=require("../models/user");

router.get("/",function(req,res){
    res.render("home");
});


//AUTH ROUTES
//SHOW register form
router.get("/register", function(req,res){
    res.render("register");
});

//handling user sign up
router.post("/register", function(req,res){
   user.register(new user({username: req.body.username}), req.body.password, function(err,user){
       if(err){
           req.flash("error",err.message);
           return res.redirect("/register");
       }
       passport.authenticate("local")(req,res,function(){
           req.flash("success","Welcome to YelpCamp"+user.username);
           res.redirect("/camp");
       });
   });
});

//LOGIN ROUTE
router.get("/login", function(req,res){
    res.render("login");
})
router.post("/login",passport.authenticate("local",{
    successRedirect: "/camp",
    failureRedirect: "/login"
}), function(req,res){
    
});

//LOGOUT ROUTE
router.get("/logout", function(req,res){
    req.logout();
    req.flash("success","successfully logged out");
    res.redirect("/camp");
});


module.exports=router;