import { Router } from "express";
import { userController } from "./user.controller";
import schemaValidation from "../../middlewares/schemaValidation";
import { userValidation } from "./user.validation";
import auth from "../../middlewares/auth";

const router = Router();

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

router.get("/", auth("admin"), userController.getAllUser);
router.post(
  "/",
  schemaValidation(userValidation.createUserValidationSchema),
  userController.createUser
);
router.patch(
  "/updateProfile/:id",
  auth("admin", "user"),
  schemaValidation(userValidation.updateUserProfileValidationSchema),
  userController.updateProfile
);

export const userRouter = router;
