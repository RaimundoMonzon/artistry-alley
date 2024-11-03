import mercadopago from "mercadopago";

export class PaymentService {

    async createPreference(items) {
        const order = {
            items: items,
            back_urls: {
                success: 'https://www.your-site.com/success',
                failure: 'https://www.your-site.com/failure',
                pending: 'https://www.your-site.com/pending',
            },
            auto_return: 'approved',
        };
        const preference = await mercadopago.preferences.create(order);
        return preference.body;
    }
}