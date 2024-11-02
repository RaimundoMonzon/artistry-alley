import { ContactFormService } from "../services/contactForm.js";
import { EmailService } from "../services/email.js";
import { UserService } from "../services/user.js";

const contactFormService = new ContactFormService();
const emailService = new EmailService();
const userService = new UserService();

export class ContactController {

    // Obtener todos los contactForms.
    static async getAllContactForms(req, res) {
        const contactForms = await contactFormService.getAll();
        res.status(200).json(contactForms);
    }

    // Obtener un contactForm.
    static async getContactForm(req, res) {
        const contactForm = await contactFormService.getById(req.params.id);
        res.status(200).json(contactForm);
    }

    // Crear un contactForm.
    static async sendContactForm(req, res) {
        const contactForm = await contactFormService.create({ input: req.body });
        const userEmail = await userService.getUserEmail(req.params.id);
        await emailService.sendContactForm({ contactForm: contactForm, userEmail: userEmail });
        res.status(201).json(contactForm);
    }
}