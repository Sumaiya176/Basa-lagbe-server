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
exports.authService = void 0;
const AppError_1 = __importDefault(require("../../Error/AppError"));
const user_model_1 = require("../User/user.model");
const http_status_1 = __importDefault(require("http-status"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const sendEmail_1 = __importDefault(require("../../util/sendEmail"));
// ~~~~~~~~~~~~~~~~~~~~~~~ Login Service ~~~~~~~~~~~~~~~~~~~~~~~~~~
const login = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(payload);
    const isUserExists = yield user_model_1.User.findOne({ email: payload === null || payload === void 0 ? void 0 : payload.email }).select("+password");
    // ---- checking if the user is exist ------
    if (!isUserExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User is not found!!");
    }
    // ----- checking if the user is blocked or not -----
    if (isUserExists.status === "blocked") {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "The user is blocked");
    }
    // ----- checking if the password id matched or not -----
    const isPasswordMatched = yield bcrypt_1.default.compare(payload === null || payload === void 0 ? void 0 : payload.password, isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists.password);
    if (!isPasswordMatched)
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "Wrong Password");
    const jwtPayload = {
        id: isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists._id,
        email: isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists.email,
        role: isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists.role,
    };
    const accessToken = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.jwt_access_secret, {
        expiresIn: "10d",
    });
    const refreshToken = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.jwt_refresh_secret, {
        expiresIn: "30d",
    });
    //const result = await User.find();
    return { accessToken, refreshToken };
});
// ~~~~~~~~~~~~~~~~~~~~~~~  Refresh Token service ~~~~~~~~~~~~~~~~~~~~~~~
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_refresh_secret);
    const { id, iat } = decoded;
    console.log(decoded);
    const user = yield user_model_1.User.findById(id);
    if (!user)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found.");
    if ((user === null || user === void 0 ? void 0 : user.status) === "blocked")
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "User is blocked.");
    const passwordUpdateTime = new Date(user === null || user === void 0 ? void 0 : user.passwordUpdatedAt).getTime() / 1000;
    if ((user === null || user === void 0 ? void 0 : user.passwordUpdatedAt) && passwordUpdateTime > iat) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "You are not authorized");
    }
    const jwtPayload = {
        id: user === null || user === void 0 ? void 0 : user._id,
        email: user === null || user === void 0 ? void 0 : user.email,
        role: user === null || user === void 0 ? void 0 : user.role,
    };
    const accessToken = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.jwt_access_secret, {
        expiresIn: "10d",
    });
    return { accessToken };
});
// ~~~~~~~~~~~~~~~~~~~~~~~ Change Password ~~~~~~~~~~~~~~~~~~~~~~~
const changePassword = (userInfo, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ name: userInfo.name }).select("+password");
    // ------ checking if the user is exist ------
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User is not found!!");
    }
    // ----- checking if the old password is matched or not -----
    const isPasswordMatched = bcrypt_1.default.compare(payload === null || payload === void 0 ? void 0 : payload.oldPassword, user === null || user === void 0 ? void 0 : user.password);
    if (!isPasswordMatched)
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "Wrong Old Password");
    // ------ bcrypt the new password -------
    const encryptedPassword = yield bcrypt_1.default.hash(payload.newPassword, Number(config_1.default.bcrypt_salt_rounds));
    const result = yield user_model_1.User.findOneAndUpdate({ name: userInfo.name }, {
        password: encryptedPassword,
        passwordUpdatedAt: new Date(),
    });
    return result;
});
// ~~~~~~~~~~~~~~~~~~~~~~~ Forget Password ~~~~~~~~~~~~~~~~~~~~~~~
const forgetPassword = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(id);
    // ---- checking if the user is exist ------
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User is not found!!");
    }
    // ----- checking if the user is blocked or not -----
    if (user.status === "blocked") {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "The user is blocked");
    }
    const jwtPayload = {
        id: user === null || user === void 0 ? void 0 : user._id,
        email: user === null || user === void 0 ? void 0 : user.email,
        role: user === null || user === void 0 ? void 0 : user.role,
    };
    const resetToken = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.jwt_access_secret, {
        expiresIn: "10m",
    });
    const resetLink = `http://localhost:3000/?id=${user._id}&token=${resetToken}`;
    (0, sendEmail_1.default)(user === null || user === void 0 ? void 0 : user.email, resetLink);
});
// ~~~~~~~~~~~~~~~~~~~~~~~ Reset Password ~~~~~~~~~~~~~~~~~~~~~~~
const resetPassword = (_a, token_1) => __awaiter(void 0, [_a, token_1], void 0, function* ({ id, newPassword }, token) {
    const user = yield user_model_1.User.findById(id);
    // ---- checking if the user is exist ------
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User is not found!!");
    }
    // ----- checking if the user is blocked or not -----
    if (user.status === "blocked") {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "The user is blocked");
    }
    const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_access_secret);
    if (id !== decoded.id) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "You are forbidden");
    }
    const newHashedPassword = yield bcrypt_1.default.hash(newPassword, Number(config_1.default.bcrypt_salt_rounds));
    const result = yield user_model_1.User.findOneAndUpdate({ _id: id }, {
        password: newHashedPassword,
        passwordUpdatedAt: new Date(),
    });
});
exports.authService = {
    login,
    refreshToken,
    changePassword,
    forgetPassword,
    resetPassword,
};
