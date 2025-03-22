const mongoose = require("mongoose");

const billSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    company: {
        type: String,
        required: true,
        trim: true,
    },
    position: {
        type: String,
        required: true,
        trim: true,
    },
    image_name: {
        type: String,
        required: false,
    },
});

const BillModel = mongoose.model("Bill", billSchema);
module.exports = BillModel;
