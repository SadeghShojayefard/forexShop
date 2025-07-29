// Products TABLE

import mongoose from "mongoose";

const { Schema } = mongoose;

const productsSchema = new Schema(
    {
        name: {
            type: Schema.Types.String,
            required: true,
            trim: true,
        },
        shortName: {
            type: Schema.Types.String,
            required: true,
            unique: true,
            index: true,
            trim: true,
        },
        mainImage: {
            type: Schema.Types.String,
            required: true
        },
        slideImage: {
            type: [Schema.Types.String],
            required: true
        },
        metaTags: {
            type: Schema.Types.String,
            required: true,
            trim: true,
        },
        score: {
            type: Schema.Types.Number,
            required: true,
        },
        userNumber: {
            type: Schema.Types.Number,
            required: true,
        },
        initPriceToman: {
            type: Schema.Types.Number,
            required: true,
        },
        initPriceTether: {
            type: Schema.Types.Number,
            required: true,
        },
        discount: {
            type: Schema.Types.Number,
            required: true,
        },
        finalPriceToman: {
            type: Schema.Types.Number,
            required: true,
        },
        finalPriceTether: {
            type: Schema.Types.Number,
            required: true,
        },
        indicatorFile: {
            type: Schema.Types.String,
            required: true,
        },
        textFA: {
            type: Schema.Types.String,
            required: true,
            trim: true,
        },
        textEn: {
            type: Schema.Types.String,
            required: true,
            trim: true,
        },
        publishState: {
            type: Schema.Types.Boolean,
            required: true,
        },

    },
);

export default mongoose.models.Products || mongoose.model('Products', productsSchema)

// name
// shortName
// mainImage
// slideImage
// metaTags
// score
// initPriceToman
// initPriceTether
// discount
// finalPriceToman
// finalPriceTether
// indicatorFile
// textFA
// textEn
// publishState