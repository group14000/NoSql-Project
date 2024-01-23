// Importing the Product model to interact with the database
const Product = require("../models/product");

// Controller function to render the "Add Product" page
exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

// Controller function to handle the addition of a new product
exports.postAddProduct = (req, res, next) => {
  // Extracting data from the request body
  const title = req.body.title;
  const imageURL = req.body.imageURL;
  const price = req.body.price;
  const description = req.body.description;

  // Creating a new Product instance with the extracted data
  const product = new Product({
    title: title,
    price: price,
    description: description,
    imageURL: imageURL,
    userId: req.user, // Associating the product with the currently logged-in user
  });

  // Saving the new product to the database
  product
    .save()
    .then((result) => {
      console.log("Created Product");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
};

// Controller function to render the "Edit Product" page
exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }

  const prodId = req.params.productId;

  // Finding a product by its ID in the database
  Product.findById(prodId)
    .then((product) => {
      if (!product) {
        return res.redirect("/");
      }
      // Rendering the "Edit Product" page with the retrieved product data
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        product: product,
      });
    })
    .catch((err) => console.log(err));
};

// Controller function to handle the update of an existing product
exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;

  // Updating the product in the database by its ID
  Product.findByIdAndUpdate(prodId, {
    title: updatedTitle,
    price: updatedPrice,
    description: updatedDesc,
    imageURL: updatedImageUrl,
  })
    .then((result) => {
      console.log("UPDATED PRODUCT!");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

// Controller function to render the "Admin Products" page
exports.getProducts = (req, res, next) => {
  // Finding all products in the database
  Product.find()
    .then((products) => {
      // Rendering the "Admin Products" page with the retrieved products
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((err) => console.log(err));
};

// Controller function to handle the deletion of a product
exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;

  // Deleting a product from the database by its ID
  Product.findByIdAndDelete(prodId)
    .then((result) => {
      console.log("DESTROYED PRODUCT");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};
