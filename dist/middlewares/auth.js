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
const AppError_1 = __importDefault(require("../Error/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../config"));
const user_model_1 = require("../modules/User/user.model");
const generateJwtToken_1 = require("../util/generateJwtToken");
const auth = (...roles) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const token = req.headers.authorization;
            console.log(req.headers.authorization);
            if (!token) {
                throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "Your are not authorized");
            }
            let decoded = (0, generateJwtToken_1.verifyToken)(token, config_1.default.jwt_access_secret);
            // try {
            //   decoded = jwt.verify(
            //     token,
            //     config.jwt_access_secret as string
            //   ) as JwtPayload;
            // } catch (err) {
            //   throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized");
            // }
            const { id, role, iat } = decoded;
            console.log(decoded);
            const user = yield user_model_1.User.findById(id);
            if (!user)
                throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found.");
            if ((user === null || user === void 0 ? void 0 : user.status) === "blocked")
                throw new AppError_1.default(http_status_1.default.FORBIDDEN, "User is blocked.");
            if (roles && !roles.includes(role)) {
                throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "You are not authorized");
            }
            const passwordUpdateTime = new Date(user === null || user === void 0 ? void 0 : user.passwordUpdatedAt).getTime() / 1000;
            if ((user === null || user === void 0 ? void 0 : user.passwordUpdatedAt) && passwordUpdateTime > iat) {
                throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "You are not authorized");
            }
            req.user = decoded;
            next();
        }
        catch (err) {
            next(err);
        }
    });
};
exports.default = auth;
