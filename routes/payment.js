import { Router } from 'express';
import { PaymentController } from '../controllers/payment.js';
import asyncHandler from "express-async-handler";

const router = Router();

router.post('/createPayment', asyncHandler(PaymentController.createPayment));

export default router;