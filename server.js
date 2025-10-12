import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import logger from "./middlewares/logger.js";
import notFound from "./middlewares/notFound.js";
import errorHandler from "./middlewares/errorHandler.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js"; 
import categoryRoutes from "./routes/caregoryRouter.js"; 
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";



dotenv.config();
const app = express();

// Middleware
app.use(express.json());

// DB Connection: 
connectDB();

// logger Middleware:
app.use(logger);

// product router :
app.use("/api/products", productRoutes);

// users router :
app.use("/api/users", userRoutes);

// categories router :
app.use("/api/categories", categoryRoutes);

// Test route:
app.get("/", (req, res) => {
    res.send("E-Market API is running ");
});

// Swagger setup
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "E-Market API",
      version: "1.0.0",
      description: "Documentation de l’API E-Market",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/*.js"], 
};

const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// // not found middleware: 
app.use(notFound);

// // error Handler:
app.use(errorHandler); 

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
