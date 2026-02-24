const express = require("express");
const router = express.Router({mergeParams:true});
const listing = require("../model/listing.js");
const Listing = require("../model/listing.js");
const WrapAsync = require("../utils/WrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const review = require("../model/review.js");
const Review = require("../model/review.js");
const {validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");


const reviewController = require("../controllers/review.js");

//add review
router.post("/",validateReview,isLoggedIn,WrapAsync(reviewController.addReview));

//delete reviwe route
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,WrapAsync(reviewController.deleteReview));

module.exports=router;