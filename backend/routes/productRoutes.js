import express from "express";
import { protect } from "../middlerware/authMiddleware.js";
import { postProduct } from "../controllers/productController.js";
const router = express.Router();

router
.post("/",protect,postProduct);

export default router;