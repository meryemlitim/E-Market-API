import Category from "../models/Category.js";

// Get all categories :
export const getcategories = async (req, res) => {
  try {
    const categories = await Category.find();
    if (!categories)
      return res.status(404).json({ message: "no categories found" });
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Category by id :
export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category)
      return res.status(404).json({ message: "category not found" });
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create Category :
export const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      return res
        .status(400)
        .json({ message: "name and description are required" });
    }

    const newCategory = new Category({
      name,
      description,
    });

    await newCategory.save();

    res.status(201).json(newCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update Category :
export const updateCategory = async (req, res) => {
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
    if (!updetedCategory)
      return res.status(404).json({ message: "update faild" });
    res
      .status(200)
      .json({
        message: "Category updated successfully",
        product: updetedCategory,
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete product :
export const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;

    const deleteCategory = await Category.findByIdAndDelete(
      categoryId,
      { new: true }
    );
    if (!deleteCategory)
      return res.status(404).json({ message: "Category not found" });
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
