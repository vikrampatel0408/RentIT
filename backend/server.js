import path from "path";
import express from "express";
const port = 6969;
import dotenv from "dotenv";
import db from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import { notFound, errorHandler } from "./middlerware/errorMiddleware.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import prodcutRoutes from "./routes/productRoutes.js";
import Twilio from "twilio";
db();
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/users", userRoutes);
app.use("/api/product", prodcutRoutes);
if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}
app.use(notFound);
app.use(errorHandler);
app.listen(port, () => console.log(`Server is running on ${port}...`));
