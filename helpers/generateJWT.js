import jwt from "jsonwebtoken";
import { SECRETKEY, TOKEN_TIMEOUT } from "./config.js";
import { messagesByLang as msg } from "./messages.js";

export const generateJWT = (user) => {

    return new Promise((resolve, reject) => {

        const payload = {
            id: user._id,
            rol: user.rol
        };

        jwt.sign(payload, SECRETKEY, { expiresIn: TOKEN_TIMEOUT }, (err, token) => {
            if (err) {
                reject(msg.failedToGenerateToken);
            } else {
                resolve(token);
            }
        })

    })
}