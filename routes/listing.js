const express =require("express");
const router =express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const Listing =require("../models/listing.js");

const {isLoggedIn, isOwner,validateListing}=require("../middleware.js");
const listingController=require("../controllers/listing.js");
const { upload } = require("../cloudConfig");  // Updated to import multer-S3 setup

router
.route("/")
.get(wrapAsync(listingController.index))
.post(
  isLoggedIn,
  upload.single('listing[image]'),
  validateListing,
  wrapAsync(listingController.createListing)
  );

  // new route
router.get("/new",isLoggedIn,listingController.renderNewForm);



router
    .route("/:id")
    .get(wrapAsync(listingController.showListings))
    .put(
        isLoggedIn,
        isOwner,
        upload.single('listing[image]'),  // Use S3 for image upload
        validateListing,
        wrapAsync(listingController.updateListing)
    )
    .delete(
        isLoggedIn,
        isOwner,
        wrapAsync(listingController.deleteListing)
    );



// edit route
router.get("/:id/edit",isLoggedIn,
    isOwner,
    wrapAsync(listingController.renderEditForm));



module.exports=router;