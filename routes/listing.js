const express = require("express");
const router = express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner,validateListing}=require("../middleWare.js");
const listingController=require("../controllers/listingController.js");
const multer  = require('multer');
const {storage}=require("../cloudConfig.js");
const upload = multer({storage});

//Index Route
router.get("/",wrapAsync(listingController.index));

// Search Route
router.get("/search", wrapAsync(listingController.searchListings));

//New Route
router.get("/new",isLoggedIn,listingController.newList);

//Show Route
router.get("/:id",wrapAsync(listingController.showList));

//Create Route
router.post("/",isLoggedIn,upload.single("listing[image]"),validateListing,wrapAsync(listingController.createList));

//Edit Route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.editList));

//Update Route
router.put("/:id",isLoggedIn,upload.single("listing[image]"),validateListing,wrapAsync(listingController.updateList));

//Delete Route
router.delete("/:id/delete",isLoggedIn,wrapAsync(listingController.deleteList));


module.exports= router;