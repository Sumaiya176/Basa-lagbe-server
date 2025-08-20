import { Types } from "mongoose";

export interface IUser {
  userName: string;
  email: string;
  password?: string | null;
  provider: "google" | "github" | "facebook" | "credentials";
  passwordUpdatedAt?: Date | null;
  role: "user" | "admin" | "superAdmin";
  status: "blocked" | "active";
  savedProperty: [Types.ObjectId];
  listingHistory: [Types.ObjectId];
}

export type TDecodedUser = {
  id: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
};
