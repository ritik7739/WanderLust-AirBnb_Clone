const express=require("express");
//using for merge the routes with review routes
const router=express.Router({ mergeParams: true });
const Listing = require("../models/listing.js");;
const wrapAsync=require("../utils/wrapAsync.js");
const Review = require("../models/review.js");
const {validateReview,LoggedIn}=require("../middleware.js");
const reviewController=require("../contollers/reviews.js");

//reviews 
//Post new Review Route
router.post("/",LoggedIn,validateReview,wrapAsync(reviewController.createReviews));
  
//Delete Review Route
router.delete("/:reviewId",wrapAsync(reviewController.deleteReview));


module.exports=router;