const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");

// User schema definition with required fields and timestamps
const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensures email uniqueness across users
    },
    password: {
      type: String,
      required: true,
    },
    profileImageUrl: {
      type: String,
      default: null, // Optional profile image
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Pre-save middleware to hash password before saving to database
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Skip if password hasn't changed
  this.password = await bcrypt.hash(this.password, 10); // Hash with salt rounds of 10
  next();
});

// Instance method to compare password with hashed password in database
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
