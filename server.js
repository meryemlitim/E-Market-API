import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import logger from "./middlewares/logger.js";
import notFound from "./middlewares/notFound.js";
import errorHandler from "./middlewares/errorHandler.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());

connectDB();

// product router :
app.use("/api/products", productRoutes);
// Test route:
app.get("/", (req, res) => {
    res.send("E-Market API is running ");
});
// logger Middleware:
app.use(logger);

// not found middleware: 
app.use(notFound);

// error Handler:
app.use(errorHandler);
// DB Connection:

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
