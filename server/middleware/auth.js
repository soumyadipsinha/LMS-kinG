// Optional auth - doesn't fail if no token
export const optionalAuth = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token && req.cookies.token) {
      token = req.cookies.token;
    }

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');
        
        if (user && user.isActive) {
          req.user = user;
        }
      } catch (error) {
        // Token is invalid, but we don't fail the request
        console.log('Invalid token in optional auth:', error.message);
      }
    }

    next();
  } catch (error) {
    console.error('Optional auth middleware error:', error);
    next(); // Continue even if there's an error
  }
};


// server/middleware/auth.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Protect routes - check if user is logged in
// server/middleware/auth.js
export const protect = async (req, res, next) => {
  try {
    let token;

    // 1) Prefer cookie
    if (req.cookies?.token) {
      token = req.cookies.token;
    }

    // 2) Fallback to Authorization header (Bearer)
    if (!token && req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ status: "error", message: "Not authorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    if (!req.user) {
      return res.status(401).json({ status: "error", message: "User not found" });
    }

    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ status: "error", message: "Not authorized" });
  }
};


// Authorize routes - restrict by roles
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ status: "error", message: "Not authorized" });
    }

    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ status: "error", message: "You do not have permission to access this route" });
    }

    next();
  };
};
