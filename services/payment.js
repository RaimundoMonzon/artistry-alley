import { MercadoPagoConfig, Payment } from "mercadopago";
import { MP_ACCESS_TOKEN } from "../helpers/config.js";
import { v4 as uuidv4 } from 'uuid';

export class PaymentService {

    constructor() {
        this.client = new MercadoPagoConfig({
            accessToken: MP_ACCESS_TOKEN,
            options: {
                environment: 'sandbox', // Cambiar a 'production' para producción.
                timeout: 5000,
                idempotencyKey: uuidv4()
            }
        });

        this.payment = new Payment(this.client);
    }

    async createPayment(items, totalPrice, reqBody) {

        const token = await this.generateCardToken(reqBody.cardInfo);
        // console.log("CARD_TOKEN: ", token);

        const paymentInfo = {
            body: {
                
                application_fee: null,
                binary_mode: false, // En false la transaccion puede devolver PENDIENTE.
                campaign_id: null,
                capture: false,
                coupon_amount: null,
                description: 'Payment for product',
                differential_pricing_id: null,
                external_reference: 'MP0001',
                installments: 1, // Número de cuotas.
                metadata: null,
                payer: {
                    entity_type: 'individual',
                    type: 'customer',
                    email: reqBody.email, // E-mail del comprador.
                    identification: {
                        type: reqBody.cardInfo.cardholder.identification.type, // DNI, Pasaporte, etc.
                        number: reqBody.cardInfo.cardholder.identification.number // Numero de identificación.
                    }
                },
                payment_method_id: reqBody.payment_method_id, // ID del método de pago. Por ejemplo, master o visa.
                token: token, // Token de la tarjeta, generado a partir de la tarjeta.
                transaction_amount: parseInt(totalPrice) // El total de la compra.
            },

            requestOptions: { idempotencyKey: uuidv4() } // Generar UUID para cada petición.
        };

        // console.log("PAYMENT INFO: ", paymentInfo);
        return await this.payment.create(paymentInfo)
            //.then(result => console.log("PAYMENT RESULT: ", result))
            //.catch(error => console.error("PAYMENT ERROR: ", error));
    }

    async generateCardToken(card) {
        const response = await fetch('https://api.mercadopago.com/v1/card_tokens', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${MP_ACCESS_TOKEN}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(card),
        });

        const data = await response.json();
        return data.id;
    }
}