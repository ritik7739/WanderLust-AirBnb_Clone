const Listing=require("./models/listing")
const {listingSchema,reviewSchema}=require("./Schema.js");
const ExpressError=require("./utils/ExpressError.js");


module.exports.validateReview=(req,res,next)=>{
    let {error}=reviewSchema.validate(req.body);
    if(error){
      let errMsg=error.details.map((ele)=>ele.message).join(",");
      throw new ExpressError(400,errMsg);
    }else{
      next();
    }
  }


module.exports.LoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","You must be loggedIn for make any changes!");
        return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner=async (req,res,next)=>{
    let {id}=req.params;
    let listing= await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currUser._id)){
        req.flash("error","You're not the owner of this listing");
        return res.redirect(`/listings/${id}`);
    }
}

//ValidateListing middleware
module.exports.validateLisiting=(req,res,next)=>{
    let {error}=listingSchema.validate(req.body);
    if(error){
      let errMsg=error.details.map((ele)=>ele.message).join(",");
      throw new ExpressError(400,errMsg);
    }else{
      next();
    }
}