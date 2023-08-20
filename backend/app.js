import express from "express";
import connectDB from "./config/db.js";
import router from "./routes/userRoutes.js";
import dotenv from "dotenv";
dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(router);

app.listen(8080, () => {
  console.log("Server Connected...");
});
