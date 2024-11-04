import { ExhibitionService } from "../services/exhibition.js";
import { messagesByLang as msg } from "../helpers/messages.js";
import { UserService } from "../services/user.js";

const exhibitionService = new ExhibitionService();
const userService = new UserService();

export class ExhibitionController {
    
    static async getAllExhibitions(req, res) {
        const exhibitions = await exhibitionService.getAll();
        res.status(200).json(exhibitions);
    }

    static async getExhibitionById(req, res) {
        const exhibition = await exhibitionService.getById(req.params.id);
        res.status(200).json(exhibition);
    }

    static async createExhibition(req, res) {
        const exhibition = await exhibitionService.create({ input: req.body });
        const savedExhibition = userService.addExhibition({ id: req.user.id, exhibition: exhibition });
        res.status(201).json(savedExhibition);
    }

    static async updateExhibition(req, res) {
        const exhibition = await exhibitionService.update({ id: req.params.id, input: req.body });
        res.status(200).json(exhibition);
    }

    static async deleteExhibition(req, res) {
        await exhibitionService.delete(req.params.id);
        res.status(200).json(msg.deleteExhibitionSuccess);
    }
}