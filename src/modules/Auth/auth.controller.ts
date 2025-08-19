import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../../util/sendResponse";
import { authService } from "./auth.service";
import config from "../../config";

import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../User/user.model";

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("hello from login", req.body);
    const result = await authService.login(req.body);

    const { refreshToken } = result;
    res.cookie("refreshToken", refreshToken, {
      secure: config.node_env === "production",
      httpOnly: true,
    });

    sendResponse(res, {
      isSuccess: true,
      message: "User is logged in successfully",
      data: result,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const OAuthLoginSuccess = (req: Request, res: Response) => {
  //if (!req.user) return res.sendStatus(401);

  const user = req.user as any;
  console.log("hello from OAuthLoginSuccess", user);

  res.cookie("refreshToken", user?.refreshToken, {
    secure: config.node_env === "production",
    httpOnly: true,
  });

  // sendResponse(res, {
  //   isSuccess: true,
  //   message: "User is logged in successfully",
  //   data: user,
  // });
};

// ------------ user logout ------------
const logOut = async (req: Request, res: Response, next: NextFunction) => {
  console.log("hekki");
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

    sendResponse(res, {
      isSuccess: true,
      message: "User logged out",
      data: {
        message: "User logged out",
      },
    });
  } catch (err) {
    next(err);
  }
};

const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.refreshToken;
    const result = await authService.refreshToken(token);

    const { refreshToken } = result;
    res.cookie("refreshToken", refreshToken, {
      //secure: config.node_env === "production",
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    sendResponse(res, {
      isSuccess: true,
      message: "Access token is retrieved successfully",
      data: result,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const changePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await authService.changePassword(
      req.user as JwtPayload,
      req.body
    );

    sendResponse(res, {
      isSuccess: true,
      message: "Password has changed successfully",
      data: result,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const forgetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await authService.forgetPassword(req.body.id);

    sendResponse(res, {
      isSuccess: true,
      message: "Reset link is generated successfully",
      data: result,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization;
    const result = await authService.resetPassword(req.body, token as string);

    sendResponse(res, {
      isSuccess: true,
      message: "Password just reset successfully",
      data: result,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const authController = {
  login,
  logOut,
  refreshToken,
  changePassword,
  forgetPassword,
  resetPassword,
  OAuthLoginSuccess,
};
