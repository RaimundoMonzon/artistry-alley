import { ReceiptService } from "../services/receipt.js";
import { messagesByLang as msg } from "../helpers/messages.js";

const receiptService = new ReceiptService();

export class ReceiptController {

    static async getAllReceipts(req, res) {
        const receipts = await receiptService.getAll();
        res.status(200).json(receipts);
    }

    static async getReceiptById(req, res) {
        const receipt = await receiptService.getById(req.params.id);
        res.status(200).json(receipt);
    }

    static async deleteReceipt(req, res) {
        await receiptService.delete(req.params.id);
        res.status(200).json(msg.deleteReceiptSuccess);
    }
}
