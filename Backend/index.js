// index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { bindAdmin } from "./Services/LDAPService.js"; // LDAP Service
import ldapRoutes from "./Routes/LDAPRoute.js"; // LDAP Routes
import { errorHandler } from "./Middleware/ErrorMiddleware.js"; // Error Handler
import connectDB from "./Database/Config.js"; // Your DB connection

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "*", // Or put "http://localhost:3000" for security
    credentials: true,
  })
);

// Database connection
connectDB();

// Default route
app.get("/", (req, res) => {
  res.status(200).send("Hi welcome to API");
});

// LDAP Routes
app.use("/api/ldap", ldapRoutes);

// Error Middleware
app.use(errorHandler);

// Start server after LDAP bind
const PORT = process.env.PORT || 5000;

bindAdmin()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ App is started and running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("LDAP connection failed:", err);
    process.exit(1); // Stop app if LDAP fails
  });
