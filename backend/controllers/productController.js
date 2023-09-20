import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";
import User from "../models/userModel.js";
const postProduct = asyncHandler(async (req, res, next) => {
  const { name, description, category, image ,price} = req.body;
  const id = req.body.id;
  
  const user = await User.findById(id);
  
  const product = await Product.create({ name, description, category, image,price });
  user.products.push(product._id);
  
  user.save();
  if (product) {
    res.status(200).json({
      id: product._id,
      description: product.description,
      name: product.name,
      category: product.category,
      image: product.image,
      price: product.price,
    });
  } else {
   res.status(400);
    throw new Error("Invalid product data");
  }
  
});
const getAllProduct =  asyncHandler(async(req,res,next)=>{
  const allProduct = await Product.find();
  res.status(200).json({allProduct: allProduct});
});

const getProductById = asyncHandler(async(req,res,next)=>{
  const id = req.params.id;
  const product = await Product.findById(id);
  res.status(200).json({product: product});
})
export { postProduct,getAllProduct, getProductById };
