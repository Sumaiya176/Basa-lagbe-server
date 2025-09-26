"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const schemaValidation_1 = __importDefault(require("../../middlewares/schemaValidation"));
const auth_validation_1 = require("./auth.validation");
const passport_1 = __importDefault(require("passport"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = (0, express_1.Router)();
/**
 * @swagger
 * components:
 *   schemas:
 *     Auth:
 *       type: object
 *       required:
 *         - name
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           description: User name
 *         password:
 *           type: string
 *           description: User's password
 *       example:
 *         name: "hello"
 *         password: "1234567"
 */
/**
 * @swagger
 * components:
 *   tags:
 *     name:
 *       - Auth
 *     description: Authentication APIs
 */
/**
 * @swagger
 * /api/auth/login:
 *  post:
 *    summary: Login a user
 *    tags: [Auth]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/Auth"
 *    responses:
 *       200:
 *         description: Successful login
 *       401:
 *         description: Invalid credentials
 *       403:
 *         description: User is blocked
 */
router.post("/login", (0, schemaValidation_1.default)(auth_validation_1.authValidation.loginValidationSchema), auth_controller_1.authController.login);
router.post("/logout", auth_controller_1.authController.logOut);
router.post("/refresh-token", (0, schemaValidation_1.default)(auth_validation_1.authValidation.refreshTokenValidationSchema), auth_controller_1.authController.refreshToken);
router.post("/change-password", (0, schemaValidation_1.default)(auth_validation_1.authValidation.changePasswordValidationSchema), auth_controller_1.authController.changePassword);
router.post("/forget-password", (0, schemaValidation_1.default)(auth_validation_1.authValidation.forgetPasswordValidationSchema), auth_controller_1.authController.changePassword);
router.post("/reset-password", (0, schemaValidation_1.default)(auth_validation_1.authValidation.resetPasswordValidationSchema), auth_controller_1.authController.changePassword);
router.patch("/edit-profile", (0, auth_1.default)("user", "admin", "superAdmin"), auth_controller_1.authController.editProfile);
// GitHub OAuth
// router.get("/github", passport.authenticate("github", { scope: ["user:email"] }));
// router.get(
//   "/github/callback",
//   passport.authenticate("github", { session: false }),
//   (req, res) => res.redirect(`/dashboard?token=${req?.user?.token as string}`)
// );
router.get("/github", passport_1.default.authenticate("github", { scope: ["profile", "email"] }));
router.get("/github/callback", passport_1.default.authenticate("github", {
    failureRedirect: "/login",
    session: false,
}), auth_controller_1.authController.OAuthLoginSuccess);
router.get("/google", passport_1.default.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback", passport_1.default.authenticate("google", {
    failureRedirect: "/login",
    session: false,
}), auth_controller_1.authController.OAuthLoginSuccess);
exports.authRouter = router;
