import jwt from "jsonwebtoken";
import { SECRETKEY } from "../helpers/config.js";
import { messagesByLang as msg } from "../helpers/messages.js";
import { handleError, NotFound, Unauthorized } from "../helpers/errorHandler.js";
import { User } from "../models/user.js";

export const validateToken = async (req, res, next) => {

    // Extrae el token del encabezado authorization como "Bearer <token>". 
    // (?.) verifica si el encabezado existe, si está, separa "Bearer" y "<token>", y devuelve el token.
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) { return handleError(new NotFound(msg.tokenNotFound), res); }

    jwt.verify(token, SECRETKEY, (err, decoded) => {

        if (err) { return handleError(new Unauthorized(msg.invalidToken), res); }

        req.user = decoded;

        next();
    });
};

export const validateAdmin = async (req, res, next) => {

    if (req.user.rol !== "admin") { return handleError(new Unauthorized(msg.notSufficientPermissions), res); }

    next();
};

export const validateArtworkOwnership = async (req, res, next) => {
    const user = await User.findById(req.user.id);

    if (!user) { return handleError(new NotFound(msg.userNotFound), res); }

    const artwork = user.artworks.some(artwork => artwork._id.toString() === req.params.id);

    if (!artwork) { return handleError(new Unauthorized(msg.notSufficientPermissions), res); }

    next();
};

export const validateExhibitionOwnership = async (req, res, next) => {
    const user = await User.findById(req.user.id);

    if (!user) { return handleError(new NotFound(msg.userNotFound), res); }

    const exhibition = user.exhibitions.some(exhibition => exhibition._id.toString() === req.params.id);

    if (!exhibition) { return handleError(new Unauthorized(msg.notSufficientPermissions), res); }

    next();
};