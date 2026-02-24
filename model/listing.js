const mongoose = require("mongoose");
const Review = require("./review.js");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    minlength: [1, "Title must be at least 1 characters long"],
    maxlength: [100, "Title cannot exceed 100 characters"]
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    minlength: [10, "Description should be at least 10 characters"]
  },
  image: {
    url:String,
    filename:String,
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    min: [0, "Price cannot be negative"]
  },
  location: {
    type: String,
    required: [true, "Location is required"]
  },
  country: {
    type: String,
    required: [true, "Country is required"],
  },
  reviews:[
    {
      type:Schema.Types.ObjectId,
      ref:"Review",
    }
  ],
  owner:{
    type:Schema.Types.ObjectId,
    ref:"User"
  },
  
  geometry: {
    
        type: {
          type: String,
          enum: ['Point'],     
          
        },
        
        coordinates: {
          type: [Number],      
        }

  }
  ,
  category: {
    type: String,
    enum: [
      'Trending',
      'Mountains',
      'Lakes',
      'Beachfront',
      'City',
      'Camping',
      'Hotels',
      'Cabins',
      'Pools',
      'Ski-in/out',
      'Castles'
    ],
  }


});

listingSchema.post("findOneAndDelete",async(listing)=>{
  if(listing){
    await Review.deleteMany({_id:{$in:listing.reviews}});
    console.log("Deleted");
  }
});


const Listing = mongoose.model("Listing",listingSchema);

module.exports = Listing;