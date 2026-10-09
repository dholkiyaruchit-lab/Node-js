import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  cloud_api: process.env.CLOUD_API_KEY,
  cloud_secret: process.env.CLOUD_SECRET_KEY
});

export default cloudinary;
