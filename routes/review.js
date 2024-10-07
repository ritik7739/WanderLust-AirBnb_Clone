const express=require("express");
//using for merge the routes with review routes
const router=express.Router({ mergeParams: true });
const {reviewSchema}=require("../Schema.js");
const Listing = require("../models/listing.js");
const ExpressError=require("../utils/ExpressError.js");
const wrapAsync=require("../utils/wrapAsync.js");
const Review = require("../models/review.js");

//validate Review middleware
const validateReview=(req,res,next)=>{
    let {error}=reviewSchema.validate(req.body);
    if(error){
      let errMsg=error.details.map((ele)=>ele.message).join(",");
      throw new ExpressError(400,errMsg);
    }else{
      next();
    }
  }

//reviews 
//Post Review Route
router.post("/",validateReview,wrapAsync(async(req,res)=>{
    let listing= await Listing.findById(req.params.id);
    let newReview= new Review(req.body.review);
  
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    console.log("new review saved");
    req.flash("success","New Review Created!");
    res.redirect(`/listings/${listing._id}`);
  }));
  

  //Delete Review Route
router.delete("/:reviewId",wrapAsync(async(req,res)=>{
    let {id,reviewId}=req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}})
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review Deleted!");
    res.redirect(`/listings/${id}`);
}));


module.exports=router;