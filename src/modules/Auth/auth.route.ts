import { Router } from "express";
import { authController } from "./auth.controller";
import schemaValidation from "../../middlewares/schemaValidation";
import { authValidation } from "./auth.validation";
import passport from "passport";

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
router.post("/logout", authController.logOut);

router.post(
  "/refresh-token",
  schemaValidation(authValidation.refreshTokenValidationSchema),
  authController.refreshToken
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

// GitHub OAuth
// router.get("/github", passport.authenticate("github", { scope: ["user:email"] }));
// router.get(
//   "/github/callback",
//   passport.authenticate("github", { session: false }),
//   (req, res) => res.redirect(`/dashboard?token=${req?.user?.token as string}`)
// );

router.get(
  "/github",
  passport.authenticate("github", { scope: ["profile", "email"] })
);
router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/login",
    session: false,
  }),
  authController.OAuthLoginSuccess
);
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  authController.OAuthLoginSuccess
);

export const authRouter = router;
