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
exports.userController = void 0;
const user_service_1 = require("./user.service");
const sendResponse_1 = require("../../util/sendResponse");
const config_1 = __importDefault(require("../../config"));
const getAllUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.userService.getAllUser();
        console.log("result", result);
        (0, sendResponse_1.sendResponse)(res, {
            isSuccess: true,
            message: "Retrieved all users successfully",
            data: result,
        });
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});
const getSingleUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const { id } = req.params
        const { id } = req.user;
        const result = yield user_service_1.userService.getSingleUser(id);
        console.log("result", result);
        (0, sendResponse_1.sendResponse)(res, {
            isSuccess: true,
            message: "Retrieved single user successfully",
            data: result,
        });
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.userService.createUser(req.body);
        const { refreshToken } = result;
        res.cookie("refreshToken", refreshToken, {
            secure: config_1.default.node_env === "production",
            httpOnly: true,
        });
        (0, sendResponse_1.sendResponse)(res, {
            isSuccess: true,
            message: "User created successfully",
            data: result,
        });
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});
const createAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.userService.createAdmin(req.body);
        (0, sendResponse_1.sendResponse)(res, {
            isSuccess: true,
            message: "Admin created successfully",
            data: result,
        });
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});
const updateProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.userService.updateProfile(req.params.id, req.body);
        console.log(result);
        (0, sendResponse_1.sendResponse)(res, {
            isSuccess: true,
            message: "User's profile updated successfully",
            data: result,
        });
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});
exports.userController = {
    getAllUser,
    getSingleUser,
    createUser,
    createAdmin,
    updateProfile,
};
