import express from "express";
import { protect } from "../middlerware/authMiddleware.js";
import {
  getAllProduct,
  getProductById,
  postProduct,
  getUserProduct,
  postOffer,
  getoffer,
  acceptOffer,
  userOrders,
  rejectOffer,
  getMarkSold,
} from "../controllers/productController.js";
const router = express.Router();
import path from "path";
import multer from "multer";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/Images"));
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});
// const upload = multer({ storage: storage });
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("file"), postProduct);
router.get("/allproduct", getAllProduct);
router.get("/marksold/:id", getMarkSold);
router.get("/:id", getProductById);
router.get("/userproducts/:id", getUserProduct);
router.post("/offer/:id", postOffer);
router.get("/offer/:id", getoffer);
router.post("/offer/accept/:id", acceptOffer);
router.post("/offer/reject/:id", rejectOffer);
router.get("/userorders/:id", userOrders);

export default router;
