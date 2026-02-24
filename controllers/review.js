const review = require("../model/review.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../model/listing.js");

module.exports.addReview = async(req,res)=>{
    
    let listing=await Listing.findById(req.params.id);

    let newReview = new review(req.body.review);
    newReview.author = req.user._id;
    console.log(newReview);
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    req.flash("success","review added successfully");
    res.redirect(`/listings/${req.params.id}`);

}

module.exports.deleteReview = async(req,res)=>{
    let{id,reviewId} = req.params;
    let res2=await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await review.findByIdAndDelete(reviewId);
     req.flash("success","review deleted successfully");
    console.log("problem");
    res.redirect(`/listings/${id}`);
}