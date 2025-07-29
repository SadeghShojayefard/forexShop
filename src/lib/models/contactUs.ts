// ContactUs TABLE

import mongoose from "mongoose";

const { Schema } = mongoose;

const contactUsSchema = new Schema(
    {
        name: {
            type: Schema.Types.String,
            required: true,
            trim: true
        },
        email: {
            type: Schema.Types.String,
            required: true,
            trim: true
        },
        phone: {
            type: Schema.Types.String,
            required: true,
            trim: true
        },
        message: {
            type: Schema.Types.String,
            required: true,
            trim: true
        },
        reviewState: {
            type: Schema.Types.Boolean,
            required: true
        },

    },
    { timestamps: true }
);

export default mongoose.models.ContactUs || mongoose.model('ContactUs', contactUsSchema)
