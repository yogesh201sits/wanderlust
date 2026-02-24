const express = require("express");
const router = express.Router();
const app = express();

const { storage } = require("../cloudConfig.js");
const multer = require("multer");
const upload = multer({ storage });

const WrapAsync = require("../utils/WrapAsync.js");
const listing = require("../model/listing.js");
const Listing = require("../model/listing.js");
const {isLoggedIn, isOwner,validateListing} = require("../middleware.js");


const listingController = require("../controllers/listing.js");

// ,validateListing

router.route("/")
    .get(WrapAsync(listingController.index)) //index route
    .post(isLoggedIn,upload.single('listing[image]'),WrapAsync(listingController.createListing));  
    

//new route
router.get("/new",isLoggedIn,listingController.renderNewForn);


router.route("/:id")
    .get(WrapAsync(listingController.showListing)) //show listing
    .put(isLoggedIn,isOwner,upload.single('listing[image]'),WrapAsync(listingController.updateListing)) // update
    .delete(isLoggedIn,isOwner,WrapAsync(listingController.deleteListing)); //delete listing


//edit route
router.get("/:id/edit",isLoggedIn,WrapAsync(listingController.editListing));



module.exports = router;
