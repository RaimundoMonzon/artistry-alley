import { UserService } from "../services/user";
import {languageByLang as msg} from "../helpers/messages.js";

const userService = new UserService();

// Es recomendable usar try/catch para manejar excepciones. Por ahora, no lo he hecho.

export class AuthController {

    // Registrar un usuario.
    async registerUser(req, res) {
        const input = req.body;
        const user = await userService.registerUser({ input });
        // No hay Try/Catch, porque si hay un error, el UserService lanza una excepción.
        res.status(201).json({message: msg.registerSuccess, user});
    }

    // Login de un usuario.
    async loginUser(req, res) {
        const input = req.body;
        const { user, token } = await userService.loginUser({ input });
        // No hay Try/Catch, porque si hay un error, el UserService lanza una excepción.
        res.status(200).json({message: msg.loginSuccess, user, token});
    }
}

export default AuthController();