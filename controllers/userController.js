const User=require("../models/user");
const passport = require("passport");


module.exports.signUp=(req,res)=>{
    res.render("users/signup.ejs")
};

// for post route
module.exports.signupUser=async(req,res)=>{
    try{
    let {username,email,password}=req.body;
    const newUser=new User({email,username});
    const registeredUser=await User.register(newUser,password);
    req.login(registeredUser,(err)=>{
        if(err){
            return next(err)
        }
        req.flash("success","Welcome to Roomzy")
        res.redirect("/listings")
    })
    }catch(err){
        req.flash("error",err.message)
        res.redirect("/signup")
    }

};

module.exports.login=(req,res)=>{
    res.render("users/login.ejs")
};

// login for post route
module.exports.loginUser=async(req,res)=>{
    req.flash("success","Welcome back");
    let redirectUrl=res.locals.redirectUrl ||"/listings"
    res.redirect(redirectUrl);
};

module.exports.logout=(req,res,rext)=>{
    req.logout((err)=>{
        if(err){
            next(err)
        }
        req.flash("success","Logged Out")
        res.redirect("/listings")
    });
};