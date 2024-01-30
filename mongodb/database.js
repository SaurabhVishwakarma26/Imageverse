import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is connected successfully");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URL, {
      dbName: "imageverse",
      // useNewUrlParser: true,
      // useUnifiedUrlParser: true,
    });

    isConnected = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};
