import { Router } from 'express';
import { PaymentController } from '../controllers/payment.js';
import asyncHandler from "express-async-handler";

const router = Router();

// PUBLIC
router.post('/processPayment', asyncHandler(PaymentController.processPayment));

export default router;