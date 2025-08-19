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
const mongoose_1 = __importDefault(require("mongoose"));
const user_model_1 = require("../User/user.model");
const createToLetListings = (files, payload, user) => __awaiter(void 0, void 0, void 0, function* () {
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
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const newListing = yield ToLetListings_model_1.ToLetListing.create([payload], { session });
        if (!newListing) {
            throw new Error("Failed to add listings");
        }
        const updateUserListingHistory = yield user_model_1.User.findByIdAndUpdate(user.id, { $push: { listingHistory: newListing[0]._id } }, { new: true, session }).session(session);
        if (!updateUserListingHistory) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
        }
        yield session.commitTransaction();
        session.endSession();
        return newListing[0];
    }
    catch (err) {
        console.log("error", err);
        yield session.abortTransaction();
        session.endSession();
        throw new Error();
    }
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
    const isListingExist = yield ToLetListings_model_1.ToLetListing.findById(id);
    if (!isListingExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Listing is not found");
    }
    const result = yield ToLetListings_model_1.ToLetListing.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return result;
});
const deleteToLetListings = (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const isListingExist = yield ToLetListings_model_1.ToLetListing.findById(id);
    if (!isListingExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Listing is not found");
    }
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const deleteFromListing = yield ToLetListings_model_1.ToLetListing.findByIdAndDelete(id, {
            session,
        });
        if (!deleteFromListing) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Listing not found or already deleted");
        }
        const deleteFromUser = yield user_model_1.User.findByIdAndUpdate(userId, { $pull: { listingHistory: id } }, { new: true, session }).session(session);
        if (!deleteFromUser) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
        }
        yield session.commitTransaction();
        session.endSession();
        return { deleteFromListing, deleteFromUser };
    }
    catch (err) {
        console.log("error", err);
        yield session.abortTransaction();
        session.endSession();
        throw new Error();
    }
});
const myLetListings = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findById(user.id).populate("listingHistory");
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Listing is not found");
    }
    return result;
});
exports.ToLetListingsService = {
    createToLetListings,
    getAllToLetListings,
    getSingleToLetListings,
    updateToLetListings,
    deleteToLetListings,
    myLetListings,
};
