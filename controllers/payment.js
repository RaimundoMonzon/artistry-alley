import { PaymentService } from "../services/payment.js";
import { CartService } from "../services/cart.js";
import { ReceiptService } from "../services/receipt.js";
import { ArtworkService } from "../services/artwork.js";
import { EmailService } from "../services/email.js";

const paymentService = new PaymentService();
const cartService = new CartService();
const receiptService = new ReceiptService();
const artworkService = new ArtworkService();
const emailService = new EmailService();

export class PaymentController {

    static async processPayment(req, res) {
        const cart = await cartService.getCart(req.session);

        // console.log(cart);

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
        // console.log("Payment response: ", paymentResponse);


        if (paymentResponse && paymentResponse.status === 'authorized') {
            // Crear el recibo.
            const { payer, shipments, payment_Method_id, email } = req.body;
            const receipt = await receiptService.create({
                input: {
                    items: cart.items,
                    totalPrice: cart.totalPrice,
                    paymentDetails: { payer, shipments, payment_Method_id, email}
                }
            });
            console.log("RECEIPT: ", receipt);
            // Actualizar el stock de los artworks.
            await artworkService.updateArtworksStock(cart.items);
            // Enviar el recibo por email.
            await emailService.sendReceipt(receipt);
            // Eliminar el carrito.
            req.session.cart = null;
            res.status(200).json(receipt);
        } else {
            res.status(400).json(paymentResponse);
        }
    }
}