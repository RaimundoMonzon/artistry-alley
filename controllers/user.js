import { UserService } from "../services/user.js";
import { messagesByLang as msg } from "../helpers/messages.js";
import { handleError } from "../helpers/errorHandler.js";

const userService = new UserService();

export class UserController {

    // Obtener todos los usuarios.
    static async getAllUsers(req, res) {
        const users = await userService.getAll();
        res.status(200).json(users);
    }

    // Obtener un usuario.
    static async getUser(req, res) {
        try {
            const { id } = req.params;
            const user = await userService.getById({ id });
            res.status(200).json(user);
        } catch (error) {
            handleError(error, res);
        }
    }

    // Crear un usuario.
    static async createUser(req, res) {
        try {
            const user = await userService.create({input: req.body});
            res.status(201).json(user); // 201 Solicitud exitosa que indica que se ha creado uno o mas recursos.
        } catch (error) {
            handleError(error, res);
        }
    }

    // Actualizar un usuario.
    static async updateUser(req, res) {
        try {
            const user = await userService.update({ id: req.params.id, input: req.body });
            res.status(200).json(user);
        } catch (error) {
            handleError(error, res);
        }
    }

    // Eliminar un usuario.
    static async deleteUser(req, res) {
        try {
            const user = await userService.delete({ id: req.params.id });
            res.status(200).json({ message: msg.deleteUserSuccess });
        } catch (error) {
            handleError(error, res);
        }
    }
}

