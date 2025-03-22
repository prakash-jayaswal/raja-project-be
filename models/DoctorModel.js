const { default: mongoose } = require("mongoose");



const DocterSchema = new mongoose.Schema(

    {
        name: {
            type: String,
            required: true
        },
        specialization: {
            type: String,
            required: true
        },
        experience: {
            type: Number,
            required: true
        },
        contact: {
            phone:
            {
                type: String,
                required: true
            },
            email:
            {
                type: String,
                required: true
            },
        },
        clinicTimings: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
    }

)

const DocterModel = mongoose.model("DoctorCategory", DocterSchema);
module.exports = DocterModel;