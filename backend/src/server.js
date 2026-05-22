import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";

// 🔥 ENV
dotenv.config();

// 🔥 DATABASE
connectDB();

// 🔥 PORT
const PORT = process.env.PORT || 5000;

// 🔥 SERVER
app.listen(PORT, () => {
console.log(
`🚀 Server running on port ${PORT}`
);
});
