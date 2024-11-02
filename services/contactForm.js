import { ContactForm } from "../models/contactForm.js";
import { messagesByLang as msg } from "../helpers/messages.js";
import { NotFound, ValidationError } from "../helpers/errorHandler.js";

export class ContactFormService {

    constructor() {
        this.model = ContactForm;
    }

    async getAll() {
        return this.model.find({});
    }

    async getById(id) {
        const contactForm = await this.model.findById(id);
        if (!contactForm) {
            throw new NotFound(msg.contactFormNotFound);
        }
        return contactForm;
    }

    async create({ input }) {
        const existingContactForm = await this.model.findOne({ email: input.email });
        if (existingContactForm) {
            throw new ValidationError(msg.maxAttempts());
        }
        const contactForm = new this.model(input);
        return await contactForm.save();
    }

}