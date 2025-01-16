const express = require("express");
const router=express.Router({mergeParams:true});
const User=require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleWare");

const userController=require("../controllers/userController")


router.get("/signup",userController.signUp);

router.post("/signup",wrapAsync(userController.signupUser));

router.get("/login",userController.login);

router.post("/login",   
    saveRedirectUrl,
    passport.authenticate("local",
    {failureRedirect:'/login', failureFlash:true}),
    userController.loginUser
);

router.get("/logout",userController.logout);

module.exports=router;