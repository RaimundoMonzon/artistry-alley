import { Receipt } from "../models/receipt.js";
import { NotFound } from "../helpers/errorHandler.js";
import { messagesByLang as msg } from "../helpers/messages.js";

export class ReceiptService {
    constructor() {
        this.model = Receipt;
    }

    async getAll() {
        return this.model.find({});
    }

    async getById(id) {
        const receipt = await this.model.findById(id);

        if (!receipt) {
            throw new NotFound(msg.receiptNotFound);
        }
        return receipt;
    }
    
    async create({ input }) {
        const receipt = new this.model(input);
        return await receipt.save();
    }

    async delete(id) {
        const receipt = await this.model.findByIdAndDelete(id);
        if (!receipt) {
            throw new NotFound(msg.receiptNotFound);
        }
    }
}