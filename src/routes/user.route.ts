import { Router } from "express";
import { UserValidation } from "validations";
import { USER_ROUTES } from "utils/constants";
import { UserController } from "controllers";
import validate from "middlewares/validate";

const router = Router();
const { getUser, findAllUser } = UserController;
const { getUserValidation } = UserValidation;
const { FIND_ALL, GET_USER } = USER_ROUTES;

router.get(GET_USER, validate(getUserValidation), getUser);
router.get(FIND_ALL, findAllUser);

export default router;
