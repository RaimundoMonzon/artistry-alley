import { PaymentService } from "../services/payment.js";
import { CartService } from "../services/cart.js";

const paymentService = new PaymentService();
const cartService = new CartService();

export class PaymentController {

    static async createPreference(req, res) {
        const cart = await cartService.getCart(req.session);
        const items = cart.items.map(item => ({
            title: item.title,
            unit_price: item.price,
            currency_id: 'ARS',
            quantity: item.quantity,
        }));
        
        const preference = await paymentService.createPreference(items);
        res.json({ init_point: preference.init_point });
    }

}