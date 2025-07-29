// ORDERS TABLE
import mongoose from "mongoose";

const { Schema } = mongoose;

const ordersSchema = new Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
            required: true,
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Products",
            required: true,
        },
        count: {
            type: Schema.Types.Number,
            required: true,
        },
        price: {
            type: Schema.Types.Number,
            required: true
        },
        totalPrice: {
            type: Schema.Types.Number,
            required: true
        },
    },
    { timestamps: true }
);

export default mongoose.models.Orders || mongoose.model('Orders', ordersSchema)
