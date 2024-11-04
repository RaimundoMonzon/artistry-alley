import { Router } from 'express';
import { ContactController } from '../controllers/contact.js';
import asyncHandler from "express-async-handler";
import { validateToken, validateAdmin } from "../middlewares/validations.js";

const router = Router();

// Obtener todos los contactForms.
router.get('/', [validateToken, validateAdmin], asyncHandler(ContactController.getAllContactForms));

// Obtener un contactForm.
router.get('/:id', [validateToken, validateAdmin], asyncHandler(ContactController.getContactForm));

// Crear un contactForm.
router.post('/:id', asyncHandler(ContactController.sendContactForm));

export default router;