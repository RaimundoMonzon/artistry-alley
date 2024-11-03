import { Router } from 'express';
import { PaymentController } from '../controllers/payment.js';
import asyncHandler from "express-async-handler";

const router = Router();

router.post('/createPreference', asyncHandler(PaymentController.createPreference));

export default router;