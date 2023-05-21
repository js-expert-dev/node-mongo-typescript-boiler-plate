import { Router } from "express";

import userRoute from "./user.route";
import { MAIN_ROUTES } from "utils/constants";

const router = Router();

const defaultRoutes = [
  {
    path: MAIN_ROUTES.USER,
    route: userRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
