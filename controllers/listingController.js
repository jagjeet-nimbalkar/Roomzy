const Listing=require("../models/listing");

module.exports.index=async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
};

module.exports.newList=(req, res) => {
    res.render("listings/new.ejs");
};

module.exports.showList=async(req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate({path:"reviews",
      populate:{
        path:"author",
      }
    }).populate("owner");
    
    if(!listing){
      req.flash("error","Requested listing does not exist!");
      res.redirect("/listings")
    }
    res.render("listings/show.ejs", { listing });
};

module.exports.createList=async(req, res,next) => {
  const {location}=req.body.listing;
  const mapToken=process.env.MAP_TOKEN
  const geocodeUrl = `https://api.maptiler.com/geocoding/${encodeURIComponent(location)}.json?key=${mapToken}`;
  const response = await fetch(geocodeUrl);
  const data = await response.json();
    
  let latitude, longitude;
    
    if (data.features && data.features.length > 0) {
      [longitude, latitude] = data.features[0].geometry.coordinates;
    } else {
      req.flash("error", "Could not geocode the location. Please try again.");
      return res.redirect("/create-listing");
    }

  const { path, filename } = req.file;
  const newListing = new Listing(req.body.listing);
  newListing.owner=req.user._id;
  newListing.image = {
      url: path,      
      filename: filename  
    };
  newListing.geometry = {
      type: "Point", 
      coordinates: [longitude, latitude],
    };
  await newListing.save();
  req.flash("success","New Listing is created");
  res.redirect("/listings");
};

module.exports.editList=async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
      req.flash("error","Requested listing does not exist!");
      res.redirect("/listings")
    }
    let orignalImageUrl=listing.image.url;
    orignalImageUrl=orignalImageUrl.replace("/upload","/upload/w_250");
    res.render("listings/edit.ejs", { listing,orignalImageUrl});
};

module.exports.updateList=async (req, res) => {
  const {location}=req.body.listing;
  const mapToken=process.env.MAP_TOKEN
  const geocodeUrl = `https://api.maptiler.com/geocoding/${encodeURIComponent(location)}.json?key=${mapToken}`;
  const response = await fetch(geocodeUrl);
    const data = await response.json();
      
      let latitude, longitude;
      
      if (data.features && data.features.length > 0) {
        [longitude, latitude] = data.features[0].geometry.coordinates;
      } else {
        req.flash("error", "Could not geocode the location. Please try again.");
        return res.redirect("/create-listing");
      }

  let { id } = req.params;
  let listing=await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  if(typeof req.file !=="undefined"){
      const { path, filename } = req.file;
      listing.image = {
        url: path,      
        filename: filename  
      };
    }
  listing.geometry={
    type: "Point", 
    coordinates: [longitude, latitude],
  }
  await listing.save();
    req.flash("success","Listing Is Updated");
    res.redirect(`/listings/${id}`);
};

module.exports.deleteList=async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  req.flash("success","Listing Deleted");
  res.redirect("/listings");
};


module.exports.searchListings = async (req, res) => {
  const query = req.query.query; 
  if (!query) {
    req.flash("error", "Please enter a search term.");
    return res.redirect("/listings");
  }
  const results = await Listing.find({
    $or: [
      { title: { $regex: query, $options: 'i' } },
      { location: { $regex: query, $options: 'i' } },
      { description: { $regex: query, $options: 'i' } }
    ]
  });
  res.render("listings/searchResults.ejs", { results, query});
};

