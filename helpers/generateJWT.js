import jwt from "jsonwebtoken";
import { SECRETKEY, TOKEN_TIMEOUT } from "./config";

export const generarJWT = (user) => {

    return new Promise((resolve, reject) => {

        const payload = {
            id: user._id,
            rol: user.rol
        };

        jwt.sign(payload, SECRETKEY, { expiresIn: TOKEN_TIMEOUT }, (err, token) => {
            if (err) {
                reject('No se pudo generar el token')
            } else {
                resolve(token);
            }
        })

    })
}