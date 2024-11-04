import { PaymentService } from "../services/payment.js";
import { CartService } from "../services/cart.js";

const paymentService = new PaymentService();
const cartService = new CartService();

export class PaymentController {

    static async createPayment(req, res) {
        const cart = await cartService.getCart(req.session);

        const items = cart.items.map(item => ({
            id: item._id,
            title: item.title,
            description: '',
            picture_url: '',
            category_id: 'Artworks',
            quantity: item.quantity,
            unit_price: item.price,
        }));
        
        const paymentResponse = await paymentService.createPayment(items, cart.totalPrice, req.body);

        res.status(200).json(paymentResponse);
    }

}