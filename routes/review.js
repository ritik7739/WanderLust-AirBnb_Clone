const express=require("express");
//using for merge the routes with review routes
const router=express.Router({ mergeParams: true });
const wrapAsync=require("../utils/wrapAsync.js");
const {validateReview,LoggedIn,isReviewAuthor}=require("../middleware.js");
const reviewController=require("../contollers/reviews.js");

//reviews 
//Post new Review Route
router.post("/",LoggedIn,validateReview,wrapAsync(reviewController.createReviews));
  
//Delete Review Route
router.delete("/:reviewId",LoggedIn,isReviewAuthor,wrapAsync(reviewController.deleteReview));


module.exports=router;