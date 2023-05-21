import { Router } from "express";
import { UserValidation } from "validations";
import { USER_ROUTES } from "utils/constants";
import { UserController } from "controllers";
import validate from "middlewares/validate";

const router = Router();
const { getUser } = UserController;
const { getUserValidation } = UserValidation;

router.get(USER_ROUTES.GET_USER, validate(getUserValidation), getUser);

export default router;
