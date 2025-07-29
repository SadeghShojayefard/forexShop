// roles Tables
import mongoose from "mongoose";

const { Schema } = mongoose;

const rolesSchema = new Schema(
    {
        titleFA: {
            type: Schema.Types.String,
            required: true,
            trim: true,

        },
        titleEN: {
            type: Schema.Types.String,
            required: true,
            trim: true,
        },
    },
);

export default mongoose.models.Roles || mongoose.model('Roles', rolesSchema)
