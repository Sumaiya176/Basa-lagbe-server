"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToLetListingsService = void 0;
const AppError_1 = __importDefault(require("../../Error/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const ToLetListings_model_1 = require("./ToLetListings.model");
const ImageSendToCloudinary_1 = require("../../util/ImageSendToCloudinary");
const createToLetListings = (files, payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("from to let listings", files, payload);
    if (files && files.length) {
        const imageUrls = [];
        for (const file of files) {
            const imageName = `${payload.ownerName}${Date.now()}`;
            const path = file.path;
            const { secure_url } = yield (0, ImageSendToCloudinary_1.ImageSendToCloudinary)(imageName, path);
            imageUrls.push(secure_url);
        }
        payload.propertyImages = imageUrls;
    }
    if (new Date(payload === null || payload === void 0 ? void 0 : payload.availability) < new Date()) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Availability cannot be less than current date");
    }
    return yield ToLetListings_model_1.ToLetListing.create(payload);
});
const getAllToLetListings = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield ToLetListings_model_1.ToLetListing.find();
});
const getSingleToLetListings = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield ToLetListings_model_1.ToLetListing.findById(id);
    if (!isUserExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Listing is not found");
    }
    return isUserExist;
});
const updateToLetListings = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(id, payload);
    const isUserExist = yield ToLetListings_model_1.ToLetListing.findById(id);
    if (!isUserExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Listing is not found");
    }
    const result = yield ToLetListings_model_1.ToLetListing.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return result;
});
const deleteToLetListings = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield ToLetListings_model_1.ToLetListing.findById(id);
    if (!isUserExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Listing is not found");
    }
    const result = yield ToLetListings_model_1.ToLetListing.findByIdAndDelete(id);
    return result;
});
exports.ToLetListingsService = {
    createToLetListings,
    getAllToLetListings,
    getSingleToLetListings,
    updateToLetListings,
    deleteToLetListings,
};
