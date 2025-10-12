import Category from "../models/Category.js";

// Get all categories :
export const getcategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    if (!categories) {
      const error = new Error("no categories found");
      error.status = 404;
      return next(error);
    }
    res.status(200).json(categories);
  } catch (err) {
    next(err);
  }
};

// Get Category by id :
export const getCategoryById = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      const error = new Error("no category found");
      error.status = 404;
      return next(error);
    }
    res.status(200).json(category);
  } catch (err) {
    next(err);
  }
};

// Create Category :
export const createCategory = async (req, res, next) => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      const error = new Error("name and description are required");
      error.status = 400;
    }

    const newCategory = new Category({
      name,
      description,
    });

    await newCategory.save();

    res.status(201).json(newCategory);
  } catch (err) {
    next(err);
  }
};

// Update Category :
export const updateCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.id;

    const updetedCategory = await Category.findByIdAndUpdate(
      categoryId,
      {
        name: req.body.name,
        description: req.body.description,
      },
      { new: true }
    );
    if (!updetedCategory) {
      const error = new Error("Category not found ");
      error.status = 404;
      return next(error);
    }
    res.status(200).json({
      message: "Category updated successfully",
      category: updetedCategory,
    });
  } catch (err) {
    next(err);
  }
};

// Delete product :
export const deleteCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.id;

    const deleteCategory = await Category.findByIdAndDelete(categoryId, {
      new: true,
    });
    if (!deleteCategory) {
      const error = new Error("Category not found");
      error.status = 404;
      return next(error);
    }
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (err) {
    next(err);
  }
};
