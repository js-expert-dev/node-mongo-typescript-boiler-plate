import { Document } from "mongoose";
import { UserRoles } from "models/user.model";

export type UserSchemaType = {
  name: string;
  email: string;
  role: UserRoles;
  password: string;
  isBlock: boolean;
  isEmailVerified: boolean;
};

export type ModelType<T> = T & Document;
