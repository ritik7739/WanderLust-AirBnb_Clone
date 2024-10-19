const Listing=require("../models/listing");

//Index all data
module.exports.index=async (req, res) => {
    const allListing = await Listing.find({});
    res.render("listings/index.ejs", { allListing });
};

 //New Route
module.exports.renderNewForm=(req, res) => {
    res.render("listings/new.ejs");
};

//Show routes
module.exports.showListing=async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate({path:"reviews",populate:{
      path:"author",
    },}).populate("owner");
    if(!listing){
      req.flash("error","Listing you requested for doesn't exist");
      res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
};

//create route
module.exports.createListing=async (req, res, next) => {
    //for extraction we use either below method or key value object pair in ejs with name variable
    //  let {id,title,description,image,price,location,country}=req.body;
    // let listing=req.body.listing;
    // console.log(listing);
      let url=req.file.path;
      let filename=req.file.filename;
      const newListing = new Listing(req.body.listing);
      newListing.owner=req.user._id;
      newListing.image={url,filename};
      await newListing.save();
      req.flash("success","New Listing Created!");
      res.redirect("/listings");
};

//Edit Route
module.exports.editListing=async(req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if(!listing){
      req.flash("error","Listing you requested for doesn't exist");
      res.redirect("/listings");
    }
    let OriginalImageUrl=listing.image.url;
    OriginalImageUrl=OriginalImageUrl.replace("/upload","/upload/w_250");
    res.render("listings/edit.ejs", { listing ,OriginalImageUrl});
};

//update Route
module.exports.updateListing=async (req, res) => {
    let { id } = req.params;
    let listing=await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    
    if(typeof req.file !=="undefined"){
    let url=req.file.path;
    let filename=req.file.filename;
    listing.image={url,filename};
    await listing.save();
    }

    req.flash("success","Listing Updated!");
    res.redirect("/listings");
};

//delete Route
module.exports.deleteListing=async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success","Listing Deleted!");
    res.redirect("/listings");
};