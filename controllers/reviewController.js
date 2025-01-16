const Listing = require("../models/listing.js");
const review=require("../models/review.js");

module.exports.createReview=async(req,res)=>{
    let { id } = req.params;
    let listing = await Listing.findById(id);

    if (!listing) {
      req.flash("error", "Listing not found");
      return res.redirect("/listings");
    }
    let newReview=new review(req.body.review)
    newReview.author=req.user._id;
    listing.reviews.push(newReview)
    await newReview.save();
    await listing.save();

    req.flash("success","New Review is created");
    res.redirect(`/listings/${id}`);  
};


module.exports.deleteReview=async (req, res) => {
    let { id,reviewId } = req.params;
// &pull:it removes from an existing array all instance of a value or values that match the specific condition
    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await review.findByIdAndDelete(reviewId)
    req.flash("success","Review Is Deleted");
    res.redirect(`/listings/${id}`)
};