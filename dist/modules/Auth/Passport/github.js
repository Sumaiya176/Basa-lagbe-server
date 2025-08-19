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
exports.githubStrategy = void 0;
const passport_github2_1 = require("passport-github2");
const user_model_1 = require("../../User/user.model");
const generateJwtToken_1 = require("../../../util/generateJwtToken");
const AppError_1 = __importDefault(require("../../../Error/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
exports.githubStrategy = new passport_github2_1.Strategy({
    clientID: config_1.default.github_id,
    clientSecret: config_1.default.github_secret,
    callbackURL: "http://localhost:5000/api/auth/github/callback",
}, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log("profile", profile);
        const email = "sumaiya.tr96@gmail.com";
        //   const email = profile.emails?.[0].value;
        console.log("profile", profile, "email", email);
        if (!email)
            return done(new AppError_1.default(http_status_1.default.NOT_FOUND, "No email found in profile"), false);
        let user = yield user_model_1.User.findOneAndUpdate({ email }, {
            name: profile.username || email,
            email,
            provider: "github",
        }, {
            upsert: true,
            new: true,
        });
        const payload = {
            id: user === null || user === void 0 ? void 0 : user._id,
            email: user === null || user === void 0 ? void 0 : user.email,
            role: user === null || user === void 0 ? void 0 : user.role,
        };
        const token = (0, generateJwtToken_1.generateToken)(config_1.default.jwt_access_secret, payload, 7);
        done(null, { token });
    }
    catch (error) {
        return done(error, false);
    }
}));
