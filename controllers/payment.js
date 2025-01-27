import { PaymentService } from "../services/payment.js";
import { CartService } from "../services/cart.js";
import { ReceiptService } from "../services/receipt.js";

const paymentService = new PaymentService();
const cartService = new CartService();
const receiptService = new ReceiptService();

export class PaymentController {

    static async processPayment(req, res) {
        const cart = await cartService.getCart(req.session);

        console.log(cart);

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
        console.log("Payment response: " + paymentResponse);
        

        if (paymentResponse && paymentResponse.status === 'authorized') {
            const receipt = await receiptService.create({
                input: {
                    items: items,
                    totalPrice: cart.totalPrice,
                    paymentDetails: paymentResponse.payment_method_details
                }
            });
            req.session.cart = null;
            res.status(200).json(paymentResponse);
        }

        res.status(400).json(paymentResponse);
    }

}