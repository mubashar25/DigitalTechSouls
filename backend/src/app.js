import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import hpp from "hpp";

import errorMiddleware from "./middleware/errorMiddleware.js";
import { apiLimiter } from "./middleware/rateLimitMiddleware.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import domainRoutes from "./routes/domainRoutes.js";
import hostingRoutes from "./routes/hostingRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

const app = express();

// ================================
// SECURITY MIDDLEWARE
// ================================
app.use(helmet());
app.use(mongoSanitize());
app.use(hpp());

// ================================
// CORS
// ================================
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGIN || "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ================================
// BODY & COOKIES
// ================================
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

// ================================
// LOGGING
// ================================
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

// ================================
// GLOBAL RATE LIMIT
// ================================
app.use("/api", apiLimiter);

// ================================
// ROUTES
// ================================
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/domains", domainRoutes);
app.use("/api/hosting", hostingRoutes);
app.use("/api/admin", adminRoutes);

// ================================
// HEALTH CHECK
// ================================
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "DigitalTechSouls API is running",
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

// ================================
// 404 HANDLER
// ================================
app.use("*", (req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});

// ================================
// ERROR HANDLER
// ================================
app.use(errorMiddleware);

export default app;