import { UserService } from "../services/user";
import { languageByLang as msg } from "../helpers/messages.js";

const userService = new UserService();

// Es recomendable usar try/catch para manejar excepciones. Por ahora, no lo he hecho.

export class UserController {

    // Obtener todos los usuarios.
    async getAllUsers(req, res) {
        const users = await userService.getAll();
        res.status(200).json(users);
    }

    // Obtener un usuario.
    async getUser(req, res) {
        const user = await userService.getById(req.params.id);
        res.status(200).json(user);
    }

    // Crear un usuario.
    async createUser(req, res) {
        const user = await userService.create(req.body);
        res.status(201).json(user); // 201 SOlicitud exitosa que indica que se ha creado uno o mas recursos.
    }

    // Actualizar un usuario.
    async updateUser(req, res) {
        const user = await userService.update(req.params.id, req.body);
        res.status(200).json(user);
    }

    // Eliminar un usuario.
    async deleteUser(req, res) {
        const user = await userService.delete(req.params.id);
        res.status(200).json({ message: msg.deleteUserSuccess});
    }
}

