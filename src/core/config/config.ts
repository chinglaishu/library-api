export const APP_ENV = process.env.APP_ENV || "dev";

export const DB_HOST = process.env.DB_HOST;
export const DB_USERNAME = process.env.DB_USERNAME;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_NAME = process.env.DB_NAME;

export const PORT = process.env.PORT || "3000";

export const JWT_SECRET = process.env.JWT_SECRET || "secret";

export const ACCESS_TOKEN_EXPIRE_TIME = process.env.ACCESS_TOKEN_EXPIRE_TIME || "30d";
export const REFERSH_TOKEN_EXPIRE_TIME = process.env.REFERSH_TOKEN_EXPIRE_TIME || "180d";
export const PASSWORD_SALT_ROUND = 10;
