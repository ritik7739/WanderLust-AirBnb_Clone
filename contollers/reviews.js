const Listing=require("../models/listing");
const Review=require("../models/review.js");

//Routes for createReviews
module.exports.createReviews=async(req,res)=>{
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
};

//routes for deleteReview
module.exports.deleteReview=async(req,res)=>{
    let {id,reviewId}=req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}})
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review Deleted!");
    res.redirect(`/listings/${id}`);
};