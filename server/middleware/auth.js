// import jwt from 'jsonwebtoken';
// import User from '../models/User.js';

// // Protect routes - verify JWT token
// export const protect = async (req, res, next) => {
//   try {
//     let token;

//     // Check for token in headers
//     if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//       token = req.headers.authorization.split(' ')[1];
//     }

//     // Check for token in cookies
//     if (!token && req.cookies.token) {
//       token = req.cookies.token;
//     }

//     // Make sure token exists
//     if (!token) {
//       return res.status(401).json({
//         status: 'error',
//         message: 'Not authorized to access this route'
//       });
//     }

//     try {
//       // Verify token
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
//       // Get user from token
//       const user = await User.findById(decoded.id).select('-password');
      
//       if (!user) {
//         return res.status(401).json({
//           status: 'error',
//           message: 'No user found with this token'
//         });
//       }

//       if (!user.isActive) {
//         return res.status(401).json({
//           status: 'error',
//           message: 'User account is deactivated'
//         });
//       }

//       req.user = user;
//       next();
//     } catch (error) {
//       return res.status(401).json({
//         status: 'error',
//         message: 'Not authorized to access this route'
//       });
//     }
//   } catch (error) {
//     console.error('Auth middleware error:', error);
//     return res.status(500).json({
//       status: 'error',
//       message: 'Server error in authentication'
//     });
//   }
// };

// // Grant access to specific roles
// export const authorize = (...roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//       return res.status(403).json({
//         status: 'error',
//         message: `User role ${req.user.role} is not authorized to access this route`
//       });
//     }
//     next();
//   };
// };

// // Optional auth - doesn't fail if no token
// export const optionalAuth = async (req, res, next) => {
//   try {
//     let token;

//     if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//       token = req.headers.authorization.split(' ')[1];
//     }

//     if (!token && req.cookies.token) {
//       token = req.cookies.token;
//     }

//     if (token) {
//       try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         const user = await User.findById(decoded.id).select('-password');
        
//         if (user && user.isActive) {
//           req.user = user;
//         }
//       } catch (error) {
//         // Token is invalid, but we don't fail the request
//         console.log('Invalid token in optional auth:', error.message);
//       }
//     }

//     next();
//   } catch (error) {
//     console.error('Optional auth middleware error:', error);
//     next(); // Continue even if there's an error
//   }
// };

// // Check if user owns resource or is admin
// export const checkOwnership = (resourceUserIdField = 'user') => {
//   return (req, res, next) => {
//     // Admin can access everything
//     if (req.user.role === 'admin') {
//       return next();
//     }

//     // Check if user owns the resource
//     const resourceUserId = req.resource ? req.resource[resourceUserIdField] : req.params.userId;
    
//     if (req.user._id.toString() !== resourceUserId.toString()) {
//       return res.status(403).json({
//         status: 'error',
//         message: 'Not authorized to access this resource'
//       });
//     }

//     next();
//   };
// };

// // Rate limiting for auth routes
// export const authRateLimit = (maxAttempts = 5, windowMs = 15 * 60 * 1000) => {
//   const attempts = new Map();

//   return (req, res, next) => {
//     const key = req.ip + req.body.email;
//     const now = Date.now();
//     const windowStart = now - windowMs;

//     // Clean old attempts
//     for (const [attemptKey, data] of attempts.entries()) {
//       if (data.timestamp < windowStart) {
//         attempts.delete(attemptKey);
//       }
//     }

//     const userAttempts = attempts.get(key) || { count: 0, timestamp: now };
    
//     if (userAttempts.timestamp < windowStart) {
//       userAttempts.count = 0;
//       userAttempts.timestamp = now;
//     }

//     if (userAttempts.count >= maxAttempts) {
//       return res.status(429).json({
//         status: 'error',
//         message: 'Too many login attempts. Please try again later.',
//         retryAfter: Math.ceil((userAttempts.timestamp + windowMs - now) / 1000)
//       });
//     }

//     userAttempts.count++;
//     attempts.set(key, userAttempts);

//     req.authAttempts = userAttempts.count;
//     next();
//   };
// };



// server/middleware/auth.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Protect routes - check if user is logged in
export const protect = async (req, res, next) => {
  try {
    let token;

    if (req.cookies?.token) {
      token = req.cookies.token;
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
