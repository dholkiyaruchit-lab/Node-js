import mongoose from "mongoose";

async function connectDB() {
  try {
    const connect = await mongoose.connect(env.process.MONGO_URI);

    console.log("db connected");

    return connect;
  } catch (error) {
    console.log(error.message);
  }
}

export default connectDB;
