import { Router } from 'express';
import { ContactController } from '../controllers/contact.js';
import { asyncHandler } from '../helpers/asyncHandler.js';

const router = Router();

// Obtener todos los contactForms.
router.get('/', asyncHandler(ContactController.getAllContactForms));

// Obtener un contactForm.
router.get('/:id', asyncHandler(ContactController.getContactForm));

// Crear un contactForm.
router.post('/:id', asyncHandler(ContactController.sendContactForm));

export default router;