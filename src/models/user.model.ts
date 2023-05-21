import { CallbackError, Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
//types
import { ModelType, UserSchemaType } from "./types";
import { paginate, toJSON } from "./plugins";

export enum UserRoles {
  USER = "user",
  ADMIN = "admin",
  SUPER_ADMIN = "super_admin",
}

const userSchema = new Schema<UserSchemaType>(
  {
    name: {
      type: String,
      required: false,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      select: false,
      required: false,
      trim: true,
      minlength: 8,
      private: true,
    },
    role: {
      type: String,
      enum: UserRoles,
      default: UserRoles.USER,
    },
    isBlock: { type: Boolean, default: false },
    isEmailVerified: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  try {
    if (this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, 8);
    }

    next();
  } catch (error) {
    next(error as CallbackError);
  }
});

userSchema.plugin(toJSON);
userSchema.plugin(paginate);

const User = model<ModelType<UserSchemaType>>("User", userSchema);

export type UserModelType = typeof User;

export default User;
