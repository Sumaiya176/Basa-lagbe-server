import config from "../config";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import streamifier from "streamifier";
import { UploadApiResponse } from "cloudinary";

cloudinary.config({
  cloud_name: config.cloudinary_cloud_name,
  api_key: config.cloudinary_api_key,
  api_secret: config.cloudinary_api_secret,
});

// ✅ Upload buffer directly to Cloudinary (no local disk)
export const ImageSendToCloudinary = (
  imageName: string,
  buffer: Buffer
): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { public_id: imageName.trim(), folder: "propertyImages" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result as UploadApiResponse);
      }
    );

    // Convert buffer to a readable stream
    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
};

// ✅ Use memory storage (no files on disk)
const storage = multer.memoryStorage();
export const upload = multer({ storage });
