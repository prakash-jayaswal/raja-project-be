const DocterModel = require("../models/DoctorModel");

const DoctorController = {

    read(req, res) {
       
        DocterModel.find()
            .then(doctors => {
                res.status(200).json({
                    success: true,
                    flag: 1,
                    data: doctors
                });
            })
            .catch(error => {
                console.error(error);
                res.status(500).json({
                    success: false,
                    flag: 0,
                    message: "Internal server error."
                });
            });
    },
    
    async craete(req, res) {
        console.log(req.body); 
        try {
            const { name, specialization, experience, contact, clinicTimings, address } = req.body;
    
            if (!name || !specialization || !experience || !contact || !clinicTimings || !address) {
                return res.status(400).json({
                    success: false, 
                    message: "All fields are required."
                });
            }
    
            const newDoctor = new DocterModel({
                name,
                specialization,
                experience,
                contact,
                clinicTimings,
                address
            });
    
            const savedDoctor = await newDoctor.save();
    
            res.status(201).json({
                success: true,
                message: "Doctor created successfully.",
                flag: 1,
                data: savedDoctor
            });
        } catch (error) {
            console.error(error.message);
            res.status(500).json({
                success: false,
                flag: 0,
                message: "Internal server error."
            });
        }
    }
    

}

module.exports = DoctorController;