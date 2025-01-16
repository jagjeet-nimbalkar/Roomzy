const mongoose = require("mongoose");
const review = require("./review.js");
const { types } = require("joi");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image:{
    url:String,
    filename:String
  },

  price: Number,
  location: String,
  country: String,

  geometry: {
    type: {
      type: String, 
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  
  reviews:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Review" 
  }],
  owner:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
  });

listingSchema.post("findOneAndDelete",async(listing)=>{
  if(listing){
    await review.deleteMany({_id :{$in: listing.reviews}}).then(()=>{console.log("all reviews deleted from db")})
  }
})

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
