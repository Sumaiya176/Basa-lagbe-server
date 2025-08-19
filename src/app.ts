import express, { Application } from "express";
import cors from "cors";
import router from "./routes";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import notFound from "./middlewares/notFound";
import cookieParser from "cookie-parser";
import passport from "passport";
import session from "express-session";
import { githubStrategy } from "./modules/Auth/Passport/github";
import { googleStrategy } from "./modules/Auth/Passport/google";
import mongoose from "mongoose";

const app: Application = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "https://basa-lagbe.vercel.app"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

/// ----------- Passport ----------  ////
app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(githubStrategy);
passport.use(googleStrategy);
passport.serializeUser((user: any, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  const user = await mongoose.model("User").findById(id);
  done(null, user);
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api", router);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(globalErrorHandler);
app.use(notFound);
export default app;
