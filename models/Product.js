import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true}, 
    description: { type: String },
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    imageUrl: { type: String },
    
       // Relation with Category :
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
