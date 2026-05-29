import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

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

// 🔥 MIDDLEWARE
import errorMiddleware from "./middleware/errorMiddleware.js";
import notFoundMiddleware from "./middleware/notFoundMiddleware.js";

const app = express();

/* ======================================================
   🔥 GLOBAL MIDDLEWARE
====================================================== */

// CORS
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// JSON Parser
app.use(express.json());

// FORM DATA
app.use(express.urlencoded({ extended: true }));

// COOKIE PARSER
app.use(cookieParser());

// LOGGER
app.use(morgan("dev"));

/* ======================================================
   🔥 STATIC FOLDERS
====================================================== */

app.use(
  "/uploads",
  express.static("src/uploads")
);

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

// AUTH
app.use("/api/auth", authRoutes);

// USERS
app.use("/api/users", userRoutes);

// DOMAINS
app.use("/api/domains", domainRoutes);

// HOSTING
app.use("/api/hosting", hostingRoutes);

// ORDERS
app.use("/api/orders", orderRoutes);

// CART
app.use(
  "/api/cart",
  cartRoutes
);

//PAYMENT
app.use(
  "/api/payments",
  paymentRoutes
);

//invoices
app.use(
  "/api/invoices",
  invoiceRoutes
);

//admin setting
app.use(
  "/api/admin/settings",
  adminSettingsRoutes
);

/* ======================================================
   🔥 ADMIN ROUTES
====================================================== */

// ADMIN DASHBOARD
app.use(
  "/api/admin/dashboard",
  adminDashboardRoutes
);

// ADMIN USERS
app.use(
  "/api/admin/users",
  adminUserRoutes
);

// ADMIN ORDERS
app.use(
  "/api/admin/orders",
  adminOrderRoutes
);

// ADMIN DOMAINS
app.use(
  "/api/admin/domains",
  adminDomainRoutes
);

// ADMIN HOSTING
app.use(
  "/api/admin/hosting",
  adminHostingRoutes
);

// ADMIN PAYMENTS
app.use(
  "/api/admin/payments",
  adminPaymentRoutes
);

//ADMIN INVOICES
app.use(
  "/api/admin/invoices",
  adminInvoiceRoutes
);

/* ======================================================
   ❌ NOT FOUND
====================================================== */

app.use(notFoundMiddleware);

/* ======================================================
   🚨 ERROR HANDLER
====================================================== */

app.use(errorMiddleware);

export default app;