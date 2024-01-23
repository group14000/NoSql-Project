// Importing the Mongoose library for MongoDB interactions
const mongoose = require("mongoose");

// Defining a Mongoose schema for the 'products' collection
const productSchema = new mongoose.Schema({
  // Defining a 'title' field of type String, which is required
  title: {
    type: String,
    required: true,
  },
  // Defining a 'price' field of type Number, which is required
  price: {
    type: Number,
    required: true,
  },
  // Defining a 'description' field of type String, which is required
  description: {
    type: String,
    required: true,
  },
  // Defining an 'imageURL' field of type String, which is required
  imageURL: {
    type: String,
    required: true,
  },
  // Defining a 'userId' field of type ObjectId, referencing the 'Users' collection, and is required
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
});

// Exporting the Mongoose model 'Product' based on the defined productSchema
module.exports = mongoose.model("Product", productSchema);
