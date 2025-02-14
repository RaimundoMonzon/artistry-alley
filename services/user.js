import { User } from "../models/user.js"
import { generateJWT } from "../helpers/generateJWT.js";
import bcrypt from "bcrypt";
import { messagesByLang as msg } from "../helpers/messages.js";
import { NotFound, ValidationError } from "../helpers/errorHandler.js";

export class UserService {

    constructor() {
        this.model = User;
    }

    async getAll() {
        return this.model.find({});
    }

    // Obtiene un usuario por su ID y populatiza el objeto con sus artworks y exhibitions.
    async getById(id) {
        const user = await this.model.findById(id)

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
        const existingemail = await this.model.findOne({ email: input.email });
        if (existingemail) {
            throw new ValidationError(msg.emailAlreadyExists);
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

    async removeArtwork({ id, artworkId }) {
        const user = await this.model.findById(id);
        if (!user) {
            throw new NotFound(msg.userNotFound);
        }
        user.artworks = user.artworks.filter(artwork => artwork._id !== artworkId);
        return await user.save();
    }

    async removeExhibition({ id, exhibitionId }) {
        const user = await this.model.findById(id);
        if (!user) {
            throw new NotFound(msg.userNotFound);
        }
        user.exhibitions = user.exhibitions.filter(exhibition => exhibition._id !== exhibitionId);
        return await user.save();
    }

    async getProfile(id) {
        const user = await this.model.findById(id).select('-artworks -exhibitions');

        if (!user) {
            throw new NotFound(msg.userNotFound);
        }
        return user;
    }

    async checkForAdmin() {
        const anAdmin = await this.model.findOne({ rol: 'admin' });
        if (anAdmin) { throw new ValidationError(msg.adminAlreadyExists); }
        return false;
    }

    async addArtwork({ id, artwork }) {
        const user = await this.model.findById(id);
        if (!user) {
            throw new NotFound(msg.userNotFound);
        }
        user.artworks.push(artwork);
        return await user.save();
    }

    async addExhibition({ id, exhibition }) {
        const user = await this.model.findById(id);
        if (!user) {
            throw new NotFound(msg.userNotFound);
        }
        user.exhibitions.push(exhibition);
        await user.save();
        return exhibition;
    }

    async patch({ id, input }) {

        if (input.password < 6 || input.passwordConfirmation.length < 6) { throw new ValidationError(msg.minLength(6)); }

        if (input.password === input.passwordConfirmation) {
            input.password = await bcrypt.hash(input.password, 10);
            delete input.passwordConfirmation;
        } else {
            throw new ValidationError(msg.passwordsDoNotMatch);
        }

        const user = await this.model.findByIdAndUpdate(id, input, { new: true }).select('-artworks -exhibitions');
        if (!user) {
            throw new NotFound(msg.userNotFound);
        }
        return user;
    }

    async getAllArtistsNames() {
        const users = await this.model.find({ rol: 'user' });
        const artistNames = users.map(user => user.username);
        return artistNames;
    }
}