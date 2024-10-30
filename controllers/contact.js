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
        const { id } = req.params;
        const contactForm = await contactFormService.getById(id);
        res.status(200).json(contactForm);
    }

    // Crear un contactForm.
    static async sendContactForm(req, res) {
        const contactForm = await contactFormService.create({ input: req.body });
        const { id } = req.params;
        console.log("userIdControlador:", id);
        const userEmail = await userService.getUserEmail(id);
        await emailService.sendContactForm({ contactForm: contactForm, userEmail: userEmail });
        res.status(201).json(contactForm);
    }
}