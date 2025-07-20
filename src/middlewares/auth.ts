import { NextFunction, Request, Response } from "express";
import AppError from "../Error/AppError";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { TUserRole } from "../interface/role";
import { User } from "../modules/User/user.model";

const auth = (...roles: TUserRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      console.log(req.headers.authorization);

      if (!token) {
        throw new AppError(httpStatus.UNAUTHORIZED, "Your are not authorized");
      }

      const decoded = jwt.verify(
        token,
        config.jwt_access_secret as string
      ) as JwtPayload;

      const { id, role, iat } = decoded;

      console.log(decoded);

      const user = await User.findById(id);

      if (!user) throw new AppError(httpStatus.NOT_FOUND, "User not found.");
      if (user?.status === "blocked")
        throw new AppError(httpStatus.FORBIDDEN, "User is blocked.");

      if (roles && !roles.includes(role)) {
        throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized");
      }

      const passwordUpdateTime =
        new Date(user?.passwordUpdatedAt as Date).getTime() / 1000;

      if (user?.passwordUpdatedAt && passwordUpdateTime > (iat as number)) {
        throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized");
      }

      req.user = decoded as JwtPayload;
      next();
    } catch (err) {
      next(err);
    }
  };
};

export default auth;
