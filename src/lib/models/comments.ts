// COMMMENTS TABLE

import mongoose from "mongoose";

const { Schema } = mongoose;

const commentsSchema = new Schema(
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
        parentComment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comments",
            required: false,
        },
        content: {
            type: Schema.Types.String,
            required: true,
        },
        reviewState: {
            type: Schema.Types.Boolean,
            required: true
        },
        selectedComment: {
            type: Schema.Types.Boolean,
            required: true
        },

    },
    { timestamps: true }
);

export default mongoose.models.Comments || mongoose.model('Comments', commentsSchema)
