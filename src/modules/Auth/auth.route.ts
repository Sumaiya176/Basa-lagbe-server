import { Router } from "express";
import { authController } from "./auth.controller";
import schemaValidation from "../../middlewares/schemaValidation";
import { authValidation } from "./auth.validation";

const router = Router();

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

router.post(
  "/login",
  schemaValidation(authValidation.loginValidationSchema),
  authController.login
);
router.post(
  "/refresh-token",
  schemaValidation(authValidation.refreshTokenValidationSchema),
  authController.login
);
router.post(
  "/change-password",
  schemaValidation(authValidation.changePasswordValidationSchema),
  authController.changePassword
);
router.post(
  "/forget-password",
  schemaValidation(authValidation.forgetPasswordValidationSchema),
  authController.changePassword
);
router.post(
  "/reset-password",
  schemaValidation(authValidation.resetPasswordValidationSchema),
  authController.changePassword
);

export const authRouter = router;
