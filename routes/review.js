const express=require("express");
//using for merge the routes with review routes
const router=express.Router({ mergeParams: true });
const Listing = require("../models/listing.js");;
const wrapAsync=require("../utils/wrapAsync.js");
const Review = require("../models/review.js");
const {validateReview,LoggedIn}=require("../middleware.js")

//reviews 
//Post Review Route
router.post("/",LoggedIn,validateReview,wrapAsync(async(req,res)=>{
    let listing= await Listing.findById(req.params.id);
    let newReview= new Review(req.body.review);
    
    //also store the author of the review
    newReview.author=req.user._id;
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