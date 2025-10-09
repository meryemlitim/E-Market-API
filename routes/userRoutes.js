import express from "express";
import {
  getUsers,
  getUserById,
  createUser,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();
/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Display all the users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description:  List of users successfully retrieved
 */

router.get("/", getUsers);
/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Display a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User successfully retrieved

 *
 */

router.get("/:id", getUserById);
/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullname:
 *                 type: string
 *                 example: "meryem"
 *               email:
 *                 type: string
 *                 example: "meryem@gmail.com"
 *               password:
 *                 type: string
 *                 example: "$2b$10$.nr491E0rsZJYukE/dkFQOxh39i4ST9s.xoMdvX8WUUs0HXgT7Z8."
 *     responses:
 *       201:
 *         description: User successfully created
 *       400:
 *         description: Invalid input
 */
router.post("/", createUser);
/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User successfully deleted
 *       404:
 *         description: User not found
 */
router.delete("/:id", deleteUser);

export default router;
