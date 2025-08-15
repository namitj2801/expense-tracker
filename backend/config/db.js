const mongoose = require("mongoose");

// Connect to MongoDB database using connection string from environment variables
const connectDB = async () => {
  try {
    // Attempt to establish connection with MongoDB
    await mongoose.connect(process.env.MONGO_URI, {});
    console.log("MongoDB connected");
  } catch (error) {
    // Log error and exit process if connection fails
    console.log("Error connecting to MongoDB", error);
    process.exit(1);
  }
};

module.exports = connectDB;
