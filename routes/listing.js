const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {LoggedIn,isOwner,validateLisiting} =require("../middleware.js");


//Index all data
router.get("/", wrapAsync(async (req, res) => {
    const allListing = await Listing.find({});
    res.render("listings/index.ejs", { allListing });
  }));
  
  //New Route
  router.get("/new", LoggedIn,(req, res) => {
    res.render("listings/new.ejs");
  });
  
  //Create Route
  router.post("/",validateLisiting,wrapAsync(async (req, res, next) => {
    //for extraction we use either below method or key value object pair in ejs with name variable
    //  let {id,title,description,image,price,location,country}=req.body;
    // let listing=req.body.listing;
    // console.log(listing);
      const newListing = new Listing(req.body.listing);
      newListing.owner=req.user._id;
      await newListing.save();
      req.flash("success","New Listing Created!");
      res.redirect("/listings");
  }));
  
  //edit Route
  router.get("/:id/edit", LoggedIn,isOwner,wrapAsync(async(req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if(!listing){
      req.flash("error","Listing you requested for doesn't exist");
      res.redirect("/listings");
    }
    res.render("listings/edit.ejs", { listing });
  }));
  
  //update Route
  router.put("/:id",validateLisiting,LoggedIn,isOwner, wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success","Listing Updated!");
    res.redirect("/listings");
  }));

  
  //delete Route
router.delete("/:id",LoggedIn,isOwner,wrapAsync(async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success","Listing Deleted!");
    res.redirect("/listings");
  }));
  
  //show Route
router.get("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate({path:"reviews",populate:{
      path:"author",
    },}).populate("owner");
    if(!listing){
      req.flash("error","Listing you requested for doesn't exist");
      res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
  }));


  module.exports=router;