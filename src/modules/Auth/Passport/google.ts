import { Strategy as GoogleStrategy, Profile } from "passport-google-oauth20";
import { VerifyCallback } from "passport-oauth2";
import { User } from "../../User/user.model";
import AppError from "../../../Error/AppError";
import httpStatus from "http-status";
import { generateToken } from "../../../util/generateJwtToken";
import config from "../../../config";
import jwt from "jsonwebtoken";

export const googleStrategy = new GoogleStrategy(
  {
    clientID: config.google_id as string,
    clientSecret: config.google_secret as string,
    callbackURL: "http://localhost:5000/api/auth/google/callback",
  },
  async (
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback
  ) => {
    try {
      const email = profile.emails?.[0]?.value;

      if (!email) {
        return done(
          new AppError(httpStatus.NOT_FOUND, "No email found in profile"),
          false
        );
      }

      // check if user already exists
      let user = await User.findOne({ email });

      if (!user) {
        // create new user
        user = await User.create({
          userName: profile.displayName || email,
          email,
          provider: "google",
        });
      }

      // generate JWT
      const payload = {
        name: user.userName,
        id: user._id,
        email: user.email,
        role: user.role,
      };

      const accessToken = jwt.sign(
        payload,
        config.jwt_access_secret as string,
        {
          expiresIn: "10d",
        }
      );
      const refreshToken = jwt.sign(
        payload,
        config.jwt_refresh_secret as string,

        {
          expiresIn: "30d",
        }
      );

      return done(null, { accessToken, refreshToken, user });
    } catch (error) {
      return done(error as Error, false);
    }
  }
);
