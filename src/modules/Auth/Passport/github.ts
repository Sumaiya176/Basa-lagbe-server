import { Strategy as GitHubStrategy, Profile } from "passport-github2";
import { User } from "../../User/user.model";
import { VerifyCallback } from "passport-oauth2";
import { generateToken } from "../../../util/generateJwtToken";
import AppError from "../../../Error/AppError";
import httpStatus from "http-status";
import config from "../../../config";

export const githubStrategy = new GitHubStrategy(
  {
    clientID: config.github_id as string,
    clientSecret: config.github_secret as string,
    callbackURL: "http://localhost:5000/api/auth/github/callback",
  },
  async (
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback
  ) => {
    try {
      // console.log("profile", profile);
      const email = "sumaiya.tr96@gmail.com";
      //   const email = profile.emails?.[0].value;

      console.log("profile", profile, "email", email);

      if (!email)
        return done(
          new AppError(httpStatus.NOT_FOUND, "No email found in profile"),
          false
        );

      let user = await User.findOneAndUpdate(
        { email },
        {
          name: profile.username || email,
          email,
          provider: "github",
        },
        {
          upsert: true,
          new: true,
        }
      );

      const payload = {
        id: user?._id,
        email: user?.email,
        role: user?.role,
      };

      const token = generateToken(
        config.jwt_access_secret as string,
        payload,
        7
      );
      done(null, { token });
    } catch (error) {
      return done(error as Error, false);
    }
  }
);
