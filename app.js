// Importing required modules: path for working with file paths, express for building the web application, bodyParser for parsing incoming request bodies
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

// Importing the error controller for handling errors
const errorController = require("./controllers/error");

// Importing Mongoose for MongoDB interactions and the User model
const mongoose = require("mongoose");
const User = require("./models/user");

// Creating an Express application instance
const app = express();

// Configuring the view engine to use EJS and setting the views directory
app.set("view engine", "ejs");
app.set("views", "views");

// Importing routes for the admin and shop sections of the application
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

// Using bodyParser to parse incoming urlencoded form data and serving static files from the 'public' directory
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// Middleware to fetch a user from the database and attach it to the request object
app.use((req, res, next) => {
  User.findById("65abba9dc5ee8db00bc1d093")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

// Using the admin and shop routes
app.use("/admin", adminRoutes);
app.use(shopRoutes);

// Handling 404 errors with the get404 method from the error controller
app.use(errorController.get404);

// Connecting to MongoDB and starting the server
mongoose
  .connect(
    "mongodb+srv://bhuvaneshhj:Bhuvi@cluster0.fghogsf.mongodb.net/noSQL?retryWrites=true&w=majority"
  )
  .then((result) => {
    // Finding or creating a user in the database
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: "Diganta",
          email: "groupcaptain40@gmail.com",
          cart: {
            items: [],
          },
        });
        user.save();
      }
    });
    // Starting the server on port 3000
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
