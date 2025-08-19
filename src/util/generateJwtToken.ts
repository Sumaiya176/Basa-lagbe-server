// backend/src/utils/jwt.ts
import jwt, { JwtPayload } from "jsonwebtoken";
import { Types } from "mongoose";

import AppError from "../Error/AppError";
import httpStatus from "http-status";

export const generateToken = (
  secret: string,
  payload: {
    id: Types.ObjectId;
    email: string;
    role: "user" | "admin" | "superAdmin";
  },
  expiration: number
) => {
  return jwt.sign({ payload }, secret, { expiresIn: expiration });
};

export const verifyToken = (secret: string, token: string) => {
  let decoded: JwtPayload;
  try {
    decoded = jwt.verify(token, secret) as JwtPayload;
  } catch (err) {
    // console.log("err from verify", err);
    throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized");
  }
  return decoded;
};
