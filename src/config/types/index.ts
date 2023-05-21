export type ConfigType = {
  NODE_ENV: string;
  PORT: number;
  MONGODB_URL: string;
};

export type EnvType = {
  env: string;
  port: number;
  mongoose: {
    url: string;
  };
};
