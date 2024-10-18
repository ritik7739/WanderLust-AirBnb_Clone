const mongoose=require("mongoose");
const Review = require("./review");
const { listingSchema } = require("../Schema");


let listingSchemas=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    image:{
        url:String,
        filename:String,
    },
    price:Number,
    location:String,
    country:String,
    reviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Review",
        },
    ],
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
});

//middleware for deleting reviews when/after deleting listing
listingSchemas.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id:{$in: listing.reviews}});
    }
});

const Listing=mongoose.model("Listing",listingSchemas);
module.exports=Listing;