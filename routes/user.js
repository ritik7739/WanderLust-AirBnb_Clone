const express=require("express");
const router=express.Router();
const User=require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport=require("passport");
const { saveRedirectUrl, LoggedIn }=require("../middleware.js");
const userContoller = require("../contollers/users.js");

router.get("/signup",userContoller.userSingupForm);

router.post("/signup",wrapAsync(userContoller.signup));

router.get("/login",userContoller.renderLoginForm);

router.post("/login",saveRedirectUrl,
    passport.authenticate("local",{ failureRedirect:'/login',failureFlash: true}),userContoller.Login);

router.get("/logout",userContoller.Logout);

module.exports=router; 