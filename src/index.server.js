const express = require("express");
const env = require("dotenv");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

// Routes
const authRoutes = require("./routes/AuthRoutes");
const categoryRoutes = require("./routes/CategoryRoutes");
const productRoutes = require("./routes/ProductRoutes");
const adminRoutes = require("./routes/admin/AuthRoutes");
const cartRoutes = require("./routes/CartRoutes");
const path = require("path");

// Enviroment variable
env.config();

// MongoDB connection

mongoose
    .connect(
        `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.m0mie.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`
    )
    .then(() => {
        console.log("Database connected");
    });

// Used to pass data from request - Middleware
app.use(express.json());

// Used to expose static files
app.use('/public', express.static(path.join(__dirname, 'uploads')));

// Used to allow CORS policy
app.use(cors());

// Call the routes created in routes/user

app.use("/api", authRoutes);
app.use("/api", adminRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", cartRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
