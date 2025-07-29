// COMMMENTS TABLE

import mongoose from "mongoose";

const { Schema } = mongoose;

const ticketSchema = new Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
            required: true,
        },
        parentTicket: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Ticket",
            required: false,
        },
        title: {
            type: Schema.Types.String,
            required: true,
        },
        content: {
            type: Schema.Types.String,
            required: true,
        },
        reviewState: {
            type: Schema.Types.Boolean,
            required: true
        },
    },
    { timestamps: true }
);

export default mongoose.models.Ticket || mongoose.model('Ticket', ticketSchema)
