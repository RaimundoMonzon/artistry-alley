import sgMail from "@sendgrid/mail";
import { SENDGRID_API_KEY, SENDGRID_VERIFIED_SENDER } from "../helpers/config.js";

sgMail.setApiKey(SENDGRID_API_KEY);

export class EmailService {

    async sendContactForm({contactForm, userEmail}) {
        const msg = {
            to: userEmail,
            from: SENDGRID_VERIFIED_SENDER,
            templateId: "d-2d20f33cfc6643aa8497bbaae143869c",
            dynamic_template_data: {
                contactor_name: contactForm.name,
                contactor_email: contactForm.email,
                contactor_message: contactForm.message,
            },
        };
        await sgMail.send(msg);
    }
}