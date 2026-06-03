// ================================
// ENV VALIDATOR
// ================================
 
const required = [
  "MONGO_URI",
  "JWT_SECRET",
  "JWT_REFRESH_SECRET",
];
 
const validateEnv = () => {
  const missing = required.filter((key) => !process.env[key]);
 
  if (missing.length > 0) {
    console.error("❌ Missing required environment variables:");
    missing.forEach((key) => console.error(`   - ${key}`));
    process.exit(1);
  }
 
  console.log("✅ Environment variables validated");
};
 
export default validateEnv;
 