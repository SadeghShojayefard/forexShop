// Users TABLE
import mongoose from "mongoose";

const { Schema } = mongoose;

const usersSchema = new Schema(
    {
        username: {
            type: Schema.Types.String,
            required: true
        },
        email: {
            type: Schema.Types.String,
            required: true
        },
        password: {
            type: Schema.Types.String,
            required: true
        },
        name: {
            type: Schema.Types.String,
            required: false
        },
        avatar: {
            type: Schema.Types.String,
            required: true,
        },
        role: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Roles",
            required: true,
        }

    },
    { timestamps: true }
);

export default mongoose.models.Users || mongoose.model('Users', usersSchema)
// username
// email
// password
// name
// avatar
// timestamps
// roles