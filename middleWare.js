const Listing=require("./models/listing");
const Review=require("./models/review.js");
const {listingSchema,reviewSchema}=require("./schema.js");
const expressError=require("./utils/expressError.js");

module.exports.isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl= req.originalUrl;
        req.flash("error","you must be logged in to create listing");
        return  res.redirect("/login")
      };
      next();
}

module.exports.saveRedirectUrl = (req, res, next) => {
  req.locals = req.locals || {}; // Ensure req.locals is initialized
  if (req.session.redirectUrl) {
    req.locals.redirectUrl = req.session.redirectUrl; // Assign redirectUrl if it exists
  } else {
    req.locals.redirectUrl = '/default-path'; // Optional: Set a fallback redirect URL
  }
  next();
};

module.exports.isOwner=async(req,res,next)=>{
  let { id } = req.params;
  let listing= await Listing.findById(id)
  if(!listing.owner.equals(res.locals.currUser._id)){
    req.flash("error","You are not authorized to edit");
    return res.redirect(`/listings/${id}`)
  };
  next();
}

module.exports.validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join("");
    const err = new expressError(400, errMsg);
    return next(err);
  } else {
    next();
  }
};

module.exports.validateReview=(req,res,next)=>{
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join("");
    const err = new expressError(400, errMsg);
    return next(err);
  } else {
    next();
  }
};

module.exports.isReviewAuthor=async(req,res,next)=>{
  let {id, reviewId } = req.params;
  let review= await Review.findById(reviewId)
  if(!review.author.equals(res.locals.currUser._id)){
    req.flash("error","You are not authorized to delete review");
    return res.redirect(`/listings/${id}`)
  };
  next();
}