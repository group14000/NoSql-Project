// Importing the Product and Order models to interact with the database
const Product = require("../models/product");
const Order = require("../models/order");

// Controller function to render the "All Products" page
exports.getProducts = (req, res, next) => {
  // Finding all products in the database
  Product.find()
    .then((products) => {
      // Rendering the "All Products" page with the retrieved products
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "All Products",
        path: "/products",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// Controller function to render the "Product Detail" page
exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;

  // Finding a product by its ID in the database
  Product.findById(prodId)
    .then((product) => {
      // Rendering the "Product Detail" page with the retrieved product data
      res.render("shop/product-detail", {
        product: product,
        pageTitle: product.title,
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
};

// Controller function to render the "Shop" (main) page
exports.getIndex = (req, res, next) => {
  // Finding all products in the database
  Product.find()
    .then((products) => {
      // Rendering the "Shop" page with the retrieved products
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// Controller function to render the "Your Cart" page
exports.getCart = (req, res, next) => {
  req.user
    // Populating the user's cart with detailed product information
    .populate("cart.items.productId")
    .then((user) => {
      let products = user.cart.items.map((item) => {
        // Extracting relevant information for display
        return {
          _id: item.productId._id,
          title: item.productId.title,
          description: item.productId.description,
          quantity: item.quantity,
        };
      });
      // Rendering the "Your Cart" page with the user's cart data
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: products,
      });
    })
    .catch((err) => console.log(err));
};

// Controller function to handle adding a product to the cart
exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;

  // Finding a product by its ID in the database
  Product.findById(prodId).then((product) => {
    // Adding the product to the user's cart
    return req.user.addToCart(product).then((result) => {
      console.log(result);
      res.redirect("/cart");
    });
  });
};

// Controller function to handle deleting a product from the cart
exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;

  // Deleting a product from the user's cart
  req.user
    .deleteProductFromCart(prodId)
    .then((result) => {
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));
};

// Controller function to handle placing an order
exports.postOrder = (req, res, next) => {
  req.user
    // Populating the user's cart with detailed product information
    .populate("cart.items.productId")
    .then((user) => {
      let products = user.cart.items.map((item) => {
        // Extracting relevant information for the order
        return {
          product: { ...item.productId },
          quantity: item.quantity,
        };
      });

      // Creating a new Order instance with the user and product details
      const order = new Order({
        user: {
          name: req.user.name,
          userId: req.user,
        },
        products: products,
      });

      // Saving the order to the database
      return order.save();
    })
    .then((result) => {
      // Clearing the user's cart after placing the order
      return req.user.clearCart();
    })
    .then((result) => {
      res.redirect("/orders");
    })
    .catch((err) => console.log(err));
};

// Controller function to render the "Your Orders" page
exports.getOrders = (req, res, next) => {
  // Finding all orders associated with the current user
  Order.find({ "user.userId": req.user._id })
    .then((orders) => {
      // Rendering the "Your Orders" page with the retrieved orders
      res.render("shop/orders", {
        path: "/orders",
        pageTitle: "Your Orders",
        orders: orders,
      });
    })
    .catch((err) => console.log(err));
};
