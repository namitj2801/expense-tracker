// const jwt = require("jsonwebtoken");
// const User = require("../models/User");

// exports.protect = async (req, res, next) => {
//   let token;

//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     token = req.headers.authorization.split(" ")[1];
//   }

//   if (!token) {
//     return res.status(401).json({ message: "Unauthorized access" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     console.log("Decoded Token:", decoded); // debug

//     req.user = await User.findById(decoded.id).select("-password");

//     if (!req.user) {
//       return res.status(401).json({ message: "User not found" });
//     }

//     next();
//   } catch (error) {
//     console.error("JWT Error: ", error);
//     res.status(401).json({ message: "Unauthorized access, Invalid Token" });
//   }
// };

const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware to protect routes by verifying JWT token and user authentication
exports.protect = async (req, res, next) => {
  let token;

  // Extract Bearer token from Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  // Return error if no token provided
  if (!token) {
    return res.status(401).json({ message: "Unauthorized access" });
  }

  try {
    // Verify JWT token using secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded); // debug

    // Find user by ID from token payload, exclude password field
    req.user = await User.findById(decoded.id).select("-password");

    // Return error if user not found
    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }

    return next(); // ✅ make sure you stop here
  } catch (error) {
    // Handle JWT verification errors
    console.error("JWT Error: ", error);
    return res
      .status(401)
      .json({ message: "Unauthorized access, Invalid Token" }); // ✅ return here too
  }
};
