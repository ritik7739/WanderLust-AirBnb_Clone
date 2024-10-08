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
        type:String,
        default:"https://unsplash.com/photos/a-bunch-of-different-colored-sprinkles-on-a-pink-background-QhDs9x7o9Jc",
        set:(v)=> 
            v === ""?"https://unsplash.com/photos/a-bunch-of-different-colored-sprinkles-on-a-pink-background-QhDs9x7o9Jc" : v,
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