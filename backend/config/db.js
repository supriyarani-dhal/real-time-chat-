import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `MONGODB connected !!! DB host: ${connectionInstance.connection.host}`
        .cyan.underline
    );
  } catch (error) {
    console.log(`MONGODB connection failed: ${error.message}`.red.bold);
    process.exit();
  }
};

export default connectDB;
