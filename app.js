var express=require("express"),
 app=express(),
 bodyparser=require("body-parser"),
 passport=require("passport"),
  localstrategy=require("passport-local"),
      flash=require("connect-flash"),
  methodOverride=require("method-override"),
 mongoose=require("mongoose"),
 camp=require("./models/campground"),
 comment=require("./models/comment"),
 user=require("./models/user"),
 seedDB= require("./seeds")
 
 var commentRoutes= require("./routes/comments"),
     campRoutes=require("./routes/camp"),
     indexRoutes=require("./routes/index");

 //seedDB(); 
mongoose.Promise= global.Promise;
 mongoose.connect("mongodb://localhost/Yelp_camp");
app.set("view engine","ejs");
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
//PASSPORT CONFIGURATIon
app.use(require("express-session")({
    secret: "this is my world",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localstrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser=req.user;
    res.locals.error=req.flash("error");
    res.locals.success=req.flash("success");
    
    next();
})

app.use(indexRoutes);
app.use("/camp/:id/comments",commentRoutes);
app.use(campRoutes);


app.listen(3000,'127.0.0.1',function(){
    console.log("server has started");
}) 