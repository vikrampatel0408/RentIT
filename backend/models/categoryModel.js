import mongoose from "mongoose";
import Product from "./productModel.js";

const categorySchema = mongoose.Schema({
    category_name: {
        type:  String,
        required: true,
    },
    
});

const Category = mongoose.model("Category", categorySchema);
export default Category;