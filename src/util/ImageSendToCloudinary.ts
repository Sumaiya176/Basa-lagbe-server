import config from "../config";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import multer from "multer";
import { Readable } from "stream";

cloudinary.config({
  cloud_name: config.cloudinary_cloud_name,
  api_key: config.cloudinary_api_key,
  api_secret: config.cloudinary_api_secret,
});

// ✅ Upload from buffer
export const ImageSendToCloudinary = (
  imageName: string,
  buffer: Buffer
): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { public_id: imageName.trim(), folder: "propertyImages" },
      (error, result) => {
        if (error) return reject(error);
        if (!result) return reject(new Error("Cloudinary result is empty"));
        resolve(result);
      }
    );

    Readable.from(buffer).pipe(uploadStream);
  });
};

// ✅ Multer: memory storage only
const storage = multer.memoryStorage();
export const upload = multer({ storage });
