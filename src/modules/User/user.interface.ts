import { Types } from "mongoose";

type savedProperty = {
  listingId: Types.ObjectId;
  savedAt: Date;
};
export interface IUser {
  isModified(arg0: string): unknown;
  userName: string;
  email: string;
  password?: string;
  provider: "google" | "github" | "facebook" | "credentials";
  passwordUpdatedAt?: Date | null;
  role: "user" | "admin" | "superAdmin";
  status: "blocked" | "active";
  savedProperty: savedProperty[];
  listingHistory: [Types.ObjectId];
  recentlyViewed: savedProperty[];
}

export type TDecodedUser = {
  id: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
};
