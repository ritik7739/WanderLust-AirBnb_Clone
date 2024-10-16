const express=require("express");
const router=express.Router();
const User=require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport=require("passport");
const { saveRedirectUrl, LoggedIn }=require("../middleware.js");
const userContoller = require("../contollers/users.js");

//combining signup routes
router.route("/signup")
.get(userContoller.userSingupForm)
.post(wrapAsync(userContoller.signup));

//Combining login routes
router.route("/login")
.get(userContoller.renderLoginForm)
.post(saveRedirectUrl,
    passport.authenticate("local",{ failureRedirect:'/login',failureFlash: true}),userContoller.Login);

router.get("/logout",userContoller.Logout);

module.exports=router; 