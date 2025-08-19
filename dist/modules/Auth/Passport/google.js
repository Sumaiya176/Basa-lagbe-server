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
exports.googleStrategy = void 0;
const passport_google_oauth20_1 = require("passport-google-oauth20");
const user_model_1 = require("../../User/user.model");
const AppError_1 = __importDefault(require("../../../Error/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const generateJwtToken_1 = require("../../../util/generateJwtToken");
const config_1 = __importDefault(require("../../../config"));
exports.googleStrategy = new passport_google_oauth20_1.Strategy({
    clientID: config_1.default.google_id,
    clientSecret: config_1.default.google_secret,
    callbackURL: "/api/auth/google/callback",
}, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const email = (_b = (_a = profile.emails) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.value;
        //   const image = profile.photos?.[0]?.value;
        console.log("profile", profile, "email", email);
        if (!email)
            return done(new AppError_1.default(http_status_1.default.NOT_FOUND, "No email found in profile"), false);
        const user = yield user_model_1.User.findOneAndUpdate({ email }, {
            name: profile.displayName || email,
            email,
            provider: "google",
        }, {
            upsert: true,
            new: true,
            setDefaultsOnInsert: true,
        });
        const payload = {
            id: user === null || user === void 0 ? void 0 : user._id,
            email: user === null || user === void 0 ? void 0 : user.email,
            role: user === null || user === void 0 ? void 0 : user.role,
        };
        const accessToken = (0, generateJwtToken_1.generateToken)(config_1.default.jwt_access_secret, payload, 7);
        const refreshToken = (0, generateJwtToken_1.generateToken)(config_1.default.jwt_refresh_secret, payload, 7);
        return done(null, { accessToken, refreshToken });
    }
    catch (error) {
        return done(error, false);
    }
}));
