import express from "express";
import { protect } from "../middlerware/authMiddleware.js";
import { getAllProduct, getProductById, postProduct,getUserProduct } from "../controllers/productController.js";
const router = express.Router();

router
.post("/",postProduct);
router
.get("/allproduct",getAllProduct);
router.get("/:id",getProductById);
router.get("/userproducts/:id",getUserProduct);
export default router;