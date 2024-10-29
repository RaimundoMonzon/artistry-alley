import jwt from "jsonwebtoken";
import { SECRETKEY, TOKEN_TIMEOUT, CART_TIMEOUT } from "./config.js";

export const generateJWT = (user) => {

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

export const generateCartToken = (cart) => {

    return new Promise((resolve, reject) => {

        const payload = {
            cartId: cart._id,
            exp: Math.floor(Date.now() / 1000) + CART_TIMEOUT
        }

        jwt.sign(payload, SECRETKEY, { expiresIn: CART_TIMEOUT }, (err, token) => {
            if (err) {
                reject('No se pudo generar el token del Carrito.')
            } else {
                resolve(token);
            }
        })

    })
}