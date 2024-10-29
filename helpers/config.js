import {config} from "dotenv";

config();

export const {
    PORT,
    SECRETKEY,
    DB_USER,
    LANGUAGE,
    TOKEN_TIMEOUT,
    CART_TIMEOUT,
} = process.env;