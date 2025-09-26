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
exports.authController = void 0;
const sendResponse_1 = require("../../util/sendResponse");
const auth_service_1 = require("./auth.service");
const config_1 = __importDefault(require("../../config"));
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield auth_service_1.authService.login(req.body);
        const { refreshToken } = result;
        res.cookie("refreshToken", refreshToken, {
            secure: config_1.default.node_env === "production",
            httpOnly: true,
        });
        (0, sendResponse_1.sendResponse)(res, {
            isSuccess: true,
            message: "User is logged in successfully",
            data: result,
        });
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});
const OAuthLoginSuccess = (req, res) => {
    //if (!req.user) return res.sendStatus(401);
    const user = req.user;
    console.log("hello from OAuthLoginSuccess", user);
    res.cookie("refreshToken", user === null || user === void 0 ? void 0 : user.refreshToken, {
        secure: config_1.default.node_env === "production",
        httpOnly: true,
    });
    // sendResponse(res, {
    //   isSuccess: true,
    //   message: "User is logged in successfully",
    //   data: user,
    // });
};
// ------------ user logout ------------
const logOut = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const token = req.cookies.refreshToken;
        // if (token) {
        //   const decoded = jwt.decode(token) as any;
        //   const user = await User.findById(decoded.id);
        //   if (user) {
        //     user.refreshToken = null;
        //     await user.save();
        //   }
        // }
        res.clearCookie("refreshToken");
        (0, sendResponse_1.sendResponse)(res, {
            isSuccess: true,
            message: "User logged out",
            data: {
                message: "User logged out",
            },
        });
    }
    catch (err) {
        next(err);
    }
});
const refreshToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.refreshToken;
        const result = yield auth_service_1.authService.refreshToken(token);
        const { refreshToken } = result;
        res.cookie("refreshToken", refreshToken, {
            //secure: config.node_env === "production",
            httpOnly: true,
            secure: true,
            sameSite: "none",
        });
        (0, sendResponse_1.sendResponse)(res, {
            isSuccess: true,
            message: "Access token is retrieved successfully",
            data: result,
        });
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});
const changePassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield auth_service_1.authService.changePassword(req.user, req.body);
        (0, sendResponse_1.sendResponse)(res, {
            isSuccess: true,
            message: "Password has changed successfully",
            data: result,
        });
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});
const forgetPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield auth_service_1.authService.forgetPassword(req.body.id);
        (0, sendResponse_1.sendResponse)(res, {
            isSuccess: true,
            message: "Reset link is generated successfully",
            data: result,
        });
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});
const resetPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization;
        const result = yield auth_service_1.authService.resetPassword(req.body, token);
        (0, sendResponse_1.sendResponse)(res, {
            isSuccess: true,
            message: "Password just reset successfully",
            data: result,
        });
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});
const editProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.user;
        console.log("user id", id);
        const result = yield auth_service_1.authService.editProfile(req.body, id);
        (0, sendResponse_1.sendResponse)(res, {
            isSuccess: true,
            message: "Profile edited successfully",
            data: result,
        });
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});
exports.authController = {
    login,
    logOut,
    refreshToken,
    changePassword,
    forgetPassword,
    resetPassword,
    OAuthLoginSuccess,
    editProfile,
};
