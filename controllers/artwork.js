import { ArtworkService } from "../services/artwork.js";
import { messagesByLang as msg } from "../helpers/messages.js";
import { UserService } from "../services/user.js";
import { CategoryService } from "../services/category.js";

const artworkService = new ArtworkService();
const userService = new UserService();

export class ArtworkController {

    // Obtener todos los artworks.  
    static async getAllArtworks(req, res) {
        const artworks = await artworkService.getAll();
        res.status(200).json(artworks);
    }

    // Obtener un artwork.
    static async getArtwork(req, res) {
        const artwork = await artworkService.getById(req.params.id);
        res.status(200).json(artwork);
    }

    // Crear un artwork.
    static async createArtwork(req, res) {
        const artwork = await artworkService.create({ input: req.body });
        const savedArtwork = userService.addArtwork({ id: req.user.id, artwork: artwork });
        res.status(201).json(savedArtwork);
    }

    // Actualizar un artwork.
    static async updateArtwork(req, res) {
        const artwork = await artworkService.update({ id: req.params.id, input: req.body });
        res.status(200).json(artwork);
    }

    // Eliminar un artwork.
    static async deleteArtwork(req, res) {
        await artworkService.delete(req.params.id);
        res.status(200).json({ message: msg.deleteArtworkSuccess });
    }
}