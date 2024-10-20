const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const {LoggedIn,isOwner,validateLisiting} =require("../middleware.js");
const listingController=require("../contollers/listing.js");
const multer  = require('multer');
const {storage}=require("../cloudConfig.js");
const upload = multer({ storage });


//Combining index route(Index all data) and Create Route
router.route("/")
.get(wrapAsync(listingController.index))
.post(LoggedIn,upload.single('listing[image]'),validateLisiting,wrapAsync(listingController.createListing));


//New Route
router.get("/new", LoggedIn,listingController.renderNewForm);

//Combining show Route,update route and delete Route
router.route("/:id")
.get( wrapAsync(listingController.showListing))
.put(LoggedIn,isOwner,upload.single('listing[image]'),validateLisiting, wrapAsync(listingController.updateListing))
.delete(LoggedIn,isOwner,wrapAsync(listingController.deleteListing));

//edit Route
router.get("/:id/edit", LoggedIn,isOwner,wrapAsync(listingController.editListing));

module.exports=router;