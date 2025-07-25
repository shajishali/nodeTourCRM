const express = require("express");
const cors = require("cors");
const path = require("path");
const helmet = require("helmet");

const itinerariesRoutes = require("./routes/itineraries");
const authRoutes = require("./routes/auth");

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS Middleware - allow frontend to access backend
app.use(cors({
  origin: "http://localhost:5173", // frontend URL
  credentials: true               // allow cookies and headers
}));

app.use("/api/itineraries", require("./routes/itineraries"));


// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Helmet for security
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: ["'self'", "http://localhost:5000", "data:"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
    },
  })
);

// Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api", itinerariesRoutes);
app.use("/api", authRoutes);

// Default root route
app.get("/", (req, res) => {
  res.send("API is running");
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
