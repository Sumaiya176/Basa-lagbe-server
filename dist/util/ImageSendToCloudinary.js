"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = exports.ImageSendToCloudinary = void 0;
const config_1 = __importDefault(require("../config"));
const cloudinary_1 = require("cloudinary");
const multer_1 = __importDefault(require("multer"));
const stream_1 = require("stream");
cloudinary_1.v2.config({
    cloud_name: config_1.default.cloudinary_cloud_name,
    api_key: config_1.default.cloudinary_api_key,
    api_secret: config_1.default.cloudinary_api_secret,
});
// ✅ Upload from buffer
const ImageSendToCloudinary = (imageName, buffer) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary_1.v2.uploader.upload_stream({ public_id: imageName.trim(), folder: "propertyImages" }, (error, result) => {
            if (error)
                return reject(error);
            if (!result)
                return reject(new Error("Cloudinary result is empty"));
            resolve(result);
        });
        stream_1.Readable.from(buffer).pipe(uploadStream);
    });
};
exports.ImageSendToCloudinary = ImageSendToCloudinary;
// ✅ Multer: memory storage only
const storage = multer_1.default.memoryStorage();
exports.upload = (0, multer_1.default)({ storage });
