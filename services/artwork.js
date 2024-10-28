import { Artwork } from "../models/artwork.js";
import { ValidationError, NotFound } from "../helpers/errorHandler.js";
import { messagesByLang as msg } from "../helpers/messages.js";

export class ArtworkService {

    constructor() {
        this.model = Artwork;
    }

    // Obtener todos los artworks.
    async getAll() {
        return this.model.find({});
    }

    // Obtener un artwork por su ID y populatiza el objeto con sus categorias.
    async getById({ id }) {
        const artwork = await this.model.findById(id)
        .populate("categories")
        
        if (!artwork) {
            throw new NotFound(msg.artworkNotFound);
        }
        return artwork;
    }

    async create({ input }) {
        const artwork = new this.model(input);
        try {
            return await artwork.save();
        } catch (error) {
            throw new ValidationError("Error al crear la obra");
        }
    }

    async update({ id, input }) {
        const artwork = await this.model.findByIdAndUpdate(id, input, { new: true });
        if (!artwork) {
            throw new NotFound(msg.artworkNotFound);
        }
        return artwork;
    }

    async delete({ id }) {
        const artwork = await this.model.findByIdAndDelete(id);
        if (!artwork) {
            throw new ValidationError(msg.artworkNotFound);
        }
    }

}