var mongoose= require("mongoose");
var campground= require("./models/campground");
var Comment=require("./models/comment");
var data= [
        {
            name: "Nighty-night", 
            image: "https://farm9.staticflickr.com/8422/7842069486_c61e4c6025.jpg",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
        },
        
        {
            name: "Desert Mesa", 
            image: "https://farm4.staticflickr.com/3742/10759552364_a796a5560a.jpg",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
        },
        
        {
            name: "Mountain View", 
            image: "https://farm7.staticflickr.com/6105/6381606819_df560e1a51.jpg",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
        }
];

function seedDB(){
    campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds");
         data.forEach(function(seed){
    campground.create(seed, function(err,camp){
        if(err){
            console.log(err);
        }else{
            console.log("camp is added")
            console.log(seed);
            //create a comment
            Comment.create({
                text:"this place is awesome but i wish there was internet",
                author: "skt"
            }, function(err, comments){
                if(err){
                    console.log("error");
                }else{
                    console.log(comments);
                        camp.comments.push(comments._id);
                        camp.save();
                        
                        console.log("created new comment");
                }
            });console.log("commentttt");
        }
    })     ;
    });
   
    });
   
}

module.exports= seedDB;