import Product from "../models/Product.js";
import mongoose from "mongoose";
// Get all products :
export const getProducts = async (req, res, next) => {
  try {
    // const products = await Product.find().where("deleted").equals(false);
    const products = await Product.find({ deleted: false }).populate(
      "category"
    );
    if (products.length === 0) {
      const error = new Error("no Products found");
      error.status = 404;
      return next(error);
    }
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};

// Get product by id :
export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
      .where("deleted")
      .equals(false);
    if (!product) {
      const error = new Error("no Products found");
      error.status = 404;
      return next(error);
    }
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

// Create product :
export const createProduct = async (req, res, next) => {
  try {
    const { title, price, description, stock, imageUrl } = req.body;
    const category = Array.isArray(req.body.category)
      ? req.body.category
      : [req.body.category];

    if (!title || !price) {
      const error = new Error("Title and price are required");
      error.status = 400;
      return next(error);
    }

    const newProduct = new Product({
      title,
      price,
      description,
      category,
      stock,
      imageUrl,
    });

    await newProduct.save();

    res.status(201).json(newProduct);
  } catch (err) {
    next(err);
  }
};

// Update product :
export const updateProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      res.status(404).json({
        message: "product not found",
      });
    }
    const category = Array.isArray(req.body.category)
      ? req.body.category
      : [req.body.category];

    const updetedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        stock: req.body.stock,
        category,
        imageUrl: req.body.imageUrl,
      },
      { new: true }
    );
    if (!updetedProduct) {
      const error = new Error("Product not found");
      error.status = 404;
      return next(error);
    }
    res.status(200).json({
      message: "Product updated successfully",
      product: updetedProduct,
    });
  } catch (err) {
    next(err);
  }
};

// Delete product (soft delete) :
export const deleteProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;

    const deleteProduct = await Product.findByIdAndUpdate(
      productId,
      { deleted: true },
      { new: true }
    );
    if (!deleteProduct) {
      const error = new Error("Product not found");
      error.status = 404;
      return next(error);
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    next(err);
  }
};

// search product :
export const searchProduct = async (req, res, next) => {
  try {
    const searchType = req.params.type;
    const searchContent = req.params.content;
    let products;
    //   search product by name :
    if (searchType === "name") {
      products = await Product.find().where("title").equals(searchContent);
    }
    //   search product by category :
    else if (searchType === "category") {
      products = await Product.find({ category: { $in: [searchContent] } });
    }
    //   search product by min price :
    else if (searchType === "minPrice") {
      products = await Product.find({ price: { $lte: searchContent } });
    }
    //   search product by max price :
    else if (searchType === "maxPrice") {
      products = await Product.find({ price: { $gte: searchContent } });
    } else {
      const error = new Error("Invalid search type");
      error.status = 400;
      return next(error);
    }
    if (!products || products.length === 0) {
      const error = new Error("No products found");
      error.status = 404;
      return next(error);
    }

    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};
