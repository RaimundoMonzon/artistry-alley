import sgMail from "@sendgrid/mail";
import { SENDGRID_API_KEY, SENDGRID_VERIFIED_SENDER } from "../helpers/config.js";

sgMail.setApiKey(SENDGRID_API_KEY);

export class EmailService {

    async sendContactForm({ contactForm, userEmail }) {
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

    async sendReceipt(receipt) {
        const msg = {
            to: receipt.paymentDetails.email,
            from: SENDGRID_VERIFIED_SENDER,
            templateId: "d-83029ad0c6794033bb72ca48cb3cb11c",
            dynamic_template_data: {
                customer_name: receipt.paymentDetails.payer.first_name,
                purchase_date: Date.now(),
                items: receipt.items.map(item => ({
                    name: item.title,
                    quantity: item.quantity,
                    price: item.price,
                })),
                total_price: receipt.totalPrice,
            },
        };
        console.log("MSG: ", msg);
        await sgMail.send(msg);
    }
}