import { MercadoPagoConfig, Payment } from "mercadopago";
import { MP_ACCESS_TOKEN } from "../helpers/config.js";

export class PaymentService {

    constructor() {
        this.client = new MercadoPagoConfig({
            accessToken: MP_ACCESS_TOKEN,
            options: {
                timeout: 5000,
                idempotencyKey: 'abc'
            }
        });

        this.payment = new Payment(this.client);
    }

    async createPreference(items, payer) {

        const body = {
            transaction_amount: 12.34,
            token: 'ff8080814c11e237014c1ff593b57b4d',
            description: 'Venta de productos',
            installments: 1,
            payment_method_id: 'visa',
            issuer_id: '1234',
            payer: {
                email: 'acari@gmail.com',
                identification: {
                    type: 'DNI',
                    number: '42487385'
                }
            }
        }

        const requestOptions = {
            idempotencyKey: '0d5020ed-1af6-469c-ae06-c3bec19954bb',
        };

        return await this.payment.create({
            body,
            requestOptions,
        }).then(console.log).catch(console.log);


    }
}