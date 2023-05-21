import { UserModel } from "models";
import { ModelType, UserSchemaType } from "models/types";

/**
 *
 * @param id
 * @returns User
 */
export const findOne = async (
  id: string
): Promise<ModelType<UserSchemaType> | null> => {
  const user = await UserModel.findOne({ _id: { id } });
  return user;
};
