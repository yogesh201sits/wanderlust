const  listing = require("./model/listing");
const ExpressError = require("./utils/ExpressError.js");
const {ListingSchema,ReviewSchema} = require("./schema.js");
const Review = require("./model/review.js");

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be logged in");
        return res.redirect("/login");
    }
    next();
};

module.exports.saveRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl ;
    }
    next();
}

module.exports.isOwner = async(req,res,next)=>{
    let {id} = req.params;
    let data= await listing.findById(id);
    if(!data.owner.equals(res.locals.currUser._id)){
        req.flash("error","You are not the owner of this listing");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.isReviewAuthor = async(req,res,next)=>{
    let{id,reviewId} = req.params;
    let data= await Review.findById(reviewId);
    if(!data.author._id.equals(res.locals.currUser._id)){
        req.flash("error","You are not the owner of this review");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.validateListing = (err,req,res,next)=>{
    let {error} = ListingSchema.validate(req.body);
    if(error){
        throw new ExpressError(400,error);
    }
    else{
        next();
    }
}


module.exports.validateReview = (err,req,res,next)=>{
    let {error} = ReviewSchema.validate(req.body);
    if(error){
        throw new ExpressError(400,error);
    }
    else{
        next();
    }
}
