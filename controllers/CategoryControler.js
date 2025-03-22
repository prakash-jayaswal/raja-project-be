const CategoryModel = require("../models/CategoryModel");

const CategoryController = {

    async get(req, res) {
        try {
       
            const { id } = req.params;
    
            let result;
            if (id) {
              
                result = await CategoryModel.findById(id);
                if (!result) {
                    return res.status(404).json({ 
                        msg: "No data found for this ID", 
                        flag: 0 
                    });
                }
            } else {

                result = await CategoryModel.find();
                if (!result || result.length === 0) {
                    return res.status(404).json({ 
                        msg: "No categories found", 
                        flag: 0 
                    });
                }
            }
    
            res.status(200).json({
                msg: "Data fetched successfully",
                flag: 1,
                data: result
            });
        } catch (error) {
            res.status(500).json({
                msg: "Error while fetching data",
                flag: 0,
                error: error.message
            });
        }
    },
    
    async post(req, res) {
        try {
          const { vehicleName, vehicleNumber, driverName, contactNumber, dailyLogs } = req.body;
          const image = req.files?.image || null;
      
          let imageName = null;
          if (image) {
            const desti = "./public/images/category/" + image.name;
            await image.mv(desti);
            imageName = image.name; 
          }
      
          const parsedDailyLogs = Array.isArray(dailyLogs) ? dailyLogs : JSON.parse(dailyLogs);
      
          const newVehicle = new CategoryModel({
            vehicleName,
            vehicleNumber,
            driverName,
            contactNumber,
            dailyLogs: parsedDailyLogs,
            image_name: imageName, 
          });
      
          const savedVehicle = await newVehicle.save();
      
          res.status(200).json({
            msg: "Vehicle created successfully",
            flag: 1,
            data: savedVehicle,
          });
        } catch (error) {
          console.log(error.message);
          res.status(500).send({
            msg: "Internal Server Error",
          });
        }
      },
      
      
    
    
    async update(req, res) {
       
        try {
            const id = req.params.id;
            const CategoryData = await CategoryModel.findById(id);
            if (CategoryData) {
                  
                 CategoryModel.updateOne(
                    {_id: id},
                    {
                        vehicleName: req.body. vehicleName,
                        vehicleNumber: req.body.vehicleNumber,
                        driverName: req.body.driverName,
                        contactNumber: req.body.contactNumber,
                        dailyLogs: req.body.dailyLogs,
                    }
                ).then(
                    ()=>{
                        res.status(200).json({
                            msg: "Data updated",
                            CategoryData
                        });
                    }
                ).catch(
                    ()=>{
                        res.status(500).json({
                            msg: "unable to update data",
               
                        }); 
                    }
                )

            } else {
                res.status(500).json({
                    msg: "Category id does not exist",
                 
                });
            }
        } catch (error) {
            res.status(500).json({
                msg: "Error while updating vehicle",
                error: error.message
            });
        }
    },
    
    
    

    async deleteData(req, res) {
        try {
            const { id } = req.params;
            const deletedVehicle = await CategoryModel.findByIdAndDelete(id);

            if (!deletedVehicle) {
                return res.status(404).json({
                    msg: "Vehicle not found",
                    flag: 0
                });
            }

            res.status(200).json({
                msg: "Vehicle deleted successfully",
                flag: 1,
                data: deletedVehicle
            });
        } catch (error) {
            res.status(500).json({
                msg: "Error while deleting vehicle",
                flag: 0,
                error: error.message
            });
        }
    }
};

module.exports = CategoryController;



