const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {LoggedIn,isOwner,validateLisiting} =require("../middleware.js");
const listingController=require("../contollers/listing.js");

//Index all data
router.get("/", wrapAsync(listingController.index));
  
//New Route
router.get("/new", LoggedIn,listingController.renderNewForm);

//show Route
router.get("/:id", wrapAsync(listingController.showListing));
  
//Create Route
router.post("/",validateLisiting,wrapAsync(listingController.createListing));
  
//edit Route
router.get("/:id/edit", LoggedIn,isOwner,wrapAsync(listingController.editListing));
  
//update Route
router.put("/:id",validateLisiting,LoggedIn,isOwner, wrapAsync(listingController.updateListing));
  
//delete Route
router.delete("/:id",LoggedIn,isOwner,wrapAsync(listingController.deleteListing));


module.exports=router;