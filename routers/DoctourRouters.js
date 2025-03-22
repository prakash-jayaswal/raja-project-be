const express = require('express');
const DoctorController = require('../controllers/DoctorController');

const DoctourRouter = express.Router();

DoctourRouter.get(
    "/read/data",
    DoctorController.read,

)

DoctourRouter.post(
    "/create/data",
    DoctorController.craete,

)

module.exports = DoctourRouter;