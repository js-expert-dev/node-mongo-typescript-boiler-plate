import { Request, Response } from "express";
import httpStatus from "http-status";
//types
import { GetUserParamsType } from "validations/types";
//services
import { UserService } from "services";

/**
 *
 * @param req
 * @param res
 */
export const getUser = async (req: Request, res: Response) => {
  const { params } = req || {};
  const { userId } = (params as GetUserParamsType) || {};

  const user = await UserService.findOne(userId);

  if (user) {
    res.status(httpStatus.NOT_FOUND).json({
      status: false,
      message: `User not found with id: ${userId}`,
      user: null,
    });
  }

  res.status(httpStatus.OK).json({
    status: true,
    message: `OK`,
    user,
  });
};

export const findAllUser = async (req: Request, res: Response) => {
  // const { params } = req || {};
  // const {} = (params as GetUserParamsType) || {};

  const users = await UserService.findAll();

  res.status(httpStatus.OK).json({
    status: true,
    message: `OK`,
    users,
  });
};
