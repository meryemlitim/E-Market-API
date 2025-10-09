import Product from "../models/Product.js";

// Get all products :
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().where("deleted").equals(false);
    // const products = await Product.find({deleted: false}).populate("category");
    if (!products)
      return res.status(404).json({ message: "no Products found" });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get product by id :
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .where("deleted")
      .equals(false);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create product :
export const createProduct = async (req, res) => {
  try {
    const { title, price, description, stock, imageUrl } = req.body;
    const category =  Array.isArray(req.body.category) ? req.body.category : [req.body.category];


    if (!title || !price) {
      return res.status(400).json({ message: "Title and price are required" });
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
    res.status(400).json({ message: err.message });
  }
};

// Update product :
export const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
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
    if (!updetedProduct)
      return res.status(404).json({ message: "update faild" });
    res.status(200).json({
      message: "Product updated successfully",
      product: updetedProduct,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete product :
export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const deleteProduct = await Product.findByIdAndUpdate(
      productId,
      { deleted: true },
      { new: true }
    );
    // const deleteProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deleteProduct)
      return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// search product :
export const searchProduct = async (req, res) => {
  const searchType = req.params.type;
  const searchContent = req.params.content;

  //   search product by name :
  if (searchType === "name") {
    const products = await Product.find().where("title").equals(searchContent);

    return res.status(404).json({ type: products });
  }
  //   search product by category :

  if (searchType === "category") {
    const products = await Product.find({category: {$in: [searchContent]}});

    return res.status(404).json({ type: products });
  }
  //   search product by min price :
  if (searchType === "minPrice") {
    const products = await Product.find({ price: { $lte: searchContent } });

    return res.status(404).json({ type: products });
  }
  //   search product by max price :
  if (searchType === "maxPrice") {
    const products = await Product.find({ price: { $gte: searchContent } });

    return res.status(404).json({ type: products });
  }
};
