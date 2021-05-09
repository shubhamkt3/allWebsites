var mongoose= require("mongoose");
 var campgroundSchema=new mongoose.Schema({
    name:String,
    price:String,
    image:String,
    description:String,
    author: {
     id:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
     },
     username: String
    },
    comments:[
     {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"   //problem is in this line 
     }
     ]
});
var camp=mongoose.model("camp",campgroundSchema);

module.exports= camp;
