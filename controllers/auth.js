import { UserService } from "../services/user.js";
import { messagesByLang as msg } from "../helpers/messages.js";

const userService = new UserService();

export class AuthController {

    // Registrar un usuario.
    static async registerUser(req, res) {
        const isThereAnAdmin = await userService.checkForAdmin();
        if (!isThereAnAdmin || req.body.rol === 'user') {
            const user = await userService.registerUser({ input: req.body });
            res.status(201).json({ message: msg.registerSuccess, user });
        }
    }

    // Login de un usuario.
    static async loginUser(req, res) {
        const { user, token } = await userService.loginUser({ input: req.body });
        res.status(200).json({ message: msg.loginSuccess, user, token });
    }

    // Logout de un usuario.
    static async logoutUser(req, res) {
        res.clearCookie('token');
        res.status(200).json({ message: msg.logoutSuccess });
    }
}