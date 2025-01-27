import mongoose from "mongoose";

const receiptSchema = new mongoose.Schema(
    {
        items: [
            {
                _id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Artwork",
                    required: true,
                },
                title: String,
                price: Number,
                quantity: Number,
            },
        ],
        totalPrice: {
            type: Number,
            required: true,
            default: 0,
        },
        paymentDetails: {
            payer: {
                first_name: String,
                last_name: String,
                phone: {
                    area_code: String,
                    number: String,
                },
                address: {
                    street_number: String,
                },
            },
            shipments: {
                receiver_address: {
                    zip_code: String,
                    state_name: String,
                    city_name: String,
                    street_name: String,
                    street_number: Number,
                },
            },
            payment_Method_id: String,
            email: String,
        },
    },
    {
        collection: "receipts", // Nombre de la colección en la base de datos.
        versionKey: false, // Esto oculta el campo __v
        timestamps: true,
    }
);

export const Receipt = mongoose.model("Receipt", receiptSchema);