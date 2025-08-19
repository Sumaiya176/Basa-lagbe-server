"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const schemaValidation_1 = __importDefault(require("../../middlewares/schemaValidation"));
const user_validation_1 = require("./user.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = (0, express_1.Router)();
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     authHeader:
 *       type: apiKey
 *       in: header
 *       name: Authorization
 *
 * security:
 *   - authHeader: []
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - userName
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of user
 *         userName:
 *           type: string
 *           description: User name
 *         email:
 *           type: string
 *           description: User email
 *         password:
 *           type: string
 *           description: User's password
 *         passwordUpdatedAt:
 *           type: string
 *           format: date
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the user was created
 *       example:
 *         name: "hello"
 *         email: "hello@gmail.com"
 *         password: "1234567"
 */
/**
 * @swagger
 * components:
 *   tags:
 *     name:
 *       - User
 *     description: User management APIs
 */
/**
 * @swagger
 * /api/user:
 *  post:
 *    summary: Register a new user
 *    tags: [User]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/User"
 *    responses:
 *      200:
 *        description: User registered successfully
 *
 * /api/user/updateProfile/{id}:
 *  patch:
 *    summary : Update a user profile
 *    tags: [User]
 *    security:
 *       - authHeader: []
 *    parameters:
 *      - in : path
 *        name : id
 *        required : true
 *        description : The user ID
 *        schema:
 *          type: string
 *    requestBody:
 *
 *      description: Update user's profile
 *      content:
 *        application/json:
 *          schema:
 *            $ref : "#/components/schemas/User"
 *    responses:
 *      200 :
 *        description : "Successfully updated user's profile"
 *      404 :
 *        description : "User not found"
 *
 *
 * */
router.post("/", (0, schemaValidation_1.default)(user_validation_1.userValidation.createUserValidationSchema), user_controller_1.userController.createUser);
router.patch("/updateProfile/:id", (0, auth_1.default)("admin", "user"), (0, schemaValidation_1.default)(user_validation_1.userValidation.updateUserProfileValidationSchema), user_controller_1.userController.updateProfile);
exports.userRouter = router;
