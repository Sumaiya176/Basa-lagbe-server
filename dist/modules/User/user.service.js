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
exports.userService = void 0;
const AppError_1 = __importDefault(require("../../Error/AppError"));
const user_model_1 = require("./user.model");
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const getAllUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.find();
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "No user found");
    }
    return result;
});
const getSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOne({ _id: id });
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "No user found");
    }
    return result;
});
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield user_model_1.User.findOne({ email: payload === null || payload === void 0 ? void 0 : payload.email });
    if (isUserExist) {
        throw new AppError_1.default(http_status_1.default.CONFLICT, "User is already exists");
    }
    const result = yield user_model_1.User.create(payload);
    if (!result) {
        throw new Error("Failed to register new user");
    }
    let jwtPayload = {
        name: result.userName,
        id: result._id,
        email: result.email,
        role: result.role,
    };
    const accessToken = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.jwt_access_secret, {
        expiresIn: "10d",
    });
    console.log(accessToken);
    const refreshToken = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.jwt_refresh_secret, {
        expiresIn: "30d",
    });
    return { accessToken, refreshToken, result };
});
const createAdmin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const admin = Object.assign(Object.assign({}, payload), { provider: "credentials" });
    const isUserExist = yield user_model_1.User.findOne({ email: payload === null || payload === void 0 ? void 0 : payload.email });
    if (isUserExist) {
        throw new AppError_1.default(http_status_1.default.CONFLICT, "User is already exists");
    }
    const result = yield user_model_1.User.create(admin);
    if (!result) {
        throw new Error("Failed to register new user");
    }
    return result;
});
const updateProfile = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(userId);
    const isUserFound = yield user_model_1.User.findOne({ _id: userId });
    if (!isUserFound) {
        throw new AppError_1.default(404, "User not found");
    }
    const result = yield user_model_1.User.findByIdAndUpdate(userId, payload, {
        new: true,
        runValidators: true,
    });
    if (!result) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Failed to update user profile");
    }
    return result;
});
exports.userService = {
    getAllUser,
    getSingleUser,
    createUser,
    createAdmin,
    updateProfile,
};
