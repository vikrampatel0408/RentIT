import mongoose from "mongoose";


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
        type: String,
        
      },
      image: {
        type: String,
      }
    },
    {
      timestamps: true,
    }
  );
  
  const Product = mongoose.model("Product", productSchema);
export default Product;