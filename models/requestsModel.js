const mongoose = require('mongoose');
const Schema = mongoose.Schema

const requestsSchema = new Schema({
    realState: { 
      type: mongoose.Schema.Types.ObjectID,
      ref: "realState"
      },

    // desactivado hasta crear tabla
    // agent: { 
    //  type: mongoose.Schema.Types.ObjectID,
    //  ref: "agents",
    //  required: true
    // },

    type: { 
      type: String,
      enum: ["apartment", "penthouse", "duplex", "house", "chalet", "other"]
      },
    
    transaction: {
      type: String,
      required: true,
      enum: ["purchase", "rent", "vacation_rentals"]
      },
      
    country: {
      type: String,
      required: true,
      default: "Spain",
      },

    community: { //Api Externa
      type: String,
      required: true,
      },

    province: { // external API
      type: String,
      },  
    
    municipality: { // external API
      type: String,
      },

    population: { // external API
      type: String,
      },

    neighborhood: { // external API
      type: String,
      },

    minM2: {
      type: Number,
    },

    maxM2: {
      type: Number,
    },

    currency: {
      type: String,
      enum: ["EUR", "DOL"]
      },

    minPrice: {
      type: Number,
      },

    maxPrice: {
      type: Number,
      },

    floorLevel: {
      type: String,
      enum: ["top_floor", "intermediate_floor", "ground_floor"], 
      },
    
    facing: {
      type: String,
      enum: ["north", "south", "east", "west"]
      },

    propertyAge: {
      type: String,
      enum: ["new", "up_to_5 years", "6_to_10 years", "11_to_20 years", "more_than_20 years"]
      },

    comments: {
      type: String,
      },

    rooms: {
      type: Number,
      required: true,
      },

    baths: {
      type: Number
    },

    garages: {
      type: Number
    },

    condition: {
      type: String,
      enum: ["new", "good_condition", "to_renovate"]
    },

    furnished: {
      type: String,
      enum: ["unfurnished", "semifurnished", "furnished"]
    },

    kitchenEquipment: {
      type: String,
      enum: ["standard_equipment", "semi-equipped", "fully-equipped"]
    },

    closets: {
      type: Boolean,
    },

    airCondicioning: {
      type: Boolean
    },

    heating: {
      type: Boolean 
    },

    elevator: {
      type: Boolean
    },

    outsideView: {
      type: Boolean
    },

    garden: {
      type: Boolean
    },

    pool: {
      type: Boolean
    },

    terrace: {
      type: Boolean
    },

    storage: {
      type: Boolean
    },

    accesible: {
      type: Boolean
    },

    status: {
      type: String,
      default: "Active",
      required: true,
      enum: ["Active", "Selled", "Rented", "Inactive", "Deleted"]
    },
 
    deletedAt: {
      type: Date,
    }
 
  },
   
  {
  timestamps:true}
  );
  
  module.exports = mongoose.model("requests", requestsSchema);