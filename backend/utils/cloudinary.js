import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();
export const uploadOnCloudinary = async (imgFile) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
  });
  try {
    const result = await cloudinary.uploader.upload(imgFile);
    return result.secure_url;
  } catch (error) {
    console.log("Cloudinary Error:", error);
    throw new Error("Cloudinary upload failed");
  }
};
