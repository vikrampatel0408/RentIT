import mongoose, { mongo } from "mongoose";
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://vikram:vikram1111@cluster0.ial2sfq.mongodb.net/RentIT"
    );
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error}`);
    process.exit(1);
  }
};
export default connectDB;
