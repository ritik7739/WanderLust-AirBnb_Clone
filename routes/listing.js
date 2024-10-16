const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {LoggedIn,isOwner,validateLisiting} =require("../middleware.js");
const listingController=require("../contollers/listing.js");

//Combining index route(Index all data) and Create Route
router.route("/")
.get(wrapAsync(listingController.index))
.post(validateLisiting,wrapAsync(listingController.createListing));
  
//New Route
router.get("/new", LoggedIn,listingController.renderNewForm);

//Combining show Route,update route and delete Route
router.route("/:id")
.get( wrapAsync(listingController.showListing))
.put(validateLisiting,LoggedIn,isOwner, wrapAsync(listingController.updateListing))
.delete(LoggedIn,isOwner,wrapAsync(listingController.deleteListing));

//edit Route
router.get("/:id/edit", LoggedIn,isOwner,wrapAsync(listingController.editListing));

module.exports=router;