const express = require("express");
const router=express.Router();
const Listing = require("../models/listing.js");
const review=require("../models/review.js");
const wrapAsync=require("../utils/wrapAsync.js")
const expressError=require("../utils/expressError.js");
const {validateReview, isLoggedIn,isReviewAuthor}=require("../middleWare.js");

const reviewController=require("../controllers/reviewController.js")

//  Create reviews
router.post("/:id/reviews",isLoggedIn,validateReview,reviewController.createReview);

// delete review
router.delete("/:id/reviews/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewController.deleteReview));

module.exports=router;