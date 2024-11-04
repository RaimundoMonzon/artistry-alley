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
            description: item.description,
            picture_url: item.image,
            category_id: 'Artworks',
            quantity: item.quantity,
            unit_price: item.price,
        }));

        const paymentResponse = await paymentService.createPayment(items, cart.totalPrice, req.body);

        const trimmedResponse = {
            id: paymentResponse.id,
            status: paymentResponse.status,
            date_created: paymentResponse.date_created,
            transaction_amount: paymentResponse.transaction_amount,
            currency_id: paymentResponse.currency_id,
            description: paymentResponse.description,
            payer: {
                id: paymentResponse.payer.id,
                first_name: paymentResponse.additional_info.payer.first_name,
                last_name: paymentResponse.additional_info.payer.last_name,
                phone: paymentResponse.additional_info.payer.phone,
            },
            items: paymentResponse.additional_info.items.map(item => ({
                id: item.id,
                title: item.title,
                quantity: item.quantity,
                unit_price: item.unit_price,
            })),
        };

        res.status(200).json(paymentResponse);
    }

}