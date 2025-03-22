const express = require('express');
const BillController = require('../controllers/BillController');

const fileUpload = require('express-fileupload');


const BillRouter = express.Router();

BillRouter.get(
    "/read/data/:id?",
    BillController.read,

)

BillRouter.post(
    "/create/data",
    fileUpload({
        createParentPath: true
      }),
    BillController.create,

)


module.exports = BillRouter;