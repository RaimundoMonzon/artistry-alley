import { UserService } from "../services/user.js";
import {messagesByLang as msg} from "../helpers/messages.js";
import { handleError } from "../helpers/errorHandler.js";

const userService = new UserService();

export class AuthController {

    // Registrar un usuario.
    static async registerUser(req, res) {
        try {
            const {body} = req; // Esta es una manera de acceder a los datos de la petición.
            const user = await userService.registerUser({ input: body });
            res.status(201).json({message: msg.registerSuccess, user});
        } catch (error) {
            handleError(error, res);
        }
    }

    // Login de un usuario.
    static async loginUser(req, res) {
        try {
            const input = req.body; // Esta es otra manera de acceder a los datos de la petición.
            const { user, token } = await userService.loginUser({ input });
            res.status(200).json({message: msg.loginSuccess, user, token});
        } catch (error) {
            handleError(error, res);
        }
    }
}