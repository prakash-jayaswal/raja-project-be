const mongoose = require('mongoose');


const AdminSchema = new mongoose.Schema(

    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: true
        },
        contact: {
            type: String,
            required: true,
            trim: true
        },
        adminType: {
            type: Boolean,
            default: false,
        },
        tokens: [
            {
                token: {
                    type: Boolean,
                    default: true
                }
            }
        ],
        verifytoken: {
            type: String
        },
        status: {
            type: Boolean,
            default: true
        },
    },
    {
        timestamps: true
    }

)

const AdminModel = mongoose.model("admin", AdminSchema);
module.exports = AdminModel;