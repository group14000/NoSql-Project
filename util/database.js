// Importing the MongoClient from the MongoDB Node.js driver
const MongoClient = require("mongodb").MongoClient;

// Variable to store the database connection
let db;

// Function to connect to the MongoDB database
const connectMongoDB = (callback) => {
  // Using the MongoClient to connect to the MongoDB server
  MongoClient.connect(
    "mongodb+srv://groupcaptain40:Diganta@7908@cluster0.ys5egbo.mongodb.net/?retryWrites=true&w=majority"
  )
    .then((result) => {
      // Logging a successful connection and setting the 'db' variable to the connected database
      console.log("Connected!");
      db = result.db();
      // Executing the provided callback function
      callback();
    })
    .catch((err) => {
      // Logging an error and throwing it if the connection fails
      console.log(err);
      throw err;  
    });
};

// Function to retrieve the connected database
const getDb = () =>{
  // Checking if the 'db' variable is set, and returning it if true
  if(db){
    return db;
  }
  // Throwing an error if no database is found
  throw "No database found!";
}

// Exporting the connectMongoDB and getDb functions for external use
exports.connectMongoDB = connectMongoDB; 
exports.getDb = getDb;
