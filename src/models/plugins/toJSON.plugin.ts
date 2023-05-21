import { Schema } from "mongoose";

// Plugin function
const mongooseRemoveVPlugin = (schema: Schema): void => {
  // Remove the "__v" property from the schema
  schema.set("toJSON", {
    transform: (_doc, ret) => {
      const { _id, __v, ...rest } = ret || {};
      console.log("__v", __v);
      ret = {
        id: _id.toString(),
        ...rest,
      };
    },
  });
};

// Export the plugin
export default mongooseRemoveVPlugin;
