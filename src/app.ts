//package imports

import cors from "cors";
import { connect } from "mongoose";
import httpStatus from "http-status";
import express, { Application } from "express";

//user imports
import routes from "routes";
import { env } from "./config";
import ApiError from "utils/APIError";

// defining port e.g; 3001

const port = env.port;
const mongo_url: string = env.mongoose.url || "";

//creating Application server with express

const app: Application = express();

// enable cors
app.use(cors());
app.options("*", cors());

// Body parsing Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// v1 api routes
app.use("/v1", routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

//conecting mongo db
const bootstrap = async () => {
  try {
    await connect(mongo_url);
    app.listen(port, (): void => {
      console.log(`Connected successfully on port ${port}`);
    });
  } catch (error) {
    console.error(`Error occured: ${error}`);
  }
};

bootstrap();
