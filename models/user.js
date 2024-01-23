// Importing the Mongoose library for MongoDB interactions
const mongoose = require("mongoose");

// Defining a Mongoose schema for the 'users' collection
const userSchema = new mongoose.Schema({
  // Defining a 'name' field of type String, which is required
  name: {
    type: String,
    required: true,
  },
  // Defining an 'email' field of type String, which is required
  email: {
    type: String,
    required: true,
  },
  // Defining a 'cart' field containing an 'items' array of objects
  cart: {
    items: [
      {
        // Each element in 'items' has a 'productId' field of type ObjectId, referencing the 'Product' collection, and is required
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        // Each element in 'items' also has a 'quantity' field of type Number, which is required
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
  },
});

// Adding a method to the user schema to handle adding products to the cart
userSchema.methods.addToCart = function (product) {
  // Checking if the product is already in the cart
  const cartItemIndex = this.cart.items.findIndex((cp) => {
    return cp.productId.toString() === product._id.toString();
  });

  // Initializing new quantity and updating items array
  let newQuantity = 1;
  const updatedItems = [...this.cart.items];

  // Updating quantity if the product is already in the cart, otherwise adding a new entry
  if (cartItemIndex >= 0) {
    newQuantity = this.cart.items[cartItemIndex].quantity + 1;
    updatedItems[cartItemIndex].quantity = newQuantity;
  } else {
    updatedItems.push({
      productId: product._id,
      quantity: newQuantity,
    });
  }

  // Updating the cart and saving the changes
  const updatedCart = {
    items: updatedItems,
  };

  this.cart = updatedCart;
  return this.save();
};

// Adding a method to the user schema to handle deleting a product from the cart
userSchema.methods.deleteProductFromCart = function (prodId) {
  // Filtering out the product to be deleted from the cart
  const updatedCartItems = this.cart.items.filter((p) => {
    return p.productId.toString() !== prodId.toString();
  });
  this.cart.items = updatedCartItems;
  return this.save();
};

// Adding a method to the user schema to handle clearing the entire cart
userSchema.methods.clearCart = function () {
  this.cart = { items: [] };
  return this.save();
};

// Exporting the Mongoose model 'Users' based on the defined userSchema
module.exports = mongoose.model("Users", userSchema);
