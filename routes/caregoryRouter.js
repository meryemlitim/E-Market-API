import express from "express";
import {
  getcategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js"; 

const router = express.Router();

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Display all the categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description:  List of categories successfully retrieved
 */
router.get("/", getcategories);
/**
 * @swagger
 * /api/categories/{id}:
 *   get:
 *     summary: Display a category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the category to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category successfully retrieved

 *
 */
router.get("/:id", getCategoryById);
/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Clothing"
 *               description:
 *                 type: string
 *                 example: "design strategies that increase apparel conversions"
 *     responses:
 *       201:
 *         description: Category successfully created
 *       400:
 *         description: Invalid input
 */
router.post("/", createCategory);
/**
 * @swagger
 * /api/categories/{id}:
 *   put:
 *     summary: Update an existing category
 *     tags: [Categories]
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
 *               name:
 *                 type: string
 *                 example: "Clothing"
 *               description:
 *                 type: string
 *                 example: "design strategies that increase apparel conversions"
 *     responses:
 *       200:
 *         description: Category successfully updated
 *       404:
 *         description: Category not found
 */
router.put("/:id", updateCategory);
/**
 * @swagger
 * /api/categories/{id}:
 *   delete:
 *     summary: Delete a category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the category to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category successfully deleted
 *       404:
 *         description: Category not found
 */
router.delete("/:id", deleteCategory);

export default router;
