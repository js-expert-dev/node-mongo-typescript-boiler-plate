import { Schema, PopulateOptions } from "mongoose";

// Pagination options
type PaginationOptions = {
  limit?: number;
  page?: number;
  search?: string;
  populate?: PopulateOptions | (PopulateOptions | string)[];
};

type PaginationResponse = {
  data: [];
  total: number;
  limit: number;
  page: number;
  totalPages: number;
};

// Plugin function
const mongoosePaginationPlugin = (schema: Schema): void => {
  // Add a static method for pagination
  schema.statics.paginate = async function paginate(
    this,
    options: PaginationOptions = {}
  ): Promise<PaginationResponse> {
    const { limit = 10, page = 1, search, populate } = options;

    const countQuery = this.find();
    const dataQuery = this.find();

    // Apply search if provided
    if (search) {
      const searchRegex = new RegExp(search, "i");
      countQuery.or([{ name: searchRegex }, { description: searchRegex }]);
      dataQuery.or([{ name: searchRegex }, { description: searchRegex }]);
    }

    // Get total count
    const total = await countQuery.countDocuments();

    // Calculate skip value based on page and limit
    const skip = (page - 1) * limit;

    // Apply pagination to data query
    dataQuery.limit(limit).skip(skip);

    // Apply population if provided
    if (populate) {
      dataQuery.populate(populate);
    }

    // Execute data query
    const data = await dataQuery.exec();

    // Calculate total pages
    const totalPages = Math.ceil(total / limit);

    return {
      data,
      total,
      limit,
      page,
      totalPages,
    };
  };
};

// Export the plugin
export default mongoosePaginationPlugin;
