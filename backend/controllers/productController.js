import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";
import User from "../models/userModel.js";
const postProduct = asyncHandler(async (req, res, next) => {
  const { name, description, category, image } = req.body;
  const userData = req.body.userData;
  const { email } = userData;
  const user = await User.findOne({ email });
  const product = await Product.create({ name, description, category, image });
  user.products.push(product);
  user.save();
  if (product) {
    res.status(200).json({
      _id: product._id,
      description: product.description,
      name: product.name,
      category: product.category,
      image: product.image,
    });
  } else {
    res.status(400);
    throw new Error("Invalid product data");
  }
  res.status(200).json({ message: "Post added Succesfully" });
});

export { postProduct };
