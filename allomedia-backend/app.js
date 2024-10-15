require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
// Routes
const authRoutes = require("./routes/authRoutes");

// Middleware to parse incoming JSON requests
app.use(express.json());
app.use(cookieParser());

// CORS middleware should be applied globally
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

mongoose.set("strictQuery", false);

// Session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

const mongoUri = "mongodb://mongo:27017/allomedia";

// Function to connect to MongoDB and start the server
const startServer = async () => {
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};

// Start the server if not in test environment
if (process.env.NODE_ENV !== "test") {
  startServer();
}

// Basic route to check server status
app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
  res.send("alloMedia API is running!");
});

module.exports = app;
