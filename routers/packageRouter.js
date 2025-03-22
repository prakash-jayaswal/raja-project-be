const express = require('express');
const PackageController = require('../controllers/PackageController');



const PackageRouter = express.Router();

PackageRouter.get(
    "/read/data",
    PackageController.read,

)

PackageRouter.get(
    "/read/data/id",
    PackageController.readbyid,

)

PackageRouter.post(
    "/create/data",
    PackageController.create,

)

module.exports = PackageRouter;