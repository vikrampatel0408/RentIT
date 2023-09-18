import express from "express";
import { protect } from "../middlerware/authMiddleware.js";
import { getAllProduct, getProductById, postProduct } from "../controllers/productController.js";
const router = express.Router();

router
.post("/",postProduct);
router
.get("/allproduct",getAllProduct);
router.get("/:id",getProductById);
export default router;