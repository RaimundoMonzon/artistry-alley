import { ExhibitionService } from "../services/exhibition.js";
import { messagesByLang as msg } from "../helpers/messages.js";

const exhibitionService = new ExhibitionService();

export class ExhibitionController {
    
    static async getAllExhibitions(req, res) {
        const exhibitions = await exhibitionService.getAll();
        res.status(200).json(exhibitions);
    }

    static async getExhibitionById(req, res) {
        const exhibition = await exhibitionService.getById({ id: req.params.id });
        res.status(200).json(exhibition);
    }

    static async createExhibition(req, res) {
        const exhibition = await exhibitionService.create({ input: req.body });
        res.status(201).json(exhibition);
    }

    static async updateExhibition(req, res) {
        const exhibition = await exhibitionService.update({ id: req.params.id, input: req.body });
        res.status(200).json(exhibition);
    }

    static async deleteExhibition(req, res) {
        const exhibition = await exhibitionService.delete({ id: req.params.id });
        res.status(200).json(msg.deleteExhibitionSuccess);
    }
}