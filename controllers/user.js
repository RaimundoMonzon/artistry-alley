import { UserService } from "../services/user.js";
import { ArtworkService } from "../services/artwork.js";
import { ExhibitionService } from "../services/exhibition.js";
import { messagesByLang as msg } from "../helpers/messages.js";

const userService = new UserService();
const artworkService = new ArtworkService();
const exhibitionService = new ExhibitionService();

export class UserController {

    // Obtener todos los usuarios.
    static async getAllUsers(req, res) {
        const users = await userService.getAll();
        res.status(200).json(users);
    }

    // Obtener un usuario.
    static async getUser(req, res) {
        const user = await userService.getById(req.params.userId);
        res.status(200).json(user);
    }

    // Crear un usuario.
    static async createUser(req, res) {
        const user = await userService.create({ input: req.body });
        res.status(201).json(user);
    }

    // Actualizar un usuario.
    static async updateUser(req, res) {
        const user = await userService.update({ id: req.params.userId, input: req.body });
        res.status(200).json(user);
    }

    // Eliminar un usuario.
    static async deleteUser(req, res) {
        await userService.delete({ id: req.params.userId });
        res.status(200).json({ message: msg.deleteUserSuccess });
    }

    static async addArtworkToUser(req, res) {
        const artwork = await artworkService.getById({ id: req.params.artworkId });
        const user = await userService.addArtwork({ id: req.params.userId, artwork: artwork });
        res.status(200).json(user);
    }

    static async removeArtworkFromUser(req, res) {
        const user = await userService.removeArtwork({ id: req.params.userId, artworkId: req.params.artworkId });
        res.status(200).json(user);
    }

    static async addExhibitionToUser(req, res) {
        const exhibition = await exhibitionService.getById({ id: req.params.exhibitionId });
        const user = await userService.addExhibition({ id: req.params.userId, exhibition: exhibition });
        res.status(200).json(user);
    }

    static async removeExhibitionFromUser(req, res) {
        const user = await userService.removeExhibition({ id: req.params.userId, exhibitionId: req.params.exhibitionId });
        res.status(200).json(user);
    }

    static async getUserProfile(req, res) {
        const user = await userService.getProfile(req.user.id);
        res.status(200).json(user);
    }

    static async getUserArtworks(req, res) {
        const user = await userService.getById(req.params.userId);
        res.status(200).json(user.artworks);
    }

    static async getUserExhibitions(req, res) {
        const user = await userService.getById(req.params.userId);
        res.status(200).json(user.exhibitions);
    }
}