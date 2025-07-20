import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../../util/sendResponse";
import { authService } from "./auth.service";
import config from "../../config";

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //console.log("hello from login", req.body);
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

const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { refreshToken } = req.cookies;
    const result = await authService.refreshToken(refreshToken);

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
    const result = await authService.changePassword(req.user, req.body);

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
    const result = await authService.resetPassword(req.body, token);

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
  refreshToken,
  changePassword,
  forgetPassword,
  resetPassword,
};
