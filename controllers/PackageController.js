const PackageModel = require("../models/PackageModel");

const PackageController = {

    async readbyid(req, res) {
        try {
            // सभी पैकेज लाने के लिए `find()` का उपयोग करें
            const packages = await PackageModel.find();
    
            return res.status(200).json({
                success: true,
                message: "All packages fetched successfully.",
                flag: 1,
                data: packages
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: "Internal server error.",
                flag: 0
            });
        }
    },
    

    async read(req, res) {
        try {
            const { id } = req.params;
    
            if (id) {
             
                const package = await PackageModel.findById(id);
    
                if (!package) {
                    return res.status(404).json({
                        success: false,
                        message: "Package not found.",
                        flag: 0
                    });
                }
    
                return res.status(200).json({
                    success: true,
                    message: "Package fetched successfully.",
                    flag: 1,
                    data: package
                });
            } else {
                // अगर ID नहीं दी गई तो सभी पैकेज रिटर्न करें
                const packages = await PackageModel.find();
    
                return res.status(200).json({
                    success: true,
                    message: "All packages fetched successfully.",
                    flag: 1,
                    data: packages
                });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: "Internal server error.",
                flag: 0
            });
        }
    },
    

   async create(req, res) {
    try {
        const { name, duration, servicesIncluded, price, description } = req.body;

        if (!name || !duration || !servicesIncluded || !price || !description) {
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            });
        }

        const newPackage = new PackageModel({
            name,
            duration,
            servicesIncluded,
            price,
            description
        });

        const savedPackage = await newPackage.save();

        res.status(201).json({
            success: true,
            message: "Package created successfully.",
            flag: 1,
            data: savedPackage
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            flag: 0,
            message: "Internal server error."
        });
    }
},


}

module.exports = PackageController;