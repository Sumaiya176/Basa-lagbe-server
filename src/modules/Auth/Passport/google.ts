import { Strategy as GoogleStrategy, Profile } from "passport-google-oauth20";
import { VerifyCallback } from "passport-oauth2";
import { User } from "../../User/user.model";
import AppError from "../../../Error/AppError";
import httpStatus from "http-status";
import { generateToken } from "../../../util/generateJwtToken";
import config from "../../../config";

export const googleStrategy = new GoogleStrategy(
  {
    clientID: config.google_id as string,
    clientSecret: config.google_secret as string,
    callbackURL: "/api/auth/google/callback",
  },
  async (
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback
  ) => {
    try {
      const email = profile.emails?.[0]?.value;
      //   const image = profile.photos?.[0]?.value;

      console.log("profile", profile, "email", email);

      if (!email)
        return done(
          new AppError(httpStatus.NOT_FOUND, "No email found in profile"),
          false
        );

      const user = await User.findOneAndUpdate(
        { email },
        {
          name: profile.displayName || email,
          email,
          provider: "google",
        },
        {
          upsert: true,
          new: true,
          setDefaultsOnInsert: true,
        }
      );

      const payload = {
        id: user?._id,
        email: user?.email,
        role: user?.role,
      };

      const accessToken = generateToken(
        config.jwt_access_secret as string,
        payload,
        7
      );
      const refreshToken = generateToken(
        config.jwt_refresh_secret as string,
        payload,
        7
      );

      return done(null, { accessToken, refreshToken });
    } catch (error) {
      return done(error as Error, false);
    }
  }
);
