const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = 3000;
const path = require("path");
const dotenv=require("dotenv");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError=require("./utils/ExpressError.js");
const session=require("express-session");
const flash=require("connect-flash");
const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user.js");

const reviewsRouter=require("./routes/review.js");
const listingsRouter=require("./routes/listing.js");
const userRouter=require("./routes/user.js");

dotenv.config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

const MONGO_URL = process.env.MONGO_URI;

main()
  .then(() => {
    console.log("sucessfully connected to DB");
  })
  .catch((err) => {
    console.log("ERROR", err);
  });
async function main() {
  await mongoose.connect(MONGO_URL);
}

const sessionOptions={
  secret:"mysupersecretcode",
  resave:false,
  saveUninitialized:true,
  cookie:{
    expires:Date.now()+ 7*24*60*60*1000,
    maxAge:7*24*60*60*1000,// I just want be save cookies for 7 days having ==> 7 days *24 hours*60 minute*60sec*1000 for mill
    httpOnly:true,
   }
}

app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//Root Path
app.get("/", (req, res) => {
  res.send("Root path is working");
});

app.use((req,res,next)=>{
  res.locals.success=req.flash("success");
  res.locals.error=req.flash("error");
  res.locals.currUser=req.user;
  next();
});

app.use("/listings",listingsRouter);
app.use("/listings/:id/reviews",reviewsRouter);
app.use("/",userRouter)


//for all routes except the above route
app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Page Not Found!"));
});

//Error Handling for Price
app.use((err, req, res, next) => {
  let {statusCode=500,message="Something Went Wrong"}=err;
  res.status(statusCode).render("error.ejs",{message});
});

app.listen(PORT, () => {
  console.log(`app is listening on port :${PORT}`);
});
