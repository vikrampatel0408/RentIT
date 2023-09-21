import mongoose from "mongoose";
import User from "./userModel.js";
import Category from "./categoryModel.js";
const productSchema = mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
        
      },
      category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        
        
      },
      image: {
        type: String,
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      price: {
        type: Number,
        required: true,
      }
    }
  );
  
  const Product = mongoose.model("Product", productSchema);
export default Product;