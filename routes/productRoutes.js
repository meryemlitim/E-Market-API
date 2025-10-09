import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProduct,
} from "../controllers/productController.js"; 

const router = express.Router();
/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Display all the products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description:  List of products successfully retrieved
 */

router.get("/", getProducts);
/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Display a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the product to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product successfully retrieved
 *       404:
 *         description: Product not found
 */
router.get("/:id", getProductById);
/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Wireless Mouse"
 *               description:
 *                 type: string
 *                 example: "Comfortable ergonomic wireless mouse"
 *               price:
 *                 type: number
 *                 example: 29.99
 *               stock:
 *                 type: number
 *                 example: 100
 *               category:
 *                 type: string
 *                 example: "68e6657c63f27acd6a29121a"
 *     responses:
 *       201:
 *         description: Product successfully created
 *       400:
 *         description: Invalid input
 */
router.post("/", createProduct);
/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update an existing product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Updated Product Name"
 *               description:
 *                 type: string
 *                 example: "Comfortable ergonomic wireless mouse"
 *               price:
 *                 type: number
 *                 example: 49.99
 *               stock:
 *                 type: number
 *                 example: 100
 *               category:
 *                 type: string
 *                 example: "68e6657c63f27acd6a29121a"
 *     responses:
 *       200:
 *         description: Product successfully updated
 *       404:
 *         description: Product not found
 */
router.put("/:id", updateProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product successfully deleted
 *       404:
 *         description: Product not found
 */
router.delete("/:id", deleteProduct);
/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update an existing product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Updated Product Name"
 *               price:
 *                 type: number
 *                 example: 49.99
 *     responses:
 *       200:
 *         description: Product successfully updated
 *       404:
 *         description: Product not found
 */
router.get("/search/:type/:content", searchProduct);

export default router;
