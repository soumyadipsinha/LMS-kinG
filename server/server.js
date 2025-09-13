import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";

// Import routes
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import courseRoutes from "./routes/courses.js";
import dashboardRoutes from "./routes/dashboard.js";
import uploadRoutes from "./routes/upload.js";
import adminRoutes from "./routes/admin.js";
import adminCourseRoutes from "./routes/adminCourses.js";
import paymentRoutes from "./routes/payment.js";
import examRoutes from "./routes/exams.js";
import notificationRoutes from "./routes/notifications.js";
import adminNotificationRoutes from "./routes/adminNotifications.js";
import connectCloudinary from "./utils/cloudinary.js";

// Import Admin model
import Admin from "./models/Admin.js";
import User from "./models/User.js";

// Load environment variables
dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true
  }
});

// --- SECURITY MIDDLEWARE ---
app.use(helmet()); // set security headers
app.use(compression()); // gzip compression
app.use(cookieParser()); // parse cookies

// --- RATE LIMITING ---
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max requests per IP
  message: "Too many requests from this IP, please try again later.",
});
app.use("/api/", limiter);

// --- CORS CONFIGURATION ---
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    optionsSuccessStatus: 200, // For legacy browser support
  })
);

// Handle preflight requests explicitly
app.options("*", (req, res) => {
  res.header(
    "Access-Control-Allow-Origin",
    process.env.CLIENT_URL || "http://localhost:5173"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  res.sendStatus(200);
});

// --- BODY PARSING ---
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// --- LOGGING ---
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// --- MONGODB CONNECTION ---
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGODB_URI || ""
    );
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

    // Create admin account if it doesn't exist
    await createAdminIfNotExists();
  } catch (error) {
    console.error("❌ Database connection error:", error);
    process.exit(1);
  }
};

// --- CREATE ADMIN ACCOUNT ---
const createAdminIfNotExists = async () => {
  try {
    const existingAdmin = await Admin.findOne({ email: "rahul12@gmail.com" });

    if (!existingAdmin) {
      const admin = new Admin({
        firstName: "Rahul",
        lastName: "Admin",
        email: "rahul12@gmail.com",
        password: "rahul12",
        role: "admin",
        isActive: true,
        permissions: {
          userManagement: true,
          courseManagement: true,
          analytics: true,
          settings: true,
          notifications: true,
        },
        profile: {
          bio: "System Administrator",
          department: "IT",
          position: "Admin",
        },
      });

      await admin.save();
      console.log("✅ Admin account created: rahul12@gmail.com");
    } else {
      console.log("✅ Admin account already exists: rahul12@gmail.com");
    }
  } catch (error) {
    console.error("❌ Error creating admin account:", error);
  }
};

await connectDB();
await connectCloudinary();

// --- ROUTES ---
app.use("/api/auth", authRoutes); // Auth routes (register, login, logout, me)
app.use("/api/users", userRoutes); // User management routes
app.use("/api/courses", courseRoutes); // Courses routes
app.use("/api/dashboard", dashboardRoutes); // Dashboard routes
app.use("/api/upload", uploadRoutes); // File upload routes
app.use("/api/admin", adminRoutes); // Admin authentication and management routes
app.use("/api/admin/courses", adminCourseRoutes); // Admin course management routes
app.use("/api/payments", paymentRoutes); // Razorpay payment routes
app.use("/api/exams", examRoutes);
app.use("/api/notifications", notificationRoutes); // Notifications routes
app.use("/api/admin/notifications", adminNotificationRoutes); // Admin notification routes

// --- HEALTH CHECK ---
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "LMS-kinG API is running 🚀",
    timestamp: new Date().toISOString(),
  });
});

// --- 404 HANDLER ---
app.use("*", (req, res) => {
  res.status(404).json({
    status: "error",
    message: "Route not found",
  });
});

// --- GLOBAL ERROR HANDLER ---
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    status: "error",
    message:
      process.env.NODE_ENV === "production"
        ? "Something went wrong!"
        : err.message,
  });
});

// --- SOCKET.IO AUTHENTICATION ---
io.use(async (socket, next) => {
  try {
    const token = socket.handshake.auth.token || socket.handshake.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return next(new Error('Authentication error: No token provided'));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      return next(new Error('Authentication error: User not found'));
    }

    socket.userId = user._id.toString();
    socket.user = user;
    next();
  } catch (error) {
    next(new Error('Authentication error: Invalid token'));
  }
});

// --- SOCKET.IO CONNECTION HANDLING ---
io.on('connection', (socket) => {
  console.log(`👤 User ${socket.user?.email || 'Unknown'} connected with socket ID: ${socket.id}`);
  
  // Join user to their personal room
  socket.join(`user_${socket.userId}`);
  
  // Handle disconnect
  socket.on('disconnect', () => {
    console.log(`👤 User ${socket.user?.email || 'Unknown'} disconnected`);
  });
  
  // Handle joining notification room
  socket.on('join_notifications', () => {
    socket.join('notifications');
    console.log(`🔔 User ${socket.user?.email || 'Unknown'} joined notifications room`);
  });
  
  // Handle leaving notification room
  socket.on('leave_notifications', () => {
    socket.leave('notifications');
    console.log(`🔔 User ${socket.user?.email || 'Unknown'} left notifications room`);
  });
});

// Debug Socket.IO connection attempts
io.engine.on('connection_error', (err) => {
  console.error('🔌 Socket.IO connection error:', err);
});

// Make io available globally for use in controllers
app.set('io', io);

// --- SERVER START ---
const PORT = process.env.PORT || 5000;

// Handle port conflicts gracefully
const startServer = (port) => {
  server.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
    console.log(`📚 LMS-kinG Backend API ready!`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
    console.log(`🔌 Socket.IO server ready for real-time notifications!`);
  });
};

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.log(`⚠️  Port ${PORT} is in use, trying port ${PORT + 1}...`);
    startServer(PORT + 1);
  } else {
    console.error('❌ Server error:', error);
    process.exit(1);
  }
});

startServer(PORT);
