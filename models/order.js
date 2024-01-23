// Importing the Mongoose library for MongoDB interactions
const mongoose = require("mongoose");

// Defining a Mongoose schema for the 'orders' collection
const orderSchema = new mongoose.Schema({
  // Defining an array 'products' within the order schema
  products: [
    {
      // Each element in the 'products' array has a 'product' object and a 'quantity'
      product: { type: Object, required: true },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  // Defining a 'user' object within the order schema
  user: {
    // The 'user' object has a 'name' field of type String and is required
    name: {
      type: String,
      required: true,
    },
    // The 'user' object also has a 'userId' field of type ObjectId, referencing the 'Users' collection, and is required
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
  },
});

// Exporting the Mongoose model 'Order' based on the defined orderSchema
module.exports = mongoose.model("Order", orderSchema);
