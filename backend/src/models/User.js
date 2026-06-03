import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      select: false,
    },

    phone: { type: String, default: "", trim: true },
    company: { type: String, default: "", trim: true },

    avatar: { type: String, default: "" },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    isBlocked: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },

    // Refresh token stored as hash
    refreshToken: { type: String, default: null, select: false },

    // Email verification
    emailVerificationToken: { type: String, select: false },
    emailVerificationExpiry: { type: Date, select: false },

    // Password reset
    passwordResetToken: { type: String, select: false },
    passwordResetExpiry: { type: Date, select: false },

    // Last login
    lastLogin: { type: Date },

    settings: {
      newsletter: { type: Boolean, default: true },
      darkMode: { type: Boolean, default: false },
      twoFactor: { type: Boolean, default: false },
    },
  },
  { timestamps: true }
);

// ================================
// INDEXES
// ================================
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ createdAt: -1 });
userSchema.index({ role: 1 });

// ================================
// PASSWORD HASHING
// ================================
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// ================================
// METHODS
// ================================
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.getEmailVerificationToken = function () {
  const token = crypto.randomBytes(32).toString("hex");
  this.emailVerificationToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  this.emailVerificationExpiry = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
  return token;
};

userSchema.methods.getPasswordResetToken = function () {
  const token = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  this.passwordResetExpiry = Date.now() + 30 * 60 * 1000; // 30 minutes
  return token;
};

const User = mongoose.model("User", userSchema);
export default User;