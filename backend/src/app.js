import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import hpp from "hpp";

// 🔥 ROUTES
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import domainRoutes from "./routes/domainRoutes.js";
import hostingRoutes from "./routes/hostingRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import invoiceRoutes from "./routes/invoiceRoutes.js";

// 🔥 ADMIN ROUTES
import adminDashboardRoutes from "./routes/admin/adminDashboardRoutes.js";
import adminUserRoutes from "./routes/admin/adminUserRoutes.js";
import adminOrderRoutes from "./routes/admin/adminOrderRoutes.js";
import adminDomainRoutes from "./routes/admin/adminDomainRoutes.js";
import adminHostingRoutes from "./routes/admin/adminHostingRoutes.js";
import adminPaymentRoutes from "./routes/admin/adminPaymentRoutes.js";
import adminInvoiceRoutes from "./routes/admin/adminInvoiceRoutes.js";
import adminSettingsRoutes from "./routes/admin/adminSettingsRoutes.js";
import adminAnalyticsRoutes from "./routes/admin/adminAnalyticsRoutes.js";

// 🔥 MIDDLEWARE
import errorMiddleware from "./middleware/errorMiddleware.js";
import notFoundMiddleware from "./middleware/notFoundMiddleware.js";

const app = express();

/* ======================================================
   🔒 SECURITY MIDDLEWARE (must be first)
====================================================== */

app.use(helmet());

app.use(
  cors({
    origin: process.env.ALLOWED_ORIGIN || "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/* ======================================================
   🔥 BODY PARSERS (IMPORTANT: BEFORE SANITIZE FIX)
====================================================== */

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

/* ======================================================
   🛡️ NO SQL INJECTION PROTECTION (FIXED FOR EXPRESS 5)
====================================================== */

// ❌ OLD: app.use(mongoSanitize());

// ✅ SAFE FIX (prevents req.query crash)
app.use(
  mongoSanitize({
    replaceWith: "_",
    allowDots: false,
    onSanitize: ({ key }) => {
      console.log(`Sanitized: ${key}`);
    },
  })
);

/* ======================================================
   ⚠️ HTTP PARAMETER POLLUTION PROTECTION
====================================================== */
app.use(hpp());

/* ======================================================
   🔥 OTHER MIDDLEWARE
====================================================== */

app.use(cookieParser());
app.use(morgan("dev"));

/* ======================================================
   🔥 STATIC FOLDERS
====================================================== */

app.use("/uploads", express.static("src/uploads"));

/* ======================================================
   🔥 HEALTH CHECK
====================================================== */

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "DigitalTechSouls API Running 🚀",
  });
});

/* ======================================================
   🔥 API ROUTES
====================================================== */

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/domains", domainRoutes);
app.use("/api/hosting", hostingRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/invoices", invoiceRoutes);

/* ======================================================
   🔥 ADMIN ROUTES
====================================================== */

app.use("/api/admin/dashboard", adminDashboardRoutes);
app.use("/api/admin/users", adminUserRoutes);
app.use("/api/admin/orders", adminOrderRoutes);
app.use("/api/admin/domains", adminDomainRoutes);
app.use("/api/admin/hosting", adminHostingRoutes);
app.use("/api/admin/payments", adminPaymentRoutes);
app.use("/api/admin/invoices", adminInvoiceRoutes);
app.use("/api/admin/settings", adminSettingsRoutes);
app.use("/api/admin/analytics", adminAnalyticsRoutes);

/* ======================================================
   ❌ NOT FOUND
====================================================== */

app.use(notFoundMiddleware);

/* ======================================================
   🚨 GLOBAL ERROR HANDLER
====================================================== */

app.use(errorMiddleware);

export default app;