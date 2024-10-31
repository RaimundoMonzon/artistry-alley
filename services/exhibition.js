import { Exhibition } from "../models/exhibition.js";
import { NotFound } from "../helpers/errorHandler.js";
import { messagesByLang as msg } from "../helpers/messages.js";

export class ExhibitionService {
    constructor() {
        this.model = Exhibition;
    }

    async getAll() {
        return this.model.find({});
    }

    async getById({ id }) {
        const exhibition = await this.model.findById(id);

        if (!exhibition) {
            throw new NotFound(msg.exhibitionNotFound);
        }
        return exhibition;
    }

    async create({ input }) {
        const exhibition = new this.model(input);
        return await exhibition.save();
    }

    async update({ id, input }) {
        const exhibition = await this.model.findByIdAndUpdate(id, input, {
            new: true,
        });
        if (!exhibition) {
            throw new NotFound(msg.exhibitionNotFound);
        }
        return exhibition;
    }

    async delete({ id }) {
        const exhibition = await this.model.findByIdAndDelete(id);
        if (!exhibition) {
            throw new NotFound(msg.exhibitionNotFound);
        }
    }
}
