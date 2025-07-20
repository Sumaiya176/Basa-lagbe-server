import { Router } from "express";
import { userRouter } from "../modules/User/user.route";
import { authRouter } from "../modules/Auth/auth.route";
import { ToLetListingsRouter } from "../modules/ToLetListings/ToLetListings.route";

const router = Router();

const allRoutes = [
  {
    path: "/user",
    route: userRouter,
  },
  {
    path: "/auth",
    route: authRouter,
  },
  {
    path: "/to-letListings",
    route: ToLetListingsRouter,
  },
];

allRoutes.forEach((routePath) => router.use(routePath.path, routePath.route));

export default router;
