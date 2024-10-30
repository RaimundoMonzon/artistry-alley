import { User } from "../models/user.js"
import { generateJWT } from "../helpers/generateJWT.js";
import bcrypt from "bcrypt";
import { messagesByLang as msg } from "../helpers/messages.js";
import { NotFound, ValidationError } from "../helpers/errorHandler.js";

export class UserService {

    constructor() {
        this.model = User;
    }

    // CRUD Basico replicable.
    async getAll() {
        return this.model.find({});
    }

    // Obtiene un usuario por su ID y populatiza el objeto con sus artworks y exhibitions.
    async getById({ id }) {
        const user = await this.model.findById(id)
            .populate("artworks")
            .populate("exhibitions")

        if (!user) {
            throw new NotFound(msg.userNotFound);
        }
        return user;
    }

    async create({ input }) {
        const user = new this.model(input);
        return await user.save();
    }

    async update({ id, input }) {
        const user = await this.model.findByIdAndUpdate(id, input, { new: true });
        if (!user) {
            throw new NotFound(msg.userNotFound);
        }
        return user;
    }

    async delete({ id }) {
        const user = await this.model.findByIdAndDelete(id);
        if (!user) {
            throw new NotFound(msg.userNotFound);
        }
    }

    async registerUser({ input }) {
        // Chequear si el usuario ya existe.
        const existingUser = await this.model.findOne({ username: input.username });
        if (existingUser) {
            throw new ValidationError(msg.userAlreadyExists);
        }
        // Crear el usuario.
        const newUser = new this.model(input);
        // Guardar el usuario, y retornar el objeto. Si hay un error, lanzar una excepción.
        return await newUser.save();
    }

    async loginUser({ input }) {
        // Chequear si el usuario existe.
        const user = await this.model.findOne({ username: input.username });
        if (!user) {
            throw new NotFound(msg.userNotFound);
        }
        // Chequear si la contraseña es correcta.
        const isPasswordCorrect = await bcrypt.compare(input.password, user.password);
        if (!isPasswordCorrect) {
            throw new ValidationError(msg.invalidCredentials); // Error: Usuario o contraseña incorrectos.
        }
        // Si es valido, crear el token y se loguea.
        const token = await generateJWT(user);
        return { user, token }
    }

    async getUserEmail(id) {
        const user = await this.model.findById(id);
        if (!user) {
            throw new NotFound(msg.userNotFound);
        }
        return user.email;
    }
}