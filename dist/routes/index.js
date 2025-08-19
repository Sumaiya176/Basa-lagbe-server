"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = require("../modules/User/user.route");
const auth_route_1 = require("../modules/Auth/auth.route");
const ToLetListings_route_1 = require("../modules/ToLetListings/ToLetListings.route");
const router = (0, express_1.Router)();
const allRoutes = [
    {
        path: "/user",
        route: user_route_1.userRouter,
    },
    {
        path: "/auth",
        route: auth_route_1.authRouter,
    },
    {
        path: "/listing",
        route: ToLetListings_route_1.ToLetListingsRouter,
    },
];
allRoutes.forEach((routePath) => router.use(routePath.path, routePath.route));
exports.default = router;
