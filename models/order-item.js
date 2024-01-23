// Importing the Sequelize library for database interactions
const Sequelize = require("sequelize");

// Importing the configured sequelize connection from '../util/database'
const sequelize = require("../util/database");

// Defining the OrderItem model using Sequelize
const OrderItem = sequelize.define("orderItem", {
  // Defining the 'id' column with integer type, auto-increment, not null, and as the primary key
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  // Defining the 'quantity' column with integer type
  quantity: Sequelize.INTEGER,
});

// Exporting the OrderItem model for use in other parts of the application
module.exports = OrderItem;
