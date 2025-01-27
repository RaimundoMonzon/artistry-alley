import { Router } from 'express';
import { ReceiptController } from '../controllers/receipt.js';
import asyncHandler from "express-async-handler";
import { validateAdmin, validateToken } from '../middlewares/validations.js';

const router = Router();

// ALL PRIVATE

router.get('/', [validateToken, validateAdmin], asyncHandler(ReceiptController.getAllReceipts));

router.get('/:id', [validateToken, validateAdmin], asyncHandler(ReceiptController.getReceiptById));

router.delete('/:id', [validateToken, validateAdmin], asyncHandler(ReceiptController.deleteReceipt));

export default router;